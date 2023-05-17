import { NextRouter } from "next/router";

export const goBackOrHome = (router: NextRouter) => {
    if (
        window.history.length > 1 &&
        document.referrer.indexOf(window.location.host) !== -1
    ) {
        router.back();
    } else {
        router.replace("/");
    }
};
