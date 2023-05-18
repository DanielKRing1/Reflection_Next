// THIRD-PARTY
import React, { useState } from "react";

// GENERIC COMPONENTS
import FlexRow from "../../../../generic/Flex/FlexRow";

// PAGE-SPECIFIC COMPONENTS
import Input from "./Input";
import CreateJournalButton from "./CreateJournalButton";

// GQL
import createJournalMutation from "../../../../../graphql/apollo/mutationExamples/createJournal";
import useProtectedRouter from "../../../../../hooks/useProtectedRouter";
import { goBackOrHome } from "../../../../../utils/routing";
import { setActiveJournal } from "../../../../../graphql/apollo/local/state/activeJournal";
import { GET_JOURNALS } from "../../../../../graphql/gql/journal";

const InputForm = () => {
    // ROUTER
    const router = useProtectedRouter();

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
            update(cache, { data: { createJournal } }) {
                const { journals: existingJournals } = cache.readQuery({
                    query: GET_JOURNALS,
                });

                console.log(existingJournals);

                console.log("here1");
                cache.writeQuery({
                    query: GET_JOURNALS,
                    data: {
                        journals: [...existingJournals, createJournal],
                    },
                });
                console.log("here2");

                goBackOrHome(router);
                setActiveJournal(createJournal.id);
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
