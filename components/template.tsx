// THIRD PARTY
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";

// MY COMPONENTS

// REDUX

// TYPES

type TemplateProps = {};
const Template = (props: TemplateProps) => {
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
    <>
      {newEntries.map(({ id, data }: DataWId<string>, i: number) => (
        <Input
          key={id}
          value={data}
          onCommit={(newEntry: string) => handleEditEntry(i, newEntry)}
        />
      ))}
    </>
  );
};

export default Template;
