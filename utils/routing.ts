import { NextRouter } from "next/router";
import { HOME_PATH } from "../routing/paths";

export const goBackOrHome = (router: NextRouter) => {
    if (
        window.history.length > 1 &&
        document.referrer.indexOf(window.location.host) !== -1
    ) {
        router.back();
    } else {
        router.replace(HOME_PATH);
    }
};
