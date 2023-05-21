import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";

import FlexCol from "../../../../generic/Flex/FlexCol";
import InputRow from "./InputRow";

import { Inkling } from "../../../../../types/db";
import { nothingFocused } from "../../../../../utils/focus";
import { pendingInklingsVar } from "../../../../../graphql/apollo/local/state/pendingInklings";

type InputListProps = {
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    rmFocusedIndex: () => void;
    onAddInkling: () => void;
    onRmInkling: (index: number) => void;
    onEditInkling: (index: number, newText: string) => void;
    errorIds: Set<number>;
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
    const pendingInklings: Inkling[] = useReactiveVar(pendingInklingsVar);

    // 'Enter' handler
    useEffect(() => {
        // 1. Define a key down handler
        const keydownHandler = (e: KeyboardEvent) => {
            // 0. Only handle 'Enter' key events
            if (e.key !== "Enter") return;

            // 1. If focused
            if (focusedIndex > -1) {
                // 1.1. Empty, rm Inkling and rm focus
                if (pendingInklings[focusedIndex].text === "") {
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
                        if (pendingInklings[index].text === "") {
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
                // Only handle 'Enter' if not focused on another page element
                if (!nothingFocused()) return;

                // 2.1. Focus first empty
                let nextEmpty;
                for (let i = 0; i < pendingInklings.length; i++) {
                    const index = i % pendingInklings.length;
                    if (pendingInklings[index].text === "") {
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
            {pendingInklings.map(
                ({ timeId, journalId, text }: Inkling, i: number) => (
                    <InputRow
                        key={timeId}
                        borderColor={errorIds.has(timeId) ? "white" : ""}
                        value={text}
                        onChange={(newEntry: string) =>
                            onEditInkling(i, newEntry)
                        }
                        isFocused={i === focusedIndex}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => {
                            if (i === focusedIndex) rmFocusedIndex();
                        }}
                    />
                )
            )}
        </FlexCol>
    );
};
