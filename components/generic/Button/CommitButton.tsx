// THIRD PARTY
import React from "react";

// MY COMPONENTS
import CircleButton from "./Base/CircleButton";
import NoWrap from "../Container/NoWrap";

type CommitSubmitButtonProps = {
  onClick: () => void;
};
const CommitButton = ({ onClick }: CommitSubmitButtonProps) => {
  return (
    <>
      <CircleButton onClick={onClick} radius={5}>
        <NoWrap>{"->"}</NoWrap>
      </CircleButton>
    </>
  );
};

export default CommitButton;
