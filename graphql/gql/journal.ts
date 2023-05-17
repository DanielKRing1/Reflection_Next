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

export const EDIT_JOURNAL = gql`
    mutation EditJournal($journalId: BigInt!, $journalEdits: JournalEdits) {
        editJournal(journalId: $journalId, journalEdits: $journalEdits) {
            id
            userId
            name
        }
    }
`;

export const RM_JOURNAL = gql`
    mutation RmJournal($journalId: BigInt!) {
        rmJournal(journalId: $journalId)
    }
`;
