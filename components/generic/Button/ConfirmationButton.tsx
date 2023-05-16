import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import ClickContainer from "./Base/ClickContainer";

type Props = {
    onConfirmed: () => void;
    InitialComponent: React.ReactNode;
    ConfirmComponent?: React.ReactNode;
};

export default (props: Props) => {
    // PROPS
    const {
        onConfirmed,
        InitialComponent,
        ConfirmComponent = <FaCheck />,
    } = props;

    // LOCAL STATE
    const [triggered, setTriggered] = useState(false);
    const buttonRef = useRef();

    // HANDLERS
    const handleClick = () => {
        if (triggered) onConfirmed();
        setTriggered(!triggered);
    };

    return (
        <ClickContainer ref={buttonRef} onClick={handleClick}>
            {!triggered ? InitialComponent : ConfirmComponent}
        </ClickContainer>
    );
};
