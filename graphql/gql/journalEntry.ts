import { gql } from "@apollo/client";

// QUERIES

export const getJournalEntries = gql`
    query JournalEntries(
        $journalId: BigInt!
        $cursorTime: DateTime
        $count: Int
    ) {
        journalEntries(
            journalId: $journalId
            cursorTime: $cursorTime
            count: $count
        ) {
            timeId
            journalId
            reflections {
                thoughtId
                decision
            }
        }
    }
`;

// MUTATIONS

export const createJournalEntry = gql`
    mutation CreateJournalEntry(
        $createJournalEntryJournalId: BigInt!
        $keepIdsInkling: [DateTime]!
        $keepIdsThought: [DateTime]!
        $discardIdsThought: [DateTime]!
        $discardIdsInkling: [DateTime]!
    ) {
        createJournalEntry(
            journalId: $createJournalEntryJournalId
            keepIdsInkling: $keepIdsInkling
            keepIdsThought: $keepIdsThought
            discardIdsThought: $discardIdsThought
            discardIdsInkling: $discardIdsInkling
        ) {
            timeId
            journalId
            reflections {
                thoughtId
                decision
            }
        }
    }
`;
