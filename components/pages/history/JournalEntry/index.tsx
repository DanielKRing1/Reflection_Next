// THIRD PARTY
import React, { useEffect, useMemo, useState } from "react";
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
import { Dict } from "../../../../types/data";

type JournalEntryProps = {
    journalEntry: JournalEntryType;
    thoughtDict: Dict<Thought>;
};
const JournalEntry = (props: JournalEntryProps) => {
    const { journalEntry, thoughtDict } = props;

    // HOOKS
    const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

    return (
        <FlexCol
            style={{ width: "70%", border: "solid black" }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {journalEntry.reflections.map(({ thoughtId, decision }) => (
                <JournalEntryThought
                    key={thoughtId}
                    isHovered={isHovered}
                    thought={thoughtDict[thoughtId]}
                    reflectionDecision={decision}
                />
            ))}
        </FlexCol>
    );
};

export default JournalEntry;
