import { gql } from "@apollo/client";

export const isLoggedIn = gql`
    query IsLoggedIn {
        isLoggedIn @client
    }
`;
