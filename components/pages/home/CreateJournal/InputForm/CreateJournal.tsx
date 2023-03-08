// THIRD PARTY
import React from "react";
import { useDispatch } from "react-redux";

// MY COMPONENTS
import MyButton from "../../../../generic/Button/Base/MyButton";

// REDUX
import { startCreateJournal } from "../../../../../redux/createJournalSlice";

// TYPES
import { AppDispatch } from "../../../../../redux/store";

type CreateJournalProps = {};
const CreateJournal = (props: CreateJournalProps) => {
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

export default CreateJournal;
