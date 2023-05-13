import { getHasMoreJE } from "../state/hasMoreJE";
import { SchemaFragment } from "./types";

const typeDefs = `isLoggedIn: Boolean!`;

export const hasMoreJEFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        hasMoreJE: {
            read() {
                return getHasMoreJE();
            },
        },
    },
};
