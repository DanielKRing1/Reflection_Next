import { gql } from "@apollo/client";

// QUERIES

export const getInklings = gql`
    query Inklings($journalId: BigInt!) {
        inklings(journalId: $journalId) {
            timeId
            journalId
            text
        }
    }
`;

// MUTATIONS

export const commitInklings = gql`
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
