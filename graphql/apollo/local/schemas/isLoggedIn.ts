import { isLoggedInVar } from "../state/isLoggedIn";
import { SchemaFragment } from "./types";

const typeDefs = `isLoggedIn: Boolean!`;

export const isLoggedInFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        isLoggedIn: {
            read() {
                return isLoggedInVar();
            },
        },
    },
};
