import { gql, useMutation } from "@apollo/client";

import { createJournalEntry } from "../../gql/journalEntry";
import { getActiveJournal } from "../local/state/activeJournal";
import { JournalEntry, Reflection } from "../../../db/api/types";
import {
    getInklingReflections,
    getThoughtReflections,
} from "../local/state/pendingReflections";
import client from "../client/client";
import { getInklings } from "../../gql/inklings";
import { getThoughts } from "../../gql/thoughts";
import { setJournalPhase } from "../local/state/journalPhase";
import { JournalPhase } from "../../../utils_ui/journalPhase";

// { loading, error, data }
export const createJournalEntryLocal = {};

export default () => {
    const activeJournalId: string = getActiveJournal();

    const inklingReflections: Reflection[] = getInklingReflections();
    const thoughtReflections: Reflection[] = getThoughtReflections();

    const [mutateFunction, { data, loading, error }] = useMutation(
        createJournalEntry,
        {
            variables: {
                createJournalEntryJournalId: activeJournalId,
                keepIdsInkling: inklingReflections
                    .filter((ir) => ir.data === 1)
                    .map((ir) => ir.id),
                keepIdsThought: thoughtReflections
                    .filter((ir) => ir.data === 1)
                    .map((ir) => ir.id),
                discardIdsThought: thoughtReflections
                    .filter((ir) => ir.data === 0)
                    .map((ir) => ir.id),
                discardIdsInkling: inklingReflections
                    .filter((ir) => ir.data === 0)
                    .map((ir) => ir.id),
            },
            update(cache, { data: { CreateJournalEntry } }) {
                // 1. Create local JournalEntry and Reflections
                cache.modify({
                    fields: {
                        JournalEntries(existing: JournalEntry[] = []) {
                            // 1. Create Local Reflections
                            const newReflections = [
                                ...inklingReflections.map(
                                    ({ id, data }: Reflection) => ({
                                        thoughtId: id,
                                        decision:
                                            data === 0
                                                ? 3 /*discard*/
                                                : 2 /*keep*/,
                                    })
                                ),
                                ...thoughtReflections.map(
                                    ({ id, data }: Reflection) => ({
                                        thoughtId: id,
                                        decision:
                                            data === 0
                                                ? 0 /*discard*/
                                                : 1 /*keep*/,
                                    })
                                ),
                            ];

                            // 2. Create Local Journal Entry
                            const newJournalEntryRef = cache.writeFragment({
                                data: {
                                    ...CreateJournalEntry,
                                    reflections: newReflections,
                                },
                                fragment: gql`
                                    fragment NewJournalEntry on JournalEntry {
                                        timeId
                                        journalId
                                        reflections
                                    }
                                `,
                            });

                            // 2. Return new local JournalEntry + cached Server JournalEntries
                            return [newJournalEntryRef, ...existing];
                        },
                    },
                });

                // 2. Convert cached server (committed) Inklings into local Thoughts
                const activeJournalId: string = getActiveJournal();

                // Get cached Inklings
                const { inklings } = client.readQuery({
                    query: getInklings,
                    // Provide any required variables in this object.
                    // Variables of mismatched types will return `null`.
                    variables: {
                        journalId: activeJournalId,
                    },
                });

                // Save Inklings as Thoughts
                client.writeQuery({
                    query: getThoughts,
                    variables: {
                        journalId: activeJournalId,
                        thoughIds: inklings.map((i) => i.timeId),
                    },
                    data: inklings,
                });

                // 3. Clear cached server (committed) Inklings
                client.writeQuery({
                    query: getInklings,
                    variables: {
                        journalId: activeJournalId,
                    },
                    data: [],
                });

                // 4. Set JournalPhase to 'Inklings'
                setJournalPhase(JournalPhase.Inklings);
            },
        }
    );
};
