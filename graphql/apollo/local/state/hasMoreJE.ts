import { makeVar } from "@apollo/client";

// Initializes to true
export const hasMoreJEVar = makeVar<boolean>(true);

export const setHasMoreJE = (value: boolean) => hasMoreJEVar(value);

export const getHasMoreJEVar = () => hasMoreJEVar;
export const getHasMoreJE = () => hasMoreJEVar();
