// THIRD PARTY
import React from "react";

// GENERIC COMPONENTS
import MyText from "../../../generic/Text/MyText";

// PAGE-SPECIFIC COMPONENTS
import InputForm from "./InputForm";

const Inkling = () => {
    return (
        <>
            <MyText>What's been on your Mind?</MyText>

            <InputForm />
        </>
    );
};

export default Inkling;
