import { useQuery } from "@apollo/client";

import { GET_THOUGHTS } from "../../gql/thoughts";

// { loading, error, data, fetchMore }
export default (journalId: BigInt, thoughtIds: string[]) => {
    const handle = useQuery(GET_THOUGHTS, {
        variables: {
            journalId,
            thoughtIds,
        },
    });

    return handle;
};
