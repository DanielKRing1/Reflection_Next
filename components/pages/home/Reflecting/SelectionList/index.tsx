import React from "react";
import { useSelector } from "react-redux";
import { Inkling } from "../../../../../db/api/types";
import { RootState } from "../../../../../redux/store";
import SelectionItem from "./SelectionItem";

const SelectionList = () => {
  // REDUX
  const { newInklings } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );
  const { thoughtsDict } = useSelector(
    (state: RootState) => state.journalThoughtsDictSlice
  );
  const { identityThoughtIds } = useSelector(
    (state: RootState) => state.identityThoughtsSlice
  );

  return (
    <>
      {identityThoughtIds.map((id: string) => (
        <SelectionItem
          key={id}
          text={thoughtsDict[id].data}
          onClick={() => {}}
        />
      ))}

      {newInklings.map((inkling: Inkling) => (
        <SelectionItem
          key={inkling.id}
          text={inkling.data}
          onClick={() => {}}
        />
      ))}
    </>
  );
};

export default SelectionList;
