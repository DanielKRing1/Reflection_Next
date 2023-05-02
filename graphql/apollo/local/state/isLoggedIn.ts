import { makeVar } from "@apollo/client";

import { NeededSessionAction } from "../../../../utils_ui/session";
import { getNeededSessionAction } from "../../../../utils_ui/session";

// Initializes to true if has fresh access and refresh cookies
const isLoggedInVar = makeVar<boolean>(
    getNeededSessionAction() === NeededSessionAction.None
);

export const getIsLoggedIn = () => isLoggedInVar();
export const loginLocal = () => isLoggedInVar(true);
export const logoutLocal = () => isLoggedInVar(false);
