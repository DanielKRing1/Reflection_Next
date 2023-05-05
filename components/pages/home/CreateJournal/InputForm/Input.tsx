// THIRD PARTY
import React from "react";

// MY COMPONENTS
import MyTextInput from "../../../../generic/Input/MyTextInput";

type InputProps = {
    value: string;
    onChange: (newName: string) => void;
    onEnter: () => void;
};
const Input = (props: InputProps) => {
    // PROPS
    const { value, onChange, onEnter } = props;

    return (
        <MyTextInput
            placeholder="Journal Name..."
            value={value}
            onChange={onChange}
            onEnter={onEnter}
        />
    );
};

export default Input;
