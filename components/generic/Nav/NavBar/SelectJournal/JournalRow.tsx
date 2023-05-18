import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

import ClickContainer from "../../../Button/Base/ClickContainer";
import FlexRow from "../../../Flex/FlexRow";
import { MyTextNoMargin } from "../../../Text/MyText";
import { Journal } from "../../../../../db/api/types";
import ConfirmationButton from "../../../Button/ConfirmationButton";
import MyTextInput from "../../../Input/MyTextInput";
import Spacer from "../../../Spacing/Spacer";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import {
    EDIT_JOURNAL,
    GET_JOURNALS,
    RM_JOURNAL,
} from "../../../../../graphql/gql/journal";
import { JOURNAL_TYPENAME } from "../../../../../graphql/apollo/server/typenames";
import {
    activeJournalVar,
    clearActiveJournal,
} from "../../../../../graphql/apollo/local/state/activeJournal";

type Props = {
    journal: Journal;
    onSelect: () => void;
};
export default (props: Props) => {
    // PROPS
    const { journal } = props;

    // LOCAL STATE
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {!isEditing ? (
                <InitialRow
                    {...props}
                    startEditing={() => setIsEditing(true)}
                />
            ) : (
                <EditingRow
                    journal={journal}
                    endEditing={() => setIsEditing(false)}
                />
            )}
        </>
    );
};

type InitialRowProps = {
    journal: Journal;
    onSelect: () => void;
    startEditing: () => void;
};

const InitialRow = (props: InitialRowProps) => {
    // PROPS
    const { journal, onSelect, startEditing } = props;

    // LOCAL STATE
    const activeJournal = useReactiveVar(activeJournalVar);

    // GQL
    const [rmJournal, { loading: loading_rm, error: error_rm, data: data_rm }] =
        useMutation(RM_JOURNAL, {
            variables: {
                journalId: journal.id,
            },
            update(cache, { data: { rmJournal } }) {
                // 1. Did not rm from server
                if (!rmJournal) return;

                // 2. If deleted active journal, set active journal = null
                if (activeJournal === journal.id) clearActiveJournal();

                // 3. Get existing Journals
                const {
                    journals: existingJournals = [],
                }: { journals: Journal[] } = cache.readQuery({
                    query: GET_JOURNALS,
                });

                console.log(existingJournals);

                // 4. Overwrite local query cache (rm journal locally)
                cache.writeQuery({
                    query: GET_JOURNALS,
                    data: {
                        journals: existingJournals.filter(
                            ({ id }: Journal) => id !== journal.id
                        ),
                    },
                });
                // Remove deleted Journal from normalized cache
                cache.gc();
            },
        });

    // HANDLERS
    const handleEdit = () => {
        startEditing();
    };
    const handleDelete = () => {
        // Call delete mutation on server
        rmJournal();
    };

    // THEME
    const theme = useTheme();

    return (
        <FlexRow width="100%" justifyContent="space-between">
            <FlexRow>
                <ClickContainer onClick={onSelect}>
                    <MyTextNoMargin>{journal.name}</MyTextNoMargin>
                </ClickContainer>

                <Spacer x={10} />
            </FlexRow>

            <FlexRow>
                <ClickContainer onClick={handleEdit}>
                    <FaEdit size={"25"} />
                </ClickContainer>

                <Spacer x={10} />

                <ConfirmationButton
                    onConfirmed={handleDelete}
                    InitialComponent={<FaTrash />}
                />

                <Spacer x={10} />
            </FlexRow>
        </FlexRow>
    );
};

type EditingRowProps = {
    journal: Journal;
    endEditing: () => void;
};

const EditingRow = (props: EditingRowProps) => {
    // PROPS
    const { journal, endEditing } = props;

    // LOCAL STATE
    const [journalNameEdit, setJournalNameEdit] = useState(journal.name);

    // GQL
    const [
        editJournal,
        { loading: loading_rm, error: error_rm, data: data_rm },
    ] = useMutation(EDIT_JOURNAL, {
        variables: {
            journalId: journal.id,
            journalEdits: {
                name: journalNameEdit,
            },
        },
        update(cache, { data: { editJournal } }) {
            // 1. Overwrite local query cache (edit journal name locally)
            cache.writeFragment({
                id: cache.identify({
                    __typename: JOURNAL_TYPENAME,
                    id: journal.id,
                }),
                fragment: gql`
                    fragment NewJournal on Journal {
                        id
                        userId
                        name
                    }
                `,
                data: { ...journal, name: journalNameEdit },
            });
        },
    });

    // HANDLERS
    const handleCancelEdit = () => {
        endEditing();
    };

    const handleSubmitEdit = () => {
        // Call edit mutation on server
        editJournal();

        endEditing();
    };

    // THEME
    const theme = useTheme();

    return (
        <FlexRow justifyContent="space-between">
            <MyTextInput
                onEnter={handleSubmitEdit}
                placeholder={`${journal.name}...`}
                value={journalNameEdit}
                onChange={setJournalNameEdit}
            />

            <Spacer x={10} />

            <ConfirmationButton
                onConfirmed={handleSubmitEdit}
                InitialComponent={<FaEdit />}
            />

            <Spacer x={10} />

            <ClickContainer onClick={handleCancelEdit}>
                <FaTimes />
            </ClickContainer>

            <Spacer x={10} />
        </FlexRow>
    );
};
