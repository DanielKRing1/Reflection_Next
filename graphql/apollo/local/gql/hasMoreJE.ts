import { gql } from "@apollo/client";

export const GET_HAS_MORE_JE = gql`
    query HasMoreJE {
        hasMoreJE @client
    }
`;
