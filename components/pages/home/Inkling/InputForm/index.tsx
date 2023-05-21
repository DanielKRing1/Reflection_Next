// THIRD PARTY
import React, { useState } from "react";
import genId from "@asianpersonn/time-id";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import AddButton from "../../../../generic/Button/AddButton";
import CommitButton from "../../../../generic/Button/CommitButton";
import { InputList } from "./InputList";

// TYPES
import { INKLING_ERROR_TIMEOUT_MS } from "../../../../../constants/error";
import { useReactiveVar } from "@apollo/client";
import { Inkling, Inklings } from "../../../../../types/db";
import {
    addPendingInkling,
    editPendingInkling,
    pendingInklingsVar,
    rmPendingInkling,
} from "../../../../../graphql/apollo/local/state/pendingInklings";
import commitInklings from "../../../../../graphql/apollo/mutationExamples/commitInklings";

const InputForm = () => {
    // LOCAL STATE
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const rmFocusedIndex = () => setFocusedIndex(-1);

    const [errorIds, setErrorIds] = useState<Set<number>>(new Set());
    const [timeoutHandle, setTimeoutHandle] = useState<
        NodeJS.Timeout | undefined
    >();

    // APOLLO CLIENT
    const pendingInklings: Inkling[] = useReactiveVar(pendingInklingsVar);

    const [commit, { data, loading, error }] = commitInklings();

    // HANDLERS
    const handleAddInkling = () => {
        // Cannot add entry if empty entries exist
        if ((pendingInklings as Inklings).some(({ text }) => text === ""))
            return;

        // Focus last index
        setFocusedIndex(pendingInklings.length);
        addPendingInkling({ timeId: Date.now(), journalId: -1, text: "" });
    };

    const handleRmInkling = (index: number) => {
        rmPendingInkling(index);
    };

    const handleEditInkling = (index: number, newText: string) => {
        editPendingInkling(index, newText);
    };

    const handleCommitInklings = () => {
        // Remove last Inkling if empty
        if (
            pendingInklings.length > 0 &&
            pendingInklings[pendingInklings.length - 1].text === ""
        )
            rmPendingInkling(pendingInklings.length - 1);

        // Do not commit without > 0 Inklings
        if (pendingInklings.length === 0) return;

        const emptyInklings: Set<number> = new Set(
            pendingInklings
                .filter(({ text }) => text === "")
                .map(({ timeId }) => timeId)
        );

        if (emptyInklings.size === 0)
            // No empty Inklings
            // TODO: Commit Inklings to server
            return commit();

        // Cannot submit if empty Inklings exist
        //    Mark empty Inklings for error display
        setErrorIds(emptyInklings);
        //    Remove error display after some timeout
        if (timeoutHandle) clearTimeout(timeoutHandle);
        const handle = setTimeout(
            () => setErrorIds(new Set()),
            INKLING_ERROR_TIMEOUT_MS
        );
        setTimeoutHandle(handle);
    };

    return (
        <FlexCol alignItems="stretch">
            <InputList
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
                rmFocusedIndex={rmFocusedIndex}
                onAddInkling={handleAddInkling}
                onRmInkling={handleRmInkling}
                onEditInkling={handleEditInkling}
                errorIds={errorIds}
            />

            <FlexRow justifyContent="space-around">
                <AddButton onClick={handleAddInkling} />
                <CommitButton onClick={handleCommitInklings} />
            </FlexRow>
        </FlexCol>
    );
};

export default InputForm;
