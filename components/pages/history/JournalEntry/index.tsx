// THIRD PARTY
import React from "react";

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
import { formatTime } from "../../../../utils/time";
import DMYTitle from "../../../generic/Date/DMYTitle";
import { MyTextNoMargin } from "../../../generic/Text/MyText";

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
            style={{ border: "solid black", padding: "20px" }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <DMYTitle date={new Date(journalEntry.timeId)} pretext={"Entry"} />

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
