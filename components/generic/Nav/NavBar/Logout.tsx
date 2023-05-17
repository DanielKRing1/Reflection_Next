import React from "react";
import styled from "styled-components";

import { MyTextNoMargin } from "../../Text/MyText";
import ClickContainer from "../../Button/Base/ClickContainer";
import { logoutLocal } from "../../../../graphql/apollo/local/state/isLoggedIn";

type Props = {};

export default (props: Props) => {
    // HANDLERS
    const handleLogout = () => {
        logoutLocal();
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
