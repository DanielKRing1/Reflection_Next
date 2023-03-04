// THIRD PARTY
import React from "react";
import { useDispatch } from "react-redux";

// MY COMPONENTS

// REDUX
import { startCreateJournal } from "../../../../../redux/createJournalSlice";

// TYPES
import { AppDispatch } from "../../../../../redux/store";
import MyButton from "../../../../generic/Button/MyButton";

type CommitButtonProps = {};
const CommitButton = (props: CommitButtonProps) => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // HANDLERS
  const handleCreateJournal = () => {
    dispatch(startCreateJournal());
  };

  return (
    <>
      <MyButton onClick={handleCreateJournal}>Create New Journal</MyButton>
    </>
  );
};

export default CommitButton;
