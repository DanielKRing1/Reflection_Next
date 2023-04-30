import { useQuery } from "@apollo/client";

import { GET_JOURNAL_ENTRIES } from "../../gql/journalEntry";

// { loading, error, data, fetchMore }
export default (journalId: BigInt, cursorTime: Date, count: number) => {
    const handle = useQuery(GET_JOURNAL_ENTRIES, {
        variables: {
            journalId,
            cursorTime,
            count,
        },
    });

    return handle;
};

export const createJournalEntryLocal = {};
