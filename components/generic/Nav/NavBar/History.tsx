import React from "react";

import useProtectedRouter from "../../../../hooks/useProtectedRouter";
import { HISTORY_PATH } from "../../../../routing/paths";

import ClickContainer from "../../Button/Base/ClickContainer";
import { MyTextNoMargin } from "../../Text/MyText";

type Props = {};

export default (props: Props) => {
    // ROUTER
    const router = useProtectedRouter();

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
