// THIRD PARTY
import React, { useEffect } from "react";

// GENERIC COMPONENTS
import MyText from "../../../generic/Text/MyText";
import InputForm from "./InputForm";
import JournalSelection from "../../../generic/JournalSelection";
import CenteredColumn from "../../../generic/Container/CenteredColumn";

const CreateJournal = () => {
    useEffect(() => {}, []);

    return (
        <CenteredColumn>
            <MyText>Create Journal</MyText>
            <InputForm />
        </CenteredColumn>
    );
};

export default CreateJournal;
