// THIRD PARTY
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntry/JournalEntryThought";

// TYPES
import { JournalEntry, Reflection, Thought } from "../../../db/api/types";
import { RootState } from "../../../redux/store";

// UTILS
import { getThought } from "../../../redux/journalThoughtsDictSlice/utils/getThoughts";
import useOnHover from "../../../hooks/useOnHover";

type JournalEntryProps = {
  journalEntry: JournalEntry;
};
const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry } = props;

  // HOOKS
  const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

  // REDUX
  const { thoughtsDict } = useSelector(
    (state: RootState) => state.journalThoughtsDictSlice
  );

  // MEMO
  const thoughts = useMemo(
    () =>
      journalEntry.reflections.map(({ id, data }: Reflection) => ({
        thought: getThought(id, thoughtsDict),
        reflectionDecision: data,
      })),
    [journalEntry]
  );

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {thoughts.map(({ thought, reflectionDecision }) => (
        <JournalEntryThought
          isHovered={isHovered}
          thought={thought}
          reflectionDecision={reflectionDecision}
        />
      ))}
    </div>
  );
};

export default JournalEntry;
