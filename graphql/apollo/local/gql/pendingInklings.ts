import { gql } from "@apollo/client";

export const GET_PENDING_INKLINGS = gql`
    query PendingInklings {
        pendingInklings @client
    }
`;
