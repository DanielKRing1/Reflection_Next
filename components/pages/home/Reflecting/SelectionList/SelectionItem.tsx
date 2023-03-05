import React from "react";
import MyButton from "../../../../generic/Button/MyButton";
import MyText from "../../../../generic/Text/MyText";

type SelectionItemProps = {
  text: string;
  onClick: () => void;
};
const SelectionItem = (props: SelectionItemProps) => {
  const { text, onClick } = props;

  return (
    <MyButton onClick={onClick}>
      <MyText>{text}</MyText>
    </MyButton>
  );
};

export default SelectionItem;
