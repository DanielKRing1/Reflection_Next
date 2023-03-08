// THIRD-PARTY
import React from "react";
import { useDispatch } from "react-redux";

// GENERIC COMPONENTS
import AddButton from "../../../../generic/Button/AddButton";

// REDUX
import { startCreateJournalEntry } from "../../../../../redux/createJournalEntrySlice";
import { AppDispatch } from "../../../../../redux/store";

const CreateJournalEntryButton = () => {
  // REDUX
  const dispatch: AppDispatch = useDispatch();

  // HANDLERS
  // Add Journal Entry
  const handleAddJournalEntry = () => {
    dispatch(startCreateJournalEntry());
  };

  return <AddButton onClick={handleAddJournalEntry} />;
};

export default CreateJournalEntryButton;
