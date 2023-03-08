import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inkling } from "../../../../../db/api/types";
import {
  addInklingId,
  addThoughtId,
  rmInklingId,
  rmThoughtId,
} from "../../../../../redux/createJournalEntrySlice";
import { AppDispatch, RootState } from "../../../../../redux/store";
import FlexCol from "../../../../generic/Flex/FlexCol";
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
  const { selectedInklingIds, selectedThoughtIds } = useSelector(
    (state: RootState) => state.createJournalEntrySlice
  );
  const dispatch: AppDispatch = useDispatch();

  // HANDLERS
  const handleToggleSelectThought = (id: string) => {
    if (!selectedThoughtIds[id]) dispatch(addThoughtId(id));
    else dispatch(rmThoughtId(id));
  };
  const handleToggleSelectInkling = (id: string) => {
    console.log("toggle");
    console.log(id);
    if (!selectedInklingIds[id]) dispatch(addInklingId(id));
    else dispatch(rmInklingId(id));
  };

  return (
    <FlexCol>
      {identityThoughtIds.map((id: string) => (
        <SelectionItem
          key={id}
          isSelected={selectedThoughtIds[id] || false}
          text={thoughtsDict[id].data}
          onClick={() => handleToggleSelectThought(id)}
        />
      ))}

      {newInklings.map((inkling: Inkling) => (
        <SelectionItem
          key={inkling.id}
          isSelected={selectedInklingIds[inkling.id] || false}
          text={inkling.data}
          onClick={() => handleToggleSelectInkling(inkling.id)}
        />
      ))}
    </FlexCol>
  );
};

export default SelectionList;
