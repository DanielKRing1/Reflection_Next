import { gql } from "@apollo/client";

import { isLoggedInFragment } from "./isLoggedIn";
import { pendingInklingsFragment } from "./pendingInklings";
import { pendingReflectionsFragment } from "./pendingReflections";

const typeDefs = gql`
    extend type Query {
        ${isLoggedInFragment.typeDefs}
        ${pendingInklingsFragment.typeDefs}
        ${pendingReflectionsFragment.typeDefs}
    }
`;

export default {
    typeDefs,
    fieldPolicies: {
        ...isLoggedInFragment.fieldPolicies,
        ...pendingInklingsFragment.fieldPolicies,
        ...pendingReflectionsFragment.fieldPolicies,
    },
};
