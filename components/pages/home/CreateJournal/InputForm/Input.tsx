// THIRD PARTY
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// REDUX
import {
  setNewJournalId,
  startCreateJournal,
} from "../../../../../redux/createJournalSlice";

// TYPE
import { AppDispatch, RootState } from "../../../../../redux/store";

// MY COMPONENTS
import MyTextInput from "../../../../generic/Input/MyTextInput";

type InputProps = {};
const Input = (props: InputProps) => {
  4;
  // REDUX
  const dispatch: AppDispatch = useDispatch();
  const { newJournalName } = useSelector(
    (state: RootState) => state.createJournalSlice
  );

  // HANDLERS
  const handleEditJournalId = (id: string) => {
    dispatch(setNewJournalId(id));
  };

  const handleCreateJournal = () => {
    dispatch(startCreateJournal());
  };

  return (
    <MyTextInput
      placeholder="Journal Name..."
      value={newJournalName}
      onChange={handleEditJournalId}
      onEnter={handleCreateJournal}
    />
  );
};

export default Input;
