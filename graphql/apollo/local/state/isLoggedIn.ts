import { makeVar } from "@apollo/client";

import { NeededSessionAction } from "../../../../utils_ui/session";
import { getNeededSessionAction } from "../../../../utils_ui/session";

// Initializes to true if has fresh access and refresh cookies
export const isLoggedInVar = makeVar<boolean>(
    getNeededSessionAction() === NeededSessionAction.None
);

export const login = () => isLoggedInVar(true);
export const logout = () => isLoggedInVar(false);
