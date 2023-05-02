import { gql } from "@apollo/client";

export const GET_ACTIVE_JOURNAL = gql`
    query ActiveJournal {
        activeJournal @client
    }
`;
