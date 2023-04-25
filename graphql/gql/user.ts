import { gql } from "@apollo/client";

// QUERIES

export const getUser = gql`
    query User {
        user {
            email
            lastUsedJId
        }
    }
`;

// MUTATIONS

// Users are created via Express endpoints, not GraphQL
