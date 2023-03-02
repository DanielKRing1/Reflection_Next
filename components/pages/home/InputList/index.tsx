// THIRD PARTY
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS
import InputRow from "./InputRow";

// REDUX
import { editEntry } from "../../../../redux/newEntriesSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../redux/store";
import AddInputButton from "./AddInputButton";
import FlexCol from "../../../generic/Flex/FlexCol";
import FlexRow from "../../../generic/Flex/FlexRow";
import SubmitButton from "./SubmitButton";
import { Inkling } from "../../../../db/api/types";

type InputListProps = {};
const InputList = (props: InputListProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newEntries } = useSelector(
    (state: RootState) => state.newEntriesSlice
  );

  // HANDLERS
  const handleEditEntry = (index: number, newEntry: string) => {
    dispatch(editEntry({ index, data: newEntry }));
  };

  return (
    <FlexCol alignItems="stretch">
      {newEntries.map(({ id, data }: Inkling, i: number) => (
        <InputRow
          key={id}
          value={data}
          onCommit={(newEntry: string) => handleEditEntry(i, newEntry)}
        />
      ))}

      <FlexRow justifyContent="space-around">
        <AddInputButton />
        <SubmitButton />
      </FlexRow>
    </FlexCol>
  );
};

export default InputList;
