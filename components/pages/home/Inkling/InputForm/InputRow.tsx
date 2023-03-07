// THIRD PARTY
import React from "react";

// COMPONENTS
import EditableText, {
  EditableTextProps,
} from "../../../../generic/Input/EditableText";

type InputRowProps = {} & EditableTextProps;
const InputRow = (props: InputRowProps) => {
  return <EditableText {...props} />;
};

export default InputRow;
