import { useQuery, useReactiveVar } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import { GET_JOURNAL_ENTRIES } from "../../../../graphql/gql/journalEntry";
import { getActiveJournal } from "../../../../graphql/apollo/local/state/activeJournal";
import JournalEntry from "../JournalEntry";
import { GET_THOUGHTS } from "../../../../graphql/gql/thoughts";
import { useMemo } from "react";
import { Thought } from "../../../../db/api/types";
import { arrayToObj } from "../../../../utils/obj";
import { hasMoreJEVar } from "../../../../graphql/apollo/local/state/hasMoreJE";

export default () => {
    // LOCAL STATE
    const { data: { thoughts = [] } = {} } = useQuery(GET_THOUGHTS, {
        variables: {
            journalId: getActiveJournal(),
        },
        fetchPolicy: "cache-only",
    });

    const thoughtDict = useMemo(() => {
        return arrayToObj<Thought>(thoughts, (t: Thought) => t.timeId);
    }, [thoughts]);

    const hasMoreJE = useReactiveVar(hasMoreJEVar);

    // GQL
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

    // HANDLERS
    const loadMore = () => {
        if (!hasMoreJE) return;

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
            itemContent={(index, journalEntry) => (
                <JournalEntry
                    journalEntry={journalEntry}
                    thoughtDict={thoughtDict}
                />
            )}
            components={{ Footer }}
        />
    );
};

const Footer = () => {
    const hasMoreJE = useReactiveVar(hasMoreJEVar);

    return (
        <div
            style={{
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {hasMoreJE ? "Loading..." : "Nothing more to see!"}
        </div>
    );
};
