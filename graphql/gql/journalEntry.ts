import { gql } from "@apollo/client";

// QUERIES

export const GET_JOURNAL_ENTRIES = gql`
    query JournalEntries(
        $journalId: BigInt!
        $cursorTime: DateTime
        $count: Int
    ) @connection(key: "journalEntries", filter: ["journalId"]) {
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
                thought @client
            }
        }
    }
`;

// MUTATIONS

export const CREATE_JOURNAL_ENTRY = gql`
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
