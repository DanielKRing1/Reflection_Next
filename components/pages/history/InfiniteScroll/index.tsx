import { useQuery, useReactiveVar } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import { GET_JOURNAL_ENTRIES } from "../../../../graphql/gql/journalEntry";
import { getActiveJournal } from "../../../../graphql/apollo/local/state/activeJournal";
import JournalEntry from "../JournalEntry";
import { GET_THOUGHTS } from "../../../../graphql/gql/thoughts";
import { useCallback, useMemo } from "react";
import { Thought } from "../../../../types/db";
import { arrayToObj } from "../../../../utils/obj";
import { hasMoreJEVar } from "../../../../graphql/apollo/local/state/hasMoreJE";
import styled from "styled-components";

export default () => {
    // LOCAL STATE
    const {
        loading: loading_thoughts,
        error: error_thoughts,
        data: { thoughts = [] } = {},
    } = useQuery(GET_THOUGHTS, {
        variables: {
            journalId: getActiveJournal(),
            thoughtIds: [],
        },
        fetchPolicy: "cache-only",
    });

    const thoughtDict = useMemo(() => {
        return arrayToObj<Thought>(thoughts, (t: Thought) => t.timeId);
    }, [thoughts, loading_thoughts]);

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
            count: 5,
        },
    });

    // HANDLERS
    const loadMore = useCallback(() => {
        console.log("loadMore");
        console.log(hasMoreJE);
        if (!hasMoreJE) return;

        const cursorTime =
            journalEntries.length === 0
                ? new Date()
                : journalEntries[journalEntries.length - 1].timeId;

        console.log(new Date(cursorTime));

        fetchMore({
            variables: {
                journalId: getActiveJournal(),
                cursorTime,
                count: 5,
            },
        });
    }, [hasMoreJE, journalEntries]);

    console.log(thoughts);
    console.log(thoughtDict);

    return (
        <FramingDiv>
            <CenteredDiv>
                <Virtuoso
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    data={journalEntries}
                    endReached={loadMore}
                    // overscan={500}
                    useWindowScroll={true}
                    itemContent={(index, journalEntry) => (
                        <JournalEntry
                            journalEntry={journalEntry}
                            thoughtDict={thoughtDict}
                        />
                    )}
                    components={{ Footer }}
                />
            </CenteredDiv>
        </FramingDiv>
    );
};

const FramingDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
    }
`;

const CenteredDiv = styled.div`
    display: flex;
    width: 60%;
`;

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
