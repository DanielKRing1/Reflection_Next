// THIRD-PARTY
import React from "react";
import { useSelector } from "react-redux";

// PAGE-SPECIFIC COMPONENTS
import JournalEntry from "./JournalEntry";

// TYPES
import { JournalEntry as JournalEntryType } from "../../../db/api/types";
import { RootState } from "../../../redux/store";
import FlexCol from "../../generic/Flex/FlexCol";

const HistoryList = () => {
  const { journal } = useSelector((state: RootState) => state.journalSlice);

  return (
    <FlexCol>
      {journal.map((journalEntry: JournalEntryType) => (
        <JournalEntry journalEntry={journalEntry} />
      ))}
    </FlexCol>
  );
};

export default HistoryList;
