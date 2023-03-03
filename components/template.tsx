// THIRD PARTY
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS

// REDUX

// TYPES
import { Inkling } from "../db/api/types";

type TemplateProps = {};
const Template = (props: TemplateProps) => {
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
    <>
      {newInklings.map(({ id, data }: Inkling, i: number) => (
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
