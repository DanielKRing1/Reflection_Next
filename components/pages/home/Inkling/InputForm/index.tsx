// THIRD PARTY
import React from "react";

// TYPES
import AddInputButton from "./AddInputButton";
import FlexCol from "../../../../generic/Flex/FlexCol";
import FlexRow from "../../../../generic/Flex/FlexRow";
import CommitButton from "./CommitButton";
import InputList from "./InputList";

const InputForm = () => {
  return (
    <FlexCol alignItems="stretch">
      <InputList />

      <FlexRow justifyContent="space-around">
        <AddInputButton />
        <CommitButton />
      </FlexRow>
    </FlexCol>
  );
};

export default InputForm;
