// THIRD PARTY
import React from "react";

// MY COMPONENTS
import CircleButton from "../../../../generic/Button/CircleButton";
type AddInputButtonProps = {
  handleAddEntry: () => void;
};
const AddInputButton = (props: AddInputButtonProps) => {
  const { handleAddEntry } = props;

  return (
    <>
      <CircleButton onClick={handleAddEntry} radius={5}>
        +
      </CircleButton>
    </>
  );
};

export default AddInputButton;
