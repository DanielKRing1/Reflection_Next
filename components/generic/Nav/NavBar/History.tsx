import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import ClickContainer from "../../Button/Base/ClickContainer";
import { MyTextNoMargin } from "../../Text/MyText";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useRouter();

    // HANDLERS
    const handleRouteToHistory = () => {
        router.push("/history");
    };

    return (
        <ClickContainer onClick={handleRouteToHistory}>
            <MyTextNoMargin>History</MyTextNoMargin>
        </ClickContainer>
    );
};
