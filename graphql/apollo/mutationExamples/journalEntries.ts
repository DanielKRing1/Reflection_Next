import { gql, useMutation } from "@apollo/client";

import { CREATE_JOURNAL_ENTRY } from "../../gql/journalEntry";
import { getActiveJournal } from "../local/state/activeJournal";
import { JournalEntry, Reflection } from "../../../types/db";
import {
    getInklingReflections,
    getThoughtReflections,
} from "../local/state/pendingReflections";
import client from "../client/client";
import { GET_INKLINGS } from "../../gql/inklings";
import { GET_THOUGHTS } from "../../gql/thoughts";
import { setJournalPhaseInklings } from "../local/state/journalPhase";
import { LocalReflection } from "../local/state/pendingReflections";
import { Dict } from "../../../types/data";

export default () => {
    const activeJournalId: string = getActiveJournal();

    const inklingReflections: Dict<LocalReflection> = getInklingReflections();
    const thoughtReflections: Dict<LocalReflection> = getThoughtReflections();

    // const [mutateFunction, { data, loading, error }] = useMutation(
    //     CREATE_JOURNAL_ENTRY,
    //     {
    //         variables: {
    //             createJournalEntryJournalId: activeJournalId,
    //             keepIdsInkling: inklingReflections
    //                 .filter((ir) => ir.decision === 1)
    //                 .map((ir) => ir.thoughtId),
    //             keepIdsThought: thoughtReflections
    //                 .filter((ir) => ir.decision === 1)
    //                 .map((ir) => ir.thoughtId),
    //             discardIdsThought: thoughtReflections
    //                 .filter((ir) => ir.decision === 0)
    //                 .map((ir) => ir.thoughtId),
    //             discardIdsInkling: inklingReflections
    //                 .filter((ir) => ir.decision === 0)
    //                 .map((ir) => ir.thoughtId),
    //         },
    //         update(cache, { data: { CreateJournalEntry } }) {
    //             // 1. Create local JournalEntry and Reflections
    //             cache.modify({
    //                 fields: {
    //                     JournalEntries(existing: JournalEntry[] = []) {
    //                         // 1. Create Local Reflections
    //                         const newReflections = [
    //                             ...inklingReflections.map(
    //                                 ({ thoughtId, decision }: Reflection) => ({
    //                                     thoughtId: thoughtId,
    //                                     decision:
    //                                         decision === 0
    //                                             ? 3 /*discard*/
    //                                             : 2 /*keep*/,
    //                                 })
    //                             ),
    //                             ...thoughtReflections.map(
    //                                 ({ thoughtId, decision }: Reflection) => ({
    //                                     thoughtId,
    //                                     decision:
    //                                         decision === 0
    //                                             ? 0 /*discard*/
    //                                             : 1 /*keep*/,
    //                                 })
    //                             ),
    //                         ];

    //                         // 2. Create Local Journal Entry
    //                         const newJournalEntryRef = cache.writeFragment({
    //                             data: {
    //                                 ...CreateJournalEntry,
    //                                 reflections: newReflections,
    //                             },
    //                             fragment: gql`
    //                                 fragment NewJournalEntry on JournalEntry {
    //                                     timeId
    //                                     journalId
    //                                     reflections
    //                                 }
    //                             `,
    //                         });

    //                         // 2. Return new local JournalEntry + cached Server JournalEntries
    //                         return [newJournalEntryRef, ...existing];
    //                     },
    //                 },
    //             });

    //             // 2. Convert cached server (committed) Inklings into local Thoughts
    //             const activeJournalId: string = getActiveJournal();

    //             // Get cached Inklings
    //             const { inklings } = client.readQuery({
    //                 query: GET_INKLINGS,
    //                 // Provide any required variables in this object.
    //                 // Variables of mismatched types will return `null`.
    //                 variables: {
    //                     journalId: activeJournalId,
    //                 },
    //             });

    //             // Save Inklings as Thoughts
    //             client.writeQuery({
    //                 query: GET_THOUGHTS,
    //                 variables: {
    //                     journalId: activeJournalId,
    //                     thoughIds: inklings.map((i) => i.timeId),
    //                 },
    //                 data: inklings,
    //             });

    //             // 3. Clear cached server (committed) Inklings
    //             client.writeQuery({
    //                 query: GET_INKLINGS,
    //                 variables: {
    //                     journalId: activeJournalId,
    //                 },
    //                 data: [],
    //             });

    //             // 4. Set JournalPhase to 'Inklings'
    //             setJournalPhaseInklings();
    //         },
    //     }
    // );
};
