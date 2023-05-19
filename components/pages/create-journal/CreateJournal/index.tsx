// THIRD PARTY
import React, { useEffect } from "react";

// GENERIC COMPONENTS
import CenteredColumn from "../../../generic/Container/CenteredColumn";
import MyText from "../../../generic/Text/MyText";
import InputForm from "./InputForm";

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
