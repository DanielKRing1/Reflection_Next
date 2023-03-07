// THIRD PARTY
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";

// PAGE-SPECIFIC COMPONENTS
import InputRow from "./InputRow";

// REDUX
import { editInkling } from "../../../../../redux/newInklingsSlice";

// UTILS
import { nothingFocused } from "../../../../../utils/focus";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { Inkling } from "../../../../../db/api/types";

type InputListProps = {
  handleAddEntry: () => void;
};
const InputList = (props: InputListProps) => {
  const { handleAddEntry } = props;

  // HANDLE KEYBOARD PRESS ENTER
  useEffect(() => {
    // 1. Defined key down handler
    const keydownHandler = (e: KeyboardEvent) => {
      console.log("a");
      if (nothingFocused() && e.key === "Enter") handleAddEntry();
    };

    // 2. Add key down handler
    document.addEventListener("keydown", keydownHandler);

    // 3. Remove key down handler
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [handleAddEntry]);

  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newInklings } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleEditEntry = (index: number, newEntry: string) => {
    dispatch(editInkling({ index, data: newEntry }));
  };

  return (
    <FlexCol alignItems="stretch">
      {newInklings.map(({ id, data }: Inkling, i: number) => (
        <InputRow
          key={id}
          value={data}
          onCommit={(newEntry: string) => handleEditEntry(i, newEntry)}
        />
      ))}
    </FlexCol>
  );
};

export default InputList;
