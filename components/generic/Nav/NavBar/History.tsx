import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import ClickContainer from "../../Button/Base/ClickContainer";
import { MyTextNoMargin } from "../../Text/MyText";
import { HISTORY_PATH } from "../../../../routing/paths";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useRouter();

    // HANDLERS
    const handleRouteToHistory = () => {
        router.push(HISTORY_PATH);
    };

    return (
        <ClickContainer onClick={handleRouteToHistory}>
            <MyTextNoMargin>History</MyTextNoMargin>
        </ClickContainer>
    );
};
