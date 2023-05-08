import { gql } from "@apollo/client";

export const GET_PENDING_INKLING_REFLECTIONS = gql`
    query PendingInklingReflections {
        inklingReflections @client
    }
`;

export const GET_PENDING_THOUGHT_REFLECTIONS = gql`
    query PendingThoughtReflections {
        thoughtReflections @client
    }
`;
