// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import genId from "@asianpersonn/time-id";

// MY COMPONENTS
import CircleButton from "../../../../generic/Button/CircleButton";

// REDUX
import {
  addInkling,
  startCommitNewInklings,
} from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import NoWrap from "../../../../generic/Container/NoWrap";

type CommitSubmitButtonProps = {};
const CommitButton = (props: CommitSubmitButtonProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newInklings, emptyEntries } = useSelector(
    (state: RootState) => state.newInklingsSlice
  );

  // HANDLERS
  const handleCommitNewInklings = () => {
    // TODO Handle this in Redux:
    //    Reject Thunk, set error + timeout to clear error

    // Cannot submit if empty entries exist
    if (Object.keys(emptyEntries).length > 0) return;

    dispatch(startCommitNewInklings());
  };

  return (
    <>
      <CircleButton onClick={handleCommitNewInklings} radius={5}>
        <NoWrap>{"->"}</NoWrap>
      </CircleButton>
    </>
  );
};

export default CommitButton;
