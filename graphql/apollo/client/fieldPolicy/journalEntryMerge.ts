import { gql } from "@apollo/client";

import client from "../client";
import { JournalEntry } from "../../../../db/api/types";
import {
    JOURNAL_ENTRY_TYPENAME,
    THOUGHT_TYPENAME,
} from "../../server/typenames";
import { GET_THOUGHTS } from "../../../gql/thoughts";
import { getActiveJournal } from "../../local/state/activeJournal";

export default {
    journalEntries: {
        // Don't cache separate results based on
        // any of this field's arguments.
        // IMPORTANT: THIS FLAG WILL MAKE ALL QUERY/VARIABLE COMBOS OF THIS TYPE
        //              EXECUTE AGAIN WHEN ANY OF THEM EXECUTE
        //              EVERY QUERY WILL NEED TO BE 'MERGED'
        keyArgs: false,

        // Concatenate the incoming list items with
        // the existing list items.
        merge(
            existing: JournalEntry[] = [],
            incoming: JournalEntry[] = [],
            { readField }
        ) {
            incoming = [...incoming];

            // 1. No incoming
            if (incoming.length === 0) return existing;

            console.log("journalEntryMerge");
            console.log(existing);
            console.log(incoming);

            // 2. Check which received thoughts are not cached locally
            const missingThoughtIds: string[] = [];
            for (const je of Object.values(incoming)) {
                // Add missing reflection.thoughtIds
                const reflections = readField("reflections", je);

                for (const r of reflections) {
                    const { thoughtId } = r;

                    const thought = client.readFragment({
                        id: client.cache.identify({
                            __typename: THOUGHT_TYPENAME,
                            timeId: r.thoughtId,
                        }),
                        fragment: gql`
                            fragment MyThought on Thought {
                                timeId
                                journalId
                                text
                            }
                        `,
                    });

                    if (thought === null) missingThoughtIds.push(thoughtId);
                }
            }

            // 3. Fetch missing thoughtIds from server
            console.log(missingThoughtIds);
            if (missingThoughtIds.length > 0)
                client.query({
                    query: GET_THOUGHTS,
                    variables: {
                        journalId: getActiveJournal(),
                        thoughtIds: missingThoughtIds,
                    },
                });

            // 4. Sort incoming, newest -> oldest
            incoming.sort(
                (b, a) => readField("timeId", a) - readField("timeId", b)
            );

            // 5. No existing
            if (existing.length === 0) return incoming;

            // 6. Newer than existing? -> add to front
            const newer = [];
            for (let i = incoming.length - 1; i >= 0; i--) {
                const je = incoming[i];

                if (readField("timeId", je) > readField("timeId", existing[0]))
                    newer.unshift(je);
            }

            // 7. Older than existing? -> add to end
            const older = [];
            for (let i = 0; i < incoming.length; i++) {
                const je = incoming[i];

                if (
                    readField("timeId", je) <
                    readField("timeId", existing[existing.length - 1])
                )
                    older.push(je);
            }

            // 8. Return merged
            return [...newer, ...existing, ...older];
        },
    },
};
