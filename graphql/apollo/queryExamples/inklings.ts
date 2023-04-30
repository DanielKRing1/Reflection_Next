import { useQuery } from "@apollo/client";

import { GET_INKLINGS } from "../../gql/inklings";

// { loading, error, data, refetch }
export default (journalId: string) => {
    const handle = useQuery(GET_INKLINGS, {
        variables: {
            journalId,
        },
    });

    return handle;
};

// export const clearInklingsLocal = () => {
//     client.writeQuery({
//         query: GET_INKLINGS,
//         data: [],
//         variables: {
//             journalId: getActiveJournal(),
//         },
//     });
// };
