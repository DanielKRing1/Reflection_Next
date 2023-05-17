// THIRD PARTY
import React from "react";
import { FaArrowRight } from "react-icons/fa";

// MY COMPONENTS
import CircleButton from "./Base/CircleButton";
import NoWrap from "../Container/NoWrap";

type CommitSubmitButtonProps = {
    onClick: () => void;
};
const CommitButton = ({ onClick }: CommitSubmitButtonProps) => {
    return (
        <>
            <CircleButton onClick={onClick}>
                <FaArrowRight />
            </CircleButton>
        </>
    );
};

export default CommitButton;
