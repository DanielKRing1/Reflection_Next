import { gql } from "@apollo/client";
import { JournalEntry } from "../../../../db/api/types";
import { THOUGHT_TYPENAME } from "../../server/typenames";
import client from "../client";
import { GET_THOUGHTS } from "../../../gql/thoughts";
import { getActiveJournal } from "../../local/state/activeJournal";

export default {
    journalEntries: {
        // Don't cache separate results based on
        // any of this field's arguments.
        keyArgs: false,

        // Concatenate the incoming list items with
        // the existing list items.
        merge(
            existing: JournalEntry[] = [],
            incoming: JournalEntry[] = [],
            { readField }
        ) {
            // 1. Check which received thoughts are not cached locally

            const missingThoughtIds: string[] = [];
            for (const je of Object.values(incoming)) {
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

            // 2. Fetch missing thoughtIds from server
            const activeJournalId: string = getActiveJournal();

            if (missingThoughtIds.length > 0)
                client.query({
                    query: GET_THOUGHTS,
                    variables: {
                        journalId: activeJournalId,
                        thoughtIds: missingThoughtIds,
                    },
                });

            // 3. Merge results into 1 list
            return [...existing, ...incoming];
        },
    },
};
