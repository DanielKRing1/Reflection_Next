import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import { GET_JOURNAL_ENTRIES } from "../../../../graphql/gql/journalEntry";
import { getActiveJournal } from "../../../../graphql/apollo/local/state/activeJournal";
import JournalEntry from "../JournalEntry";

export default () => {
    const {
        loading,
        error,
        data: { journalEntries = [] } = {},
        fetchMore,
    } = useQuery(GET_JOURNAL_ENTRIES, {
        variables: {
            journalId: getActiveJournal(),
        },
    });

    const loadMore = () => {
        const cursorTime =
            journalEntries.length === 0
                ? new Date()
                : journalEntries[journalEntries.length - 1].timeId;

        fetchMore({
            variables: {
                journalId: getActiveJournal(),
                cursorTime,
                count: 5,
            },
        });
    };

    return (
        <Virtuoso
            style={{ height: "100vh" }}
            data={journalEntries}
            endReached={loadMore}
            overscan={500}
            useWindowScroll={true}
            itemContent={(index, journalEntry) => {
                return <JournalEntry journalEntry={journalEntry} />;
            }}
            components={{ Footer }}
        />
    );
};

const Footer = () => {
    return (
        <div
            style={{
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
            }}
        >
            Loading...
        </div>
    );
};
