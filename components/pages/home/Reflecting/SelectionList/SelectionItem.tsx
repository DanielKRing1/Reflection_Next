// THIRD PARTY
import React from "react";

// MY COMPONENTS
import MyText from "../../../../generic/Text/MyText";
import MyButton from "../../../../generic/Button/Base/MyButton";

type SelectionItemProps = {
  isSelected: boolean;
  text: string;
  onClick: () => void;
};
const SelectionItem = (props: SelectionItemProps) => {
  const { isSelected, text, onClick } = props;

  return (
    <MyButton
      style={{ width: "35vw" }}
      borderColor={isSelected ? "#AAFF00" : ""}
      onClick={onClick}
    >
      <MyText>{text}</MyText>
    </MyButton>
  );
};

export default SelectionItem;
