// THIRD PARTY
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import genId from "@asianpersonn/time-id";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import AddButton from "../../../../generic/Button/AddButton";
import CommitButton from "../../../../generic/Button/CommitButton";
import InputList from "./InputList";

// REDUX
import {
  addInkling,
  startCommitNewInklings,
} from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { INKLING_ERROR_TIMEOUT_MS } from "../../../../../constants/error";
import { Dict } from "../../../../../types/data";

const InputForm = () => {
  // LOCAL STATE
  const [errorIds, setErrorIds] = useState<Dict<boolean>>({});
  const [timeoutHandle, setTimeoutHandle] = useState<
    NodeJS.Timeout | undefined
  >();

  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { emptyInklings } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleAddInkling = () => {
    // Cannot add entry if empty entries exist
    if (Object.keys(emptyInklings).length > 0) return;

    dispatch(addInkling({ id: genId(), data: "" }));
  };

  const handleCommitInklings = () => {
    if (Object.keys(emptyInklings).length === 0)
      return dispatch(startCommitNewInklings());

    // Cannot submit if empty Inklings exist
    //    Mark empty Inklings for error display
    setErrorIds(emptyInklings);
    //    Remove error display after some timeout
    if (timeoutHandle) clearTimeout(timeoutHandle);
    const handle = setTimeout(() => setErrorIds({}), INKLING_ERROR_TIMEOUT_MS);
    setTimeoutHandle(handle);
  };

  return (
    <FlexCol alignItems="stretch">
      <InputList errorIds={errorIds} onAddEntry={handleAddInkling} />

      <FlexRow justifyContent="space-around">
        <AddButton onClick={handleAddInkling} />
        <CommitButton onClick={handleCommitInklings} />
      </FlexRow>
    </FlexCol>
  );
};

export default InputForm;
