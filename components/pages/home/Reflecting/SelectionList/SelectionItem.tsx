import React, { useEffect } from "react";
import MyButton from "../../../../generic/Button/MyButton";
import MyText from "../../../../generic/Text/MyText";

type SelectionItemProps = {
  isSelected: boolean;
  text: string;
  onClick: () => void;
};
const SelectionItem = (props: SelectionItemProps) => {
  const { isSelected, text, onClick } = props;
  useEffect(() => {
    console.log(isSelected);
  }, [isSelected]);

  return (
    <MyButton borderColor={isSelected ? "#AAFF00" : ""} onClick={onClick}>
      <MyText>{text}</MyText>
    </MyButton>
  );
};

export default SelectionItem;
