// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import genId from "@asianpersonn/time-id";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import AddInputButton from "./AddInputButton";
import CommitButton from "./CommitButton";
import InputList from "./InputList";

// REDUX
import { addInkling } from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";

const InputForm = () => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { emptyInklings } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleAddEntry = () => {
    // Cannot add entry if empty entries exist
    if (Object.keys(emptyInklings).length > 0) return;

    dispatch(addInkling({ id: genId(), data: "" }));
  };

  return (
    <FlexCol alignItems="stretch">
      <InputList onAddEntry={handleAddEntry} />

      <FlexRow justifyContent="space-around">
        <AddInputButton handleAddEntry={handleAddEntry} />
        <CommitButton />
      </FlexRow>
    </FlexCol>
  );
};

export default InputForm;
