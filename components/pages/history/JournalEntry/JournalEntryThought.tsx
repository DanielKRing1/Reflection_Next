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
    <StyledButton reflectionDecision={reflectionDecision}>
      <MyText>{thought.data}</MyText>
      <MyText>{formatTime(thought.time)}</MyText>
      {/* {isHovered && <MyText>{formatTime(thought.time)}</MyText>} */}
    </StyledButton>
  );
};

export default JournalEntryThought;

// STYLED COMPONENTS
type StyledButtonProps = {
  reflectionDecision: ReflectionDecision;
};
const StyledButton = styled(MyButton)<StyledButtonProps>`
  &,
  & > * {
    background: ${({ reflectionDecision }) =>
      reflectionDecision === ReflectionDecision.Keep ? "#D0FFBC" : "#EED3D0"};
  }
`;
