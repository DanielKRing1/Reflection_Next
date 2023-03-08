// THIRD-PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";
import MyText from "../../../../generic/Text/MyText";

// PAGE-SPECIFIC COMPONENTS
import SelectionItem from "./SelectionItem";

// REDUX
import {
  addInklingId,
  addThoughtId,
  rmInklingId,
  rmThoughtId,
} from "../../../../../redux/createJournalEntrySlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { Inkling } from "../../../../../db/api/types";

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

  // Toggle selection
  const handleToggleSelectThought = (id: string) => {
    if (!selectedThoughtIds[id]) dispatch(addThoughtId(id));
    else dispatch(rmThoughtId(id));
  };
  const handleToggleSelectInkling = (id: string) => {
    if (!selectedInklingIds[id]) dispatch(addInklingId(id));
    else dispatch(rmInklingId(id));
  };

  return (
    <>
      <FlexCol>
        {identityThoughtIds.length > 0 ? (
          identityThoughtIds.map((id: string) => (
            <SelectionItem
              key={id}
              isSelected={selectedThoughtIds[id] || false}
              text={thoughtsDict[id].data}
              onClick={() => handleToggleSelectThought(id)}
            />
          ))
        ) : (
          <MyText>No previous Journal Entry</MyText>
        )}
      </FlexCol>

      <hr
        style={{
          width: "100%",
          height: "1vh",
          borderWidth: 0,
          backgroundColor: "#abefef",
        }}
      />

      <FlexCol>
        {newInklings.map((inkling: Inkling) => (
          <SelectionItem
            key={inkling.id}
            isSelected={selectedInklingIds[inkling.id] || false}
            text={inkling.data}
            onClick={() => handleToggleSelectInkling(inkling.id)}
          />
        ))}
      </FlexCol>
    </>
  );
};

export default SelectionList;
