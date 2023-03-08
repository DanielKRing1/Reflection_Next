// THIRD PARTY
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";

// PAGE-SPECIFIC COMPONENTS
import InputRow from "./InputRow";

// REDUX
import {
  editInkling,
  rmFocusedInkling,
  rmInkling,
  setFocusedInkling,
} from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { Inkling } from "../../../../../db/api/types";
import { Dict } from "../../../../../types/data";

type InputListProps = {
  errorIds: Dict<boolean>;
  onAddEntry: () => void;
};
const InputList = (props: InputListProps) => {
  const { errorIds, onAddEntry } = props;

  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newInklings, emptyInklings, focusedInklingIndex } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleAddInkling = useCallback(() => {
    onAddEntry();
  }, [onAddEntry]);
  const handleEditInkling = (index: number, newEntry: string) => {
    dispatch(editInkling({ index, data: newEntry }));
  };
  const handleRmInkling = (index: number) => {
    // Will unfocus
    dispatch(rmInkling(index));
  };

  const handleFocusInkling = useCallback(
    (index: number) => {
      dispatch(setFocusedInkling(index));
    },
    [dispatch, setFocusedInkling]
  );
  const handleBlurInkling = useCallback(() => {
    // if (nothingFocused()) dispatch(rmFocusedInkling());
    dispatch(rmFocusedInkling());
  }, [dispatch, rmFocusedInkling]);

  // HANDLE KEYBOARD PRESS ENTER
  useEffect(() => {
    // 1. Defined key down handler
    const keydownHandler = (e: KeyboardEvent) => {
      // Only handle 'Enter' key events
      if (e.key !== "Enter") return;
      // Last index focused and empty
      if (
        newInklings.length > 0 &&
        newInklings[newInklings.length - 1].data === "" &&
        focusedInklingIndex === newInklings.length - 1
      )
        return handleRmInkling(focusedInklingIndex);
      // Already focused, then unfocus
      if (focusedInklingIndex > -1) return handleBlurInkling();

      // 1. Look for empty Inkling
      const pivotIndex = focusedInklingIndex > -1 ? focusedInklingIndex : 0;
      for (let i = 0; i < newInklings.length; i++) {
        const shiftedIndex = (pivotIndex + i) % newInklings.length;
        const { data, id } = newInklings[shiftedIndex];

        // 2. Found next empty Inkling, focus it
        if (data === "") return handleFocusInkling(shiftedIndex);
      }

      // 3. No empty Inklings, add new input (will focus)
      handleAddInkling();
    };

    // 2. Add key down handler
    document.addEventListener("keydown", keydownHandler);

    // 3. Remove key down handler
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [newInklings, handleFocusInkling, handleBlurInkling, handleAddInkling]);

  return (
    <FlexCol alignItems="stretch">
      {newInklings.map(({ id, data }: Inkling, i: number) => (
        <InputRow
          key={id}
          borderColor={errorIds[id] ? "white" : ""}
          value={data}
          onChange={(newEntry: string) => handleEditInkling(i, newEntry)}
          isFocused={i === focusedInklingIndex}
          onFocus={() => handleFocusInkling(i)}
          onBlur={() => handleBlurInkling()}
        />
      ))}
    </FlexCol>
  );
};

export default InputList;
