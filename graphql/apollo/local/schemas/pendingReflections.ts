import {
    getInklingReflections,
    getThoughtReflections,
} from "../state/pendingReflections";
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
                return getInklingReflections();
            },
        },
        thoughtReflections: {
            read() {
                return getThoughtReflections();
            },
        },
    },
};
