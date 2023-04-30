import { useQuery } from "@apollo/client";

import { getJournalEntries } from "../../gql/journalEntry";

// { loading, error, data, fetchMore }
export default (journalId: BigInt, cursorTime: Date, count: number) => {
    const handle = useQuery(getJournalEntries, {
        variables: {
            journalId,
            cursorTime,
            count,
        },
    });

    return handle;
};

export const createJournalEntryLocal = {};
