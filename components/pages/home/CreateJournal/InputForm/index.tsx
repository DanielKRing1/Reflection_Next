// THIRD-PARTY
import React from "react";

// GENERIC COMPONENTS
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import Input from "./Input";
import CreateJournal from "..";

const InputForm = () => {
  return (
    <FlexRow>
      <Input />
      <CreateJournal />
    </FlexRow>
  );
};

export default InputForm;
