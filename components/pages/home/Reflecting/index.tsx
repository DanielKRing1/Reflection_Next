// THIRD PARTY
import React from "react";

// GENERIC COMPONENTS
import FlexCol from "../../../generic/Flex/FlexCol";
import MyText from "../../../generic/Text/MyText";

// PAGE-SPECIFIC COMPONENT
import SelectionList from "./SelectionList";
import CreateJournalEntryButton from "./CreateJournalEntryButton";

const Reflecting = () => {
  return (
    <FlexCol>
      <MyText>Reflecting</MyText>

      <SelectionList />

      <CreateJournalEntryButton />
    </FlexCol>
  );
};

export default Reflecting;
