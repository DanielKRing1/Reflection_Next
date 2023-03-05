// THIRD PARTY
import React from "react";
import { Thought } from "../../../../db/api/types";
import useOnHover from "../../../../hooks/useOnHover";

// GENERIC COMPONENTS
import MyButton from "../../../generic/Button/MyButton";
import MyText from "../../../generic/Text/MyText";

type JournalEntryThoughtProps = {
  thought: Thought;
};
const JournalEntryThought = (props: JournalEntryThoughtProps) => {
  const { thought } = props;

  const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

  return (
    <MyButton
      style={{ borderColor: isHovered ? "" : "red" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MyText>{thought.data}</MyText>
      {isHovered && <MyText>{thought.time.toDateString()}</MyText>}
    </MyButton>
  );
};

export default JournalEntryThought;
