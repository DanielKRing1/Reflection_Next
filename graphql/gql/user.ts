import { gql } from "@apollo/client";

// QUERIES

export const GET_USER = gql`
    query User {
        user {
            email
            lastUsedJId
        }
    }
`;

// MUTATIONS

// Users are created via Express endpoints, not GraphQL
