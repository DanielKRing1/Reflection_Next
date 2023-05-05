import { MutationTuple, useMutation } from "@apollo/client";

import { GET_JOURNAL_ENTRIES } from "../../gql/journalEntry";
import { getActiveJournal } from "../local/state/activeJournal";
import { Inkling, Inklings } from "../../../db/api/types";
import {
    initInklingReflections,
    initThoughtReflections,
} from "../local/state/pendingReflections";
import client from "../client/client";
import { COMMIT_INKLINGS, GET_INKLINGS } from "../../gql/inklings";
import {
    clearPendingInklings,
    getPendingInklings,
} from "../local/state/pendingInklings";
import { setJournalPhaseReflection } from "../local/state/journalPhase";
import { JournalPhase } from "../../../utils_ui/journalPhase";

// { loading, error, data }
export const createJournalEntryLocal = {};

export default (): MutationTuple<any, any, any, any> => {
    const activeJournalId: string = getActiveJournal();
    const pendingInklings: Inklings = getPendingInklings();

    const [commitInklings, handle] = useMutation(COMMIT_INKLINGS, {
        variables: {
            commitInklingsJournalId: activeJournalId,
            inklingTexts: pendingInklings.map((i: Inkling) => i.data),
        },
        update(cache, { data: { commitInklings } }) {
            // 1. Clear local pending Inklings
            clearPendingInklings();

            // 2. Set local Inklings
            client.writeQuery({
                query: GET_INKLINGS,
                variables: {
                    journalId: activeJournalId,
                },
                data: {
                    inklings: commitInklings,
                },
            });

            // 3. Set local Inkling Reflections

            // Get cached Inklings
            const { inklings } = client.readQuery({
                query: GET_INKLINGS,
                // Provide any required variables in this object.
                // Variables of mismatched types will return `null`.
                variables: {
                    journalId: activeJournalId,
                },
            });
            // Set Inklings Reflections, default 0 (discard)
            initInklingReflections(
                inklings.map((i) => ({ id: i.timeId, data: 0 }))
            );

            // 4. Set local thought reflections

            // Get most recent JournalEntry's 'kept' Thoughts
            const { journalEntries = [] } =
                client.readQuery({
                    query: GET_JOURNAL_ENTRIES,
                    // Provide any required variables in this object.
                    // Variables of mismatched types will return `null`.
                    variables: {
                        journalId: activeJournalId,
                        cursorTime: new Date(),
                        $count: 1,
                    },
                }) || {};
            // Check if no JournalEntry
            const reflections =
                journalEntries.length === 0
                    ? []
                    : journalEntries[0].reflections;
            // Set Thought Reflections, default 0 (discard)
            initThoughtReflections(
                reflections.map((r) => ({ id: r.thoughtId, data: 0 }))
            );

            // 5. Set JournalPhase to 'Reflection'
            setJournalPhaseReflection();
        },
    });

    return [commitInklings, handle];
};
