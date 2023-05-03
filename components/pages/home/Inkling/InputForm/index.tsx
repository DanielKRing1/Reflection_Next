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
import { GET_PENDING_INKLINGS } from "../../../../../graphql/apollo/local/gql/pendingInklings";
import { useQuery } from "@apollo/client";
import { Inklings } from "../../../../../db/api/types";
import {
    addPendingInkling,
    editPendingInkling,
    rmPendingInkling,
} from "../../../../../graphql/apollo/local/state/pendingInklings";
import commitInklings from "../../../../../graphql/apollo/mutationExamples/commitInklings";

const InputForm = () => {
    // LOCAL STATE
    const [errorIds, setErrorIds] = useState<Set<string>>(new Set());
    const [timeoutHandle, setTimeoutHandle] = useState<
        NodeJS.Timeout | undefined
    >();

    // APOLLO CLIENT
    const {
        data: { pendingInklings },
    } = useQuery(GET_PENDING_INKLINGS);

    const [commit, { data, loading, error }] = commitInklings();

    // HANDLERS
    const handleAddInkling = () => {
        // Cannot add entry if empty entries exist
        if ((pendingInklings as Inklings).some(({ data }) => data === ""))
            return;

        addPendingInkling({ id: genId(), data: "" });
    };

    const handleRmInkling = (index: number) => {
        rmPendingInkling(index);
    };

    const handleEditInkling = (index: number, newText: string) => {
        editPendingInkling(index, newText);
    };

    const handleCommitInklings = () => {
        const emptyInklings: Set<string> = new Set(
            pendingInklings
                .filter(({ data }) => data === "")
                .map(({ id }) => id)
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
                errorIds={errorIds}
                onAddInkling={handleAddInkling}
                onRmInkling={handleRmInkling}
                onEditInkling={handleEditInkling}
                onCommitInklings={handleCommitInklings}
            />

            <FlexRow justifyContent="space-around">
                <AddButton onClick={handleAddInkling} />
                <CommitButton onClick={handleCommitInklings} />
            </FlexRow>
        </FlexCol>
    );
};

export default InputForm;
