// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";

// PAGE-SPECIFIC COMPONENTS
import InputRow from "./InputRow";

// REDUX
import { editInkling } from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { Inkling } from "../../../../../db/api/types";

const InputList = () => {
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
