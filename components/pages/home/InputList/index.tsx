// THIRD PARTY
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS
import InputRow from "./InputRow";

// REDUX
import { editEntry } from "../../../../redux/newEntriesSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../redux/store";
import { DataWId } from "../../../../types/data";
import AddInputButton from "./AddInputButton";

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
    <FlexCol>
      {newEntries.map(({ id, data }: DataWId<string>, i: number) => (
        <InputRow
          key={id}
          value={data}
          onCommit={(newEntry: string) => handleEditEntry(i, newEntry)}
        />
      ))}

      <AddInputButton />
    </FlexCol>
  );
};

export default InputList;
