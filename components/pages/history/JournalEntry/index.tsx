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
import DMYTitle from "../../../generic/Date/DMYTitle";
import BoxShadow from "../../../generic/BoxShadow";
import styled from "styled-components";

type JournalEntryProps = {
    journalEntry: JournalEntryType;
    thoughtDict: Dict<Thought>;
};
const JournalEntry = (props: JournalEntryProps) => {
    const { journalEntry, thoughtDict } = props;

    // HOOKS
    const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

    return (
        <FramingDiv>
            <BoxShadow>
                <ContentDiv
                    width="100%"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <DMYTitle
                        date={new Date(journalEntry.timeId)}
                        pretext={"Entry"}
                    />

                    {journalEntry.reflections.map(({ thoughtId, decision }) => (
                        <JournalEntryThought
                            key={thoughtId}
                            thought={thoughtDict[thoughtId]}
                            reflectionDecision={decision}
                        />
                    ))}
                </ContentDiv>
            </BoxShadow>
        </FramingDiv>
    );
};

export default JournalEntry;

const FramingDiv = styled.div`
    padding: 20px 0;
    background: transparent;
`;

const ContentDiv = styled(FlexCol)`
    border: solid black;
    border-radius: 0.4rem;
    padding: 20px;
`;
