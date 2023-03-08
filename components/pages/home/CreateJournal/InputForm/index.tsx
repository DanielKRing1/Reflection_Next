// THIRD-PARTY
import React from "react";

// GENERIC COMPONENTS
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import Input from "./Input";
import CreateJournalButton from "./CreateJournalButton";

const InputForm = () => {
  return (
    <FlexRow>
      <Input />
      <CreateJournalButton />
    </FlexRow>
  );
};

export default InputForm;
