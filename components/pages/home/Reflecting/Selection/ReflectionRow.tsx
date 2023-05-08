// THIRD PARTY
import React from "react";

// MY COMPONENTS
import MyText from "../../../../generic/Text/MyText";
import MyButton from "../../../../generic/Button/Base/MyButton";
import ClickContainer from "../../../../generic/Button/Base/ClickContainer";

type ReflectionRowProps = {
    isSelected: boolean;
    text: string;
    onClick: () => void;
};
export default (props: ReflectionRowProps) => {
    const { isSelected, text, onClick } = props;

    return (
        <ClickContainer onClick={onClick}>
            <MyText
                style={{
                    width: "35vw",
                    backgroundColor: isSelected ? "#AAFF00" : "",
                }}
            >
                {text}
            </MyText>
        </ClickContainer>
    );
};
