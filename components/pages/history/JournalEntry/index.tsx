// THIRD PARTY
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntryThought";

// TYPES
import {
    JournalEntry as JournalEntryType,
    Thought,
} from "../../../../db/api/types";

// UTILS
import useOnHover from "../../../../hooks/useOnHover";
import FlexCol from "../../../generic/Flex/FlexCol";

type JournalEntryProps = {
    journalEntry: JournalEntryType;
    thought: Thought;
};
const JournalEntry = (props: JournalEntryProps) => {
    const { journalEntry, thought } = props;

    // HOOKS
    const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

    return (
        <FlexCol
            style={{ width: "70%", border: "solid black" }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p>World</p>
            {journalEntry.reflections.map(({ thoughtId, decision }) => (
                <JournalEntryThought
                    key={thoughtId}
                    isHovered={isHovered}
                    thought={thought}
                    reflectionDecision={decision}
                />
            ))}
        </FlexCol>
    );
};

export default JournalEntry;
