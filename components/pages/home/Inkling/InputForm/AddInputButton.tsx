// THIRD PARTY
import React from "react";

// MY COMPONENTS
import CircleButton from "../../../../generic/Button/CircleButton";
type AddInputButtonProps = {
  handleAddInkling: () => void;
};
const AddInputButton = (props: AddInputButtonProps) => {
  const { handleAddInkling } = props;

  return (
    <>
      <CircleButton onClick={handleAddInkling} radius={5}>
        +
      </CircleButton>
    </>
  );
};

export default AddInputButton;
