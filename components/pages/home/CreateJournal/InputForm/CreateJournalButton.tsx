// THIRD PARTY
import React from "react";
import { FaArrowRight } from "react-icons/fa";

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
            <MyButton onClick={onCreateJournal}>
                <FaArrowRight />
            </MyButton>
        </>
    );
};

export default CreateJournalButton;
