// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import genId from "@asianpersonn/time-id";

// MY COMPONENTS
import CircleButton from "../../../generic/Button/CircleButton";

// REDUX
import { addEntry, reset } from "../../../../redux/newEntriesSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../redux/store";
import NoWrap from "../../../generic/Container/NoWrap";

type SubmitButtonProps = {};
const SubmitButton = (props: SubmitButtonProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newEntries, emptyEntries } = useSelector(
    (state: RootState) => state.newEntriesSlice
  );

  // HANDLERS
  const handleSubmitEntry = () => {
    // Cannot submit if empty entries exist
    if (Object.keys(emptyEntries).length > 0) return;

    dispatch(reset());
  };

  return (
    <>
      <CircleButton onClick={handleSubmitEntry} radius={5}>
        <NoWrap>{"->"}</NoWrap>
      </CircleButton>
    </>
  );
};

export default SubmitButton;
