import { gql } from "@apollo/client";

export const GET_JOURNAL_PHASE = gql`
    query JournalPhase {
        journalPhase @client
    }
`;
