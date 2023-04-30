import { gql } from "@apollo/client";

// QUERIES

export const GET_THOUGHTS = gql`
    query Thoughts($journalId: ID!, $thoughtIds: [DateTime]!) {
        thoughts(journalId: $journalId, thoughtIds: $thoughtIds) {
            timeId
            journalId
            text
        }
    }
`;

// MUTATIONS

// Thoughts are created from committed Inklings when a JournalEntry is created (call createJournalEntry)
