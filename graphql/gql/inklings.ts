import { gql } from "@apollo/client";

// QUERIES

export const GET_INKLINGS = gql`
    query Inklings($journalId: BigInt!) {
        inklings(journalId: $journalId) {
            timeId
            journalId
            text
        }
    }
`;

// MUTATIONS

export const COMMIT_INKLINGS = gql`
    mutation CommitInklings(
        $commitInklingsJournalId: BigInt!
        $inklingTexts: [String]!
    ) {
        commitInklings(
            journalId: $commitInklingsJournalId
            inklingTexts: $inklingTexts
        ) {
            timeId
            journalId
            text
        }
    }
`;
