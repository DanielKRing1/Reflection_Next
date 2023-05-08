// THIRD PARTY
import React from "react";

// GENERIC COMPONENTS
import FlexCol from "../../../generic/Flex/FlexCol";
import MyText from "../../../generic/Text/MyText";

// PAGE-SPECIFIC COMPONENT
import CreateJournalEntryButton from "./CreateJournalEntryButton";
import InklingsList from "./Selection/InklingsList";
import ThoughtsList from "./Selection/ThoughtsList";

const Reflecting = () => {
    return (
        <FlexCol>
            <MyText>Reflecting</MyText>

            <InklingsList />
            <ThoughtsList />

            <CreateJournalEntryButton />
        </FlexCol>
    );
};

export default Reflecting;
