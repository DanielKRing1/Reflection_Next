import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

import useProtectedRouter from "../../../../hooks/useProtectedRouter";
import { HOME_PATH } from "../../../../routing/paths";

import ClickContainer from "../../Button/Base/ClickContainer";
import { MyTextNoMargin } from "../../Text/MyText";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useProtectedRouter();

    // HANDLERS
    const handleRouteHome = () => {
        router.push(HOME_PATH);
    };

    return (
        <PositioningContainer>
            <ClickContainer onClick={handleRouteHome}>
                <MyTextNoMargin>
                    <FaHome />
                </MyTextNoMargin>
            </ClickContainer>
        </PositioningContainer>
    );
};

const PositioningContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
