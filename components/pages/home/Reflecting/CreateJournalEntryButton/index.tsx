// THIRD-PARTY
import React from "react";
import { gql, useMutation } from "@apollo/client";

// GENERIC COMPONENTS
import AddButton from "../../../../generic/Button/AddButton";

// GQL
import {
    CREATE_JOURNAL_ENTRY,
    GET_JOURNAL_ENTRIES,
} from "../../../../../graphql/gql/journalEntry";
import { getActiveJournal } from "../../../../../graphql/apollo/local/state/activeJournal";
import {
    clearInklingReflections,
    clearThoughtReflections,
    getInklingReflections,
    getThoughtReflections,
} from "../../../../../graphql/apollo/local/state/pendingReflections";
import client from "../../../../../graphql/apollo/client/client";
import { GET_INKLINGS } from "../../../../../graphql/gql/inklings";
import { JournalEntry } from "../../../../../db/api/types";
import { setJournalPhaseInklings } from "../../../../../graphql/apollo/local/state/journalPhase";
import { genCacheId } from "../../../../../graphql/apollo/local/utils/id";
import { THOUGHT_TYPENAME } from "../../../../../graphql/apollo/server/typenames";

const CreateJournalEntryButton = () => {
    // GQL
    const [
        createJournalEntry,
        { loading: loading_cje, error: error_cje, data: data_cje },
    ] = useMutation(CREATE_JOURNAL_ENTRY);

    // HANDLERS
    // Add Journal Entry
    const handleAddJournalEntry = () => {
        try {
            if (getActiveJournal() === null) return;

            console.log(getActiveJournal());

            createJournalEntry({
                variables: {
                    createJournalEntryJournalId: getActiveJournal(),
                    keepIdsInkling: getInklingIds().filter(
                        (id) =>
                            getInklingReflections()[id] !== undefined &&
                            getInklingReflections()[id].keep === true
                    ),
                    keepIdsThought: getThoughtIds().filter(
                        (id) =>
                            getThoughtReflections()[id] !== undefined &&
                            getThoughtReflections()[id].keep === true
                    ),
                    discardIdsThought: getThoughtIds().filter(
                        (id) =>
                            getThoughtReflections()[id] === undefined ||
                            getThoughtReflections()[id].keep === false
                    ),
                    discardIdsInkling: getInklingIds().filter(
                        (id) =>
                            getInklingReflections()[id] === undefined ||
                            getInklingReflections()[id].keep === false
                    ),
                },
                update(cache, { data: { createJournalEntry } }) {
                    try {
                        // 1. CREATE NEW CACHED THOUGHTS FROM CACHED INKLINGS
                        const { inklings = [] }: { inklings: any[] } =
                            cache.readQuery({
                                query: GET_INKLINGS,
                                variables: {
                                    journalId: createJournalEntry.journalId,
                                },
                            });

                        for (const inkling of inklings) {
                            cache.writeFragment({
                                id: genCacheId(
                                    THOUGHT_TYPENAME,
                                    inkling.timeId
                                ),
                                data: inkling,
                                fragment: gql`
                                    fragment NewThought on Thought {
                                        timeId
                                        journalId
                                        text
                                    }
                                `,
                            });
                        }

                        // 2. REMOVE CACHED INKLINGS
                        cache.writeQuery({
                            query: GET_INKLINGS,
                            variables: {
                                journalId: createJournalEntry.journalId,
                            },
                            data: {
                                inklings: [],
                            },
                        });
                        cache.gc();

                        // 3. CREATE NEW REFLECTIONS TO CACHE UNDER NEW JOURNAL ENTRY
                        const newReflections = [
                            ...getInklingIds().map((id: string) => ({
                                thoughtId: id,
                                decision:
                                    getInklingReflections()[id] === undefined ||
                                    getInklingReflections()[id].keep === false
                                        ? 3 /*discard*/
                                        : 2 /*keep*/,
                            })),
                            ...getThoughtIds().map((id: string) => ({
                                thoughtId: id,
                                decision:
                                    getThoughtReflections()[id] === undefined ||
                                    getThoughtReflections()[id].keep === false
                                        ? 0 /*discard*/
                                        : 1 /*keep*/,
                            })),
                        ];
                        const newJE: JournalEntry = {
                            ...createJournalEntry,
                            reflections: newReflections,
                        };
                        const {
                            journalEntries: existingJE,
                        }: { journalEntries: JournalEntry[] } = cache.readQuery(
                            {
                                query: GET_JOURNAL_ENTRIES,
                                variables: { journalId: getActiveJournal() },
                            }
                        );
                        const allJE = [newJE, ...existingJE];

                        // 4. CREATE NEW CACHED JOURNAL ENTRY FROM REFLECTIONS AND SERVER RESPONSE
                        cache.writeQuery({
                            query: GET_JOURNAL_ENTRIES,
                            variables: {
                                journalId: getActiveJournal(),
                            },
                            data: {
                                journalEntries: allJE,
                            },
                        });

                        // 5. CLEAR LOCAL TEMP INKLING AND THOUGHT REFLECTIONS
                        clearInklingReflections();
                        clearThoughtReflections();

                        // 6. SWITCH TO INKLING JOURNAL PHASE
                        setJournalPhaseInklings();
                    } catch (err) {
                        console.log(err);
                    }
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return <AddButton onClick={handleAddJournalEntry} />;
};

export default CreateJournalEntryButton;

const getInklingIds = () => {
    const { inklings = [] } =
        client.readQuery({
            query: GET_INKLINGS,
            // Provide any required variables in this object.
            // Variables of mismatched types will return `null`.
            variables: {
                journalId: getActiveJournal(),
            },
        }) || {};

    return inklings.map(({ timeId }) => timeId);
};

const getThoughtIds = () => {
    const { journalEntries = [] } =
        client.readQuery({
            query: GET_JOURNAL_ENTRIES,
            // Provide any required variables in this object.
            // Variables of mismatched types will return `null`.
            variables: {
                journalId: getActiveJournal(),
            },
        }) || {};
    // Check if no JournalEntry
    const thoughtIds =
        journalEntries.length === 0
            ? []
            : journalEntries[0].reflections.map(({ thoughtId }) => thoughtId);

    return thoughtIds;
};
