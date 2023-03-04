// THIRD PARTY
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// MY COMPONENTS
import MyTextInput from "../../../../generic/Input/MyTextInput";

// REDUX
import { editInkling } from "../../../../../redux/newInklingsSlice";

// TYPES
import { AppDispatch, RootState } from "../../../../../redux/store";
import { startCreateJournal } from "../../../../../redux/activeJournalSlice";

type InputListProps = {};
const InputList = (props: InputListProps) => {
  // LOCAL STATE
  const [newJournalId, setNewJournalId] = useState("");

  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // HANDLERS
  const handleEditJournalName = (id: string) => {
    setNewJournalId(id);
  };
  const handleCreateJournal = (newJournalId: string) => {
    dispatch(startCreateJournal(newJournalId));
  };

  return <MyTextInput />;
};

export default InputList;
