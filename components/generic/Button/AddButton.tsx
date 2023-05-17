// THIRD PARTY
import React from "react";
import { FaPlus } from "react-icons/fa";

// MY COMPONENTS
import CircleButton from "./Base/CircleButton";

type AddButtonProps = {
    onClick: () => void;
};
const AddButton = (props: AddButtonProps) => {
    const { onClick } = props;

    return (
        <>
            <CircleButton onClick={onClick}>
                <FaPlus />
            </CircleButton>
        </>
    );
};

export default AddButton;
