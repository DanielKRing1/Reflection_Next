// THIRD PARTY
import React from "react";
import { useSelector } from "react-redux";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntryThought";

// TYPES
import { JournalEntry as JournalEntryType } from "../../../../db/api/types";
import { RootState } from "../../../../redux/store";

// UTILS
import useOnHover from "../../../../hooks/useOnHover";
import FlexCol from "../../../generic/Flex/FlexCol";

type JournalEntryProps = {
  journalEntry: JournalEntryType;
};
const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry } = props;

  // HOOKS
  const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

  // REDUX
  const { thoughtsDict } = useSelector(
    (state: RootState) => state.journalThoughtsDictSlice
  );

  return (
    <FlexCol
      style={{ width: "70%", border: "solid black" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {journalEntry.reflections.map(({ id, data }) => (
        <JournalEntryThought
          key={id}
          isHovered={isHovered}
          thought={thoughtsDict[id]}
          reflectionDecision={data}
        />
      ))}
    </FlexCol>
  );
};

export default JournalEntry;
