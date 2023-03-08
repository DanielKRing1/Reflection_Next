// THIRD PARTY
import React from "react";

// MY COMPONENTS
import CircleButton from "../../../../generic/Button/CircleButton";
type AddInputButtonProps = {
  onClick: () => void;
};
const AddInputButton = (props: AddInputButtonProps) => {
  const { onClick } = props;

  return (
    <>
      <CircleButton onClick={onClick} radius={5}>
        +
      </CircleButton>
    </>
  );
};

export default AddInputButton;
