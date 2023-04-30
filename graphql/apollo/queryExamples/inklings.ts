import { useQuery } from "@apollo/client";

import { getInklings } from "../../gql/inklings";

// { loading, error, data, refetch }
export default (journalId: string) => {
    const handle = useQuery(getInklings, {
        variables: {
            journalId,
        },
    });

    return handle;
};

// export const clearInklingsLocal = () => {
//     client.writeQuery({
//         query: getInklings,
//         data: [],
//         variables: {
//             journalId: getActiveJournal(),
//         },
//     });
// };
