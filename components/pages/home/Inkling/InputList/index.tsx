// THIRD PARTY
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS
import InputRow from "./InputRow";

// REDUX
import { editInkling } from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import AddInputButton from "./AddInputButton";
import FlexCol from "../../../../generic/Flex/FlexCol";
import FlexRow from "../../../../generic/Flex/FlexRow";
import CommitButton from "./CommitButton";
import { Inkling } from "../../../../../db/api/types";

type InputListProps = {};
const InputList = (props: InputListProps) => {
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

      <FlexRow justifyContent="space-around">
        <AddInputButton />
        <CommitButton />
      </FlexRow>
    </FlexCol>
  );
};

export default InputList;
