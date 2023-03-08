// THIRD PARTY
import React from "react";

// MY COMPONENTS
import CircleButton from "./Base/CircleButton";

type AddButtonProps = {
  onClick: () => void;
};
const AddButton = (props: AddButtonProps) => {
  const { onClick } = props;

  return (
    <>
      <CircleButton onClick={onClick} radius={5}>
        +
      </CircleButton>
    </>
  );
};

export default AddButton;
