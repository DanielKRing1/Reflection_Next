import { useQuery } from "@apollo/client";

import { getInklings } from "../../gql/inklings";

// { loading, error, data, refetch }
export default (journalId: BigInt) => {
    const handle = useQuery(getInklings, {
        variables: {
            journalId,
        },
    });

    return handle;
};
