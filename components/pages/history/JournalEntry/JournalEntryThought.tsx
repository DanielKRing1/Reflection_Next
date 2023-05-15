// THIRD PARTY
import React from "react";
import styled from "styled-components";

// GENERIC COMPONENTS
import { MyButtonNoMargin } from "../../../generic/Button/Base/MyButton";
import { MyTextNoMargin } from "../../../generic/Text/MyText";

// UTILS
import { formatTime } from "../../../../utils/time";

// TYPES
import { ReflectionDecision, Thought } from "../../../../db/api/types";
import FlexRow from "../../../generic/Flex/FlexRow";
import DMYLine from "../../../generic/Date/DMYLine";

type JournalEntryThoughtProps = {
    isHovered: boolean;
    thought: Thought;
    reflectionDecision: ReflectionDecision;
};
const JournalEntryThought = (props: JournalEntryThoughtProps) => {
    const {
        isHovered,
        thought = { text: undefined, timeId: undefined },
        reflectionDecision,
    } = props;

    return (
        <ThoughtContainer reflectionDecision={reflectionDecision}>
            <FlexRow>
                {thought.timeId ? (
                    <DMYLine date={new Date(thought.timeId)} />
                ) : (
                    <StyledText>Loading...</StyledText>
                )}

                <StyledText>{thought.text || "Loading..."}</StyledText>
            </FlexRow>
            {isHovered && <StyledText>{formatTime(thought.timeId)}</StyledText>}
        </ThoughtContainer>
    );
};

export default JournalEntryThought;

// STYLED COMPONENTS
const StyledText = styled(MyTextNoMargin)`
    text-align: start;
`;

type ThoughtContainerProps = {
    reflectionDecision: ReflectionDecision;
};
const ThoughtContainer = styled(MyButtonNoMargin)<ThoughtContainerProps>`
    width: 90%;
    padding: 10px;

    &,
    & > * {
        background: ${({ reflectionDecision }) =>
            reflectionDecision === ReflectionDecision.ThoughtKeep ||
            reflectionDecision === ReflectionDecision.InklingKeep
                ? "#D0FFBC"
                : "#EED3D0"};
    }
`;
