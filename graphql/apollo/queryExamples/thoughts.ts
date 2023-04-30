import { useQuery } from "@apollo/client";

import { getThoughts } from "../../gql/thoughts";

// { loading, error, data, fetchMore }
export default (journalId: BigInt, thoughtIds: string[]) => {
    const handle = useQuery(getThoughts, {
        variables: {
            journalId,
            thoughtIds,
        },
    });

    return handle;
};
