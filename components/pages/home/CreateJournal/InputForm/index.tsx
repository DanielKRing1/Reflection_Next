// THIRD-PARTY
import React, { useState } from "react";

// GENERIC COMPONENTS
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import Input from "./Input";
import CreateJournalButton from "./CreateJournalButton";

// GQL
import createJournalMutation from "../../../../../graphql/apollo/mutationExamples/createJournal";

const InputForm = () => {
    // LOCAL STATE
    const [newJournalName, setNewJournalName] = useState("");

    // GQL
    const [createJournal, { loading, error, data }] = createJournalMutation();

    // HANDLERS
    const handleCreateJournal = () => {
        createJournal({
            variables: {
                journalName: newJournalName,
            },
        });
    };

    return (
        <FlexRow>
            <Input
                value={newJournalName}
                onChange={setNewJournalName}
                onEnter={handleCreateJournal}
            />
            <CreateJournalButton onCreateJournal={handleCreateJournal} />
        </FlexRow>
    );
};

export default InputForm;
