import { inklingReflectionsVar } from "../state/pendingReflections";
import { SchemaFragment } from "./types";

export const typeDefs = `
inklingReflections: [Reflection]!
thoughtReflections: [Reflection]!
`;

export const pendingReflectionsFragment: SchemaFragment = {
    typeDefs,
    fieldPolicies: {
        inklingReflections: {
            read() {
                return inklingReflectionsVar();
            },
        },
        thoughtReflections: {
            read() {
                return inklingReflectionsVar();
            },
        },
    },
};
