// THIRD PARTY
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";

// PAGE-SPECIFIC COMPONENTS
import InputRow from "./InputRow";

// TYPES
import { Inkling } from "../../../../../db/api/types";
import { useQuery } from "@apollo/client";
import { GET_PENDING_INKLINGS } from "../../../../../graphql/apollo/local/gql/pendingInklings";
import {
    editPendingInkling,
    rmPendingInkling,
} from "../../../../../graphql/apollo/local/state/pendingInklings";

type InputListProps = {
    errorIds: Set<string>;
    onAddInkling: () => void;
};
const InputList = (props: InputListProps) => {
    const { errorIds, onAddInkling } = props;

    // LOCAL STATE
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const rmFocusedIndex = () => setFocusedIndex(-1);

    // APOLLO CLIENT
    const {
        data: { pendingInklings },
    } = useQuery(GET_PENDING_INKLINGS);

    // HANDLERS
    const handleAddInkling = useCallback(() => {
        onAddInkling();
    }, [onAddInkling]);
    const handleEditInkling = (index: number, newEntry: string) => {
        editPendingInkling(index, newEntry);
    };
    const handleRmInkling = (index: number) => {
        // Will unfocus
        rmPendingInkling(index);
    };

    const handleFocusInkling = useCallback(
        (index: number) => {
            setFocusedIndex(index);
        },
        [setFocusedIndex]
    );
    const handleBlurInkling = useCallback(
        (index: number) => {
            if (index === focusedIndex) rmFocusedIndex();
        },
        [rmFocusedIndex, focusedIndex]
    );

    // HANDLE KEYBOARD PRESS ENTER
    useEffect(() => {
        // 1. Defined key down handler
        const keydownHandler = (e: KeyboardEvent) => {
            // 1.1. Only handle 'Enter' key events
            if (e.key !== "Enter") return;
            // 1.2. Last index focused and empty -> remove it
            if (
                pendingInklings.length > 0 &&
                pendingInklings[pendingInklings.length - 1].data === "" &&
                focusedIndex === pendingInklings.length - 1
            )
                return handleRmInkling(focusedIndex);
            // 1.3. Focusing an empty Inkling -> unfocus it and return
            if (focusedIndex > -1 && pendingInklings[focusedIndex].data === "")
                return handleBlurInkling(focusedIndex);

            // 1.4. Look for empty Inkling
            const pivotIndex = focusedIndex > -1 ? focusedIndex : 0;
            for (let i = 0; i < pendingInklings.length; i++) {
                const shiftedIndex = (pivotIndex + i) % pendingInklings.length;
                const { data, id } = pendingInklings[shiftedIndex];

                // 1.5. Found next empty Inkling, focus it
                if (data === "") return handleFocusInkling(shiftedIndex);
            }

            // 1.6. No empty Inklings, add new input and focus it
            handleAddInkling();
        };

        // 2. Add key down handler
        document.addEventListener("keydown", keydownHandler);

        // 3. Remove key down handler
        return () => document.removeEventListener("keydown", keydownHandler);
    }, [
        pendingInklings,
        handleFocusInkling,
        handleBlurInkling,
        handleAddInkling,
    ]);

    return (
        <FlexCol alignItems="stretch">
            {pendingInklings.map(({ id, data }: Inkling, i: number) => (
                <InputRow
                    key={id}
                    borderColor={errorIds.has(id) ? "white" : ""}
                    value={data}
                    onChange={(newEntry: string) =>
                        handleEditInkling(i, newEntry)
                    }
                    isFocused={i === focusedIndex}
                    onFocus={() => handleFocusInkling(i)}
                    onBlur={() => handleBlurInkling(i)}
                />
            ))}
        </FlexCol>
    );
};

export default InputList;
