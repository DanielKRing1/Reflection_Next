// THIRD PARTY
import React, { useMemo } from "react";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntry/JournalEntryThought";

// TYPES
import { JournalEntry, Reflection, Thought } from "../../../db/api/types";

type JournalEntryProps = {
  journalEntry: JournalEntry;
};
const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry } = props;

  const thoughts = useMemo(
    () =>
      journalEntry.reflections.map((reflection: Reflection) =>
        // TODO 1 Implement this method
        // TODO 2 Create a dict of { Journal name -> Journal id } in LocalStorage
        // TODO 3 Manage this dict in LocalStorageDriver and accept 'journalName' in Create Journal method (this method also creates the corresponding 'journalId')
        // TODO 4 Save journal metadata somewhere
        // TODO 5 Create Delete Journal methods
        getThoughtById(reflection.id)
      ),
    [journalEntry]
  );

  return (
    <>
      {thoughts.map((t: Thought) => (
        <JournalEntryThought thought={t} />
      ))}
    </>
  );
};

export default JournalEntry;
