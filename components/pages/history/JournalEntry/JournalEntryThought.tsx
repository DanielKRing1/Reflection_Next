// THIRD PARTY
import React from "react";
import styled from "styled-components";

// GENERIC COMPONENTS
import MyButton from "../../../generic/Button/Base/MyButton";
import MyText from "../../../generic/Text/MyText";

// UTILS
import { formatTime } from "../../../../utils/time";

// TYPES
import { ReflectionDecision, Thought } from "../../../../db/api/types";

type JournalEntryThoughtProps = {
  isHovered: boolean;
  thought: Thought;
  reflectionDecision: ReflectionDecision;
};
const JournalEntryThought = (props: JournalEntryThoughtProps) => {
  const { isHovered, thought, reflectionDecision } = props;

  return (
    <ThoughtContainer reflectionDecision={reflectionDecision}>
      <StyledText>{thought.data}</StyledText>
      <StyledText>{formatTime(thought.time)}</StyledText>
      {/* {isHovered && <StyledText>{formatTime(thought.time)}</StyledText>} */}
    </ThoughtContainer>
  );
};

export default JournalEntryThought;

// STYLED COMPONENTS
const StyledText = styled(MyText)`
  text-align: start;
`;

type ThoughtContainerProps = {
  reflectionDecision: ReflectionDecision;
};
const ThoughtContainer = styled(MyButton)<ThoughtContainerProps>`
  &,
  & > * {
    background: ${({ reflectionDecision }) =>
      reflectionDecision === ReflectionDecision.Keep ? "#D0FFBC" : "#EED3D0"};
  }
`;
