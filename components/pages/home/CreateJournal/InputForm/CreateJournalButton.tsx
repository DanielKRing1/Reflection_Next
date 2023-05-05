// THIRD PARTY
import React from "react";
import { useDispatch } from "react-redux";

// MY COMPONENTS
import MyButton from "../../../../generic/Button/Base/MyButton";

type CreateJournalButtonProps = {
    onCreateJournal: () => void;
};
const CreateJournalButton = (props: CreateJournalButtonProps) => {
    //  PROPS
    const { onCreateJournal } = props;

    return (
        <>
            <MyButton onClick={onCreateJournal}>Create New Journal</MyButton>
        </>
    );
};

export default CreateJournalButton;
