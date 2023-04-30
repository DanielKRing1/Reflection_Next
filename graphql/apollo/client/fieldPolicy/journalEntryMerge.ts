import { gql } from "@apollo/client";
import { JournalEntry } from "../../../../db/api/types";
import { genCacheId } from "../../local/utils/id";
import { THOUGHT_TYPENAME } from "../../server/typenames";
import client from "../client";
import { GET_THOUGHTS } from "../../../gql/thoughts";
import { getActiveJournal } from "../../local/state/activeJournal";

export const merge = {
    journalEntries: {
        // Don't cache separate results based on
        // any of this field's arguments.
        keyArgs: false,

        // Concatenate the incoming list items with
        // the existing list items.
        merge(existing: JournalEntry[] = [], incoming: JournalEntry[]) {
            // 1. Check which received thoughts are not cached locally
            const missingThoughtIds: string[] = [];
            for (const je of incoming) {
                for (const r of je.reflections) {
                    const { id: thoughtId } = r;
                    const thoughtCacheId: string = genCacheId(
                        THOUGHT_TYPENAME,
                        thoughtId
                    );

                    const thought = client.readFragment({
                        id: thoughtCacheId,
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
