// THIRD-PARTY
import React, { useState } from "react";

// GENERIC COMPONENTS
import FlexCol from "../../../../generic/Flex/FlexCol";

// PAGE-SPECIFIC COMPONENTS
import Input from "./Input";
import CreateJournalButton from "./CreateJournalButton";

// GQL
import createJournalMutation from "../../../../../graphql/apollo/mutationExamples/createJournal";
import useProtectedRouter from "../../../../../hooks/useProtectedRouter";
import { goBackOrHome } from "../../../../../utils/routing";
import { setActiveJournal } from "../../../../../graphql/apollo/local/state/activeJournal";
import { GET_JOURNALS } from "../../../../../graphql/gql/journal";
import styled from "styled-components";

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
        <StyledFlexCol>
            <Input
                value={newJournalName}
                onChange={setNewJournalName}
                onEnter={handleCreateJournal}
            />
            <CreateJournalButton onCreateJournal={handleCreateJournal} />
        </StyledFlexCol>
    );
};

export default InputForm;

const StyledFlexCol = styled(FlexCol)`
    max-width: 100%;
`;
