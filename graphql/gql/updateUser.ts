import { gql } from "@apollo/client";

// QUERIES

export const UPDATE_LAST_USEDJID = gql`
    mutation UpdateLastUsedJId($journalId: BigInt!) {
        updateLastUsedJournalId(journalId: $journalId) {}
    }
`;

// MUTATIONS

// Users are created via Express endpoints, not GraphQL
