import { makeVar } from "@apollo/client";

// Initializes to false
export const isLoggedInVar = makeVar<boolean>(false);

export const login = () => isLoggedInVar(true);
export const logout = () => isLoggedInVar(false);
