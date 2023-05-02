import { gql } from "@apollo/client";

import { isLoggedInFragment } from "./isLoggedIn";

import { activeJournalFragment } from "./activeJournal";
import { journalPhaseFragment } from "./journalPhase";

import { pendingInklingsFragment } from "./pendingInklings";
import { pendingReflectionsFragment } from "./pendingReflections";

const typeDefs = gql`
    extend type Query {
        ${isLoggedInFragment.typeDefs}
        ${activeJournalFragment.typeDefs}
        ${journalPhaseFragment.typeDefs}
        ${pendingInklingsFragment.typeDefs}
        ${pendingReflectionsFragment.typeDefs}
    }
`;

export default {
    typeDefs,
    fieldPolicies: {
        ...isLoggedInFragment.fieldPolicies,
        ...activeJournalFragment.fieldPolicies,
        ...journalPhaseFragment.fieldPolicies,
        ...pendingInklingsFragment.fieldPolicies,
        ...pendingReflectionsFragment.fieldPolicies,
    },
};
