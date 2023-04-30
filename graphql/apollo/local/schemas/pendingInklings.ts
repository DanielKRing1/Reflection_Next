import { getPendingInklings } from "../state/pendingInklings";

import { SchemaFragment } from "./types";

export const typeDefs = `pendingInklings: [Inkling]!`;

export const pendingInklingsFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        pendingInklings: {
            read() {
                return getPendingInklings();
            },
        },
    },
};
