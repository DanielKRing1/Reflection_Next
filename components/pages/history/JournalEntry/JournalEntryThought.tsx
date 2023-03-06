// THIRD PARTY
import React from "react";
import { ReflectionDecision, Thought } from "../../../../db/api/types";

// GENERIC COMPONENTS
import MyButton from "../../../generic/Button/MyButton";
import MyText from "../../../generic/Text/MyText";

type JournalEntryThoughtProps = {
  isHovered: boolean;
  thought: Thought;
  reflectionDecision: ReflectionDecision;
};
const JournalEntryThought = (props: JournalEntryThoughtProps) => {
  const { isHovered, thought, reflectionDecision } = props;

  return (
    <MyButton
      style={{
        borderColor:
          reflectionDecision === ReflectionDecision.Keep ? "green" : "red",
      }}
    >
      <MyText>{thought.data}</MyText>
      {isHovered && <MyText>{thought.time.toDateString()}</MyText>}
    </MyButton>
  );
};

export default JournalEntryThought;
