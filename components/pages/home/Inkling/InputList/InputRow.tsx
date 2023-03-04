// THIRD PARTY
import React from "react";

// COMPONENTS
import EditableText, {
  EditableTextProps,
} from "../../../../generic/Input/EditableText";

type InputRowProps = {} & EditableTextProps;
const InputRow = (props: InputRowProps) => {
  const { value } = props;

  return (
    <EditableText
      // Autofocus empty inputs (empty inputs are deleted unless they were just added)
      autoFocus={value === ""}
      {...props}
    />
  );
};

export default InputRow;
