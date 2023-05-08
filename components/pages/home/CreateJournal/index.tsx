// THIRD PARTY
import React from "react";

// GENERIC COMPONENTS
import MyText from "../../../generic/Text/MyText";
import InputForm from "./InputForm";
import JournalSelection from "../../../generic/JournalSelection";

const CreateJournal = () => {
    return (
        <>
            <MyText>Create Journal</MyText>
            <InputForm />

            <MyText>Select Journal</MyText>
            <JournalSelection />
        </>
    );
};

export default CreateJournal;
