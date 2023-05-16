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
        <div>
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
        </div>
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

    // HANDLERS
    const handleEdit = () => {
        startEditing();
    };
    const handleDelete = () => {
        // Call delete mutation on server
    };

    // THEME
    const theme = useTheme();

    return (
        <FlexRow justifyContent="space-between">
            <ClickContainer onClick={onSelect}>
                <MyTextNoMargin>{journal.name}</MyTextNoMargin>
            </ClickContainer>

            <Spacer x={10} />

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

    // HANDLERS
    const handleCancelEdit = () => {
        endEditing();
    };

    const handleSubmitEdit = () => {
        // Call delete mutation on server

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
