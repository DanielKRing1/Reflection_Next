import { gql } from "@apollo/client";

// QUERIES

export const GET_JOURNALS = gql`
    query Journals {
        journals {
            id
            userId
            name
        }
    }
`;

// MUTATIONS

export const CREATE_JOURNAL = gql`
    mutation CreateJournal($journalName: String!) {
        createJournal(journalName: $journalName) {
            id
            userId
            name
        }
    }
`;
