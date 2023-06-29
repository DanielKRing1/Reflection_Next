import React from "react";
import styled from "styled-components";

import { MyTextNoMargin } from "../../Text/MyText";
import ClickContainer from "../../Button/Base/ClickContainer";
import { logout } from "../../../../session/logout";

type Props = {};

export default (props: Props) => {
    // HANDLERS
    const handleLogout = () => {
        logout();
    };

    return (
        <PositioningContainer>
            <ClickContainer onClick={handleLogout}>
                <MyTextNoMargin>Logout</MyTextNoMargin>
            </ClickContainer>
        </PositioningContainer>
    );
};

const PositioningContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;
