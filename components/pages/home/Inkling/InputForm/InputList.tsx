import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import FlexCol from "../../../../generic/Flex/FlexCol";
import InputRow from "./InputRow";

import { GET_PENDING_INKLINGS } from "../../../../../graphql/apollo/local/gql/pendingInklings";
import { Inkling } from "../../../../../db/api/types";

type InputListProps = {
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    rmFocusedIndex: () => void;
    onAddInkling: () => void;
    onRmInkling: (index: number) => void;
    onEditInkling: (index: number, newText: string) => void;
    errorIds: Set<string>;
};
export const InputList = (props: InputListProps) => {
    const {
        focusedIndex,
        setFocusedIndex,
        rmFocusedIndex,
        onAddInkling,
        onRmInkling,
        onEditInkling,
        errorIds,
    } = props;

    // APOLLO CLIENT
    const {
        data: { pendingInklings },
    } = useQuery(GET_PENDING_INKLINGS);

    // 'Enter' handler
    useEffect(() => {
        // 1. Define a key down handler
        const keydownHandler = (e: KeyboardEvent) => {
            // 0. Only handle 'Enter' key events
            if (e.key !== "Enter") return;

            // 1. If focused
            if (focusedIndex > -1) {
                // 1.1. Empty, rm Inkling and rm focus
                if (pendingInklings[focusedIndex].data === "") {
                    onRmInkling(focusedIndex);
                    rmFocusedIndex();
                }
                // 1.2. Not empty, focus next empty
                else {
                    let nextEmpty;
                    for (
                        let i = focusedIndex + 1;
                        i < focusedIndex + pendingInklings.length;
                        i++
                    ) {
                        const index = i % pendingInklings.length;
                        if (pendingInklings[index].data === "") {
                            nextEmpty = index;
                            break;
                        }
                    }
                    if (nextEmpty) setFocusedIndex(nextEmpty);
                    else {
                        setFocusedIndex(pendingInklings.length);
                        onAddInkling();
                    }
                }
            }
            // 2. Not focused
            else {
                // 2.1. Focus first empty
                let nextEmpty;
                for (let i = 0; i < pendingInklings.length; i++) {
                    const index = i % pendingInklings.length;
                    if (pendingInklings[index].data === "") {
                        nextEmpty = index;
                        break;
                    }
                }
                if (nextEmpty) setFocusedIndex(nextEmpty);
                // 2.2. Or add new Inkling and focus
                else {
                    setFocusedIndex(pendingInklings.length);
                    onAddInkling();
                }
            }
        };

        // 2. Add key down handler
        document.addEventListener("keydown", keydownHandler);

        // 3. Remove key down handler
        return () => document.removeEventListener("keydown", keydownHandler);
    }, [pendingInklings, focusedIndex]);

    return (
        <FlexCol alignItems="stretch">
            {pendingInklings.map(({ id, data }: Inkling, i: number) => (
                <InputRow
                    key={id}
                    borderColor={errorIds.has(id) ? "white" : ""}
                    value={data}
                    onChange={(newEntry: string) => onEditInkling(i, newEntry)}
                    isFocused={i === focusedIndex}
                    onFocus={() => setFocusedIndex(i)}
                    onBlur={() => {
                        if (i === focusedIndex) rmFocusedIndex();
                    }}
                />
            ))}
        </FlexCol>
    );
};
