import React from "react";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";

import ClickContainer from "../../Button/Base/ClickContainer";
import styled from "styled-components";
import { MyTextNoMargin } from "../../Text/MyText";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useRouter();

    // HANDLERS
    const handleRouteHome = () => {
        router.push("/");
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
