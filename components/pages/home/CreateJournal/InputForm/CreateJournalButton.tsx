// THIRD PARTY
import React from "react";
import { useDispatch } from "react-redux";

// MY COMPONENTS
import MyButton from "../../../../generic/Button/Base/MyButton";

// REDUX
import { startCreateJournal } from "../../../../../redux/createJournalSlice";

// TYPES
import { AppDispatch } from "../../../../../redux/store";

type CreateJournalButtonProps = {};
const CreateJournalButton = (props: CreateJournalButtonProps) => {
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

export default CreateJournalButton;
