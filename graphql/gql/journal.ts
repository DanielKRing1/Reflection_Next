import { gql } from "@apollo/client";

// QUERIES

export const getJournals = gql`
    query Journals {
        journals {
            id
            userId
            name
        }
    }
`;

// MUTATIONS

export const createJournal = gql`
    mutation CreateJournal($journalName: String!) {
        createJournal(journalName: $journalName) {
            id
            userId
            name
        }
    }
`;
