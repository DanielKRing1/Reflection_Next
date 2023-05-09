/**
 * Only use this hook once at the top-level of the app
 */

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_JOURNAL_ENTRIES } from "../graphql/gql/journalEntry";
import client from "../graphql/apollo/client/client";
import { THOUGHT_TYPENAME } from "../graphql/apollo/server/typenames";
import { GET_THOUGHTS } from "../graphql/gql/thoughts";
import { getActiveJournal } from "../graphql/apollo/local/state/activeJournal";

export default () => {
    // LOCAL STATE

    const {
        loading,
        error,
        data: { journalEntries = [] } = {},
    } = useQuery(GET_JOURNAL_ENTRIES, {
        fetchPolicy: "cache-only",
    });

    // Get Thoughts
    const [
        getThoughtsLazy,
        {
            loading: thoughts,
            error: error_thoughts,
            data: data_thoughts,
            refetch: refetch_thoughts,
            called: called_thoughts,
        },
    ] = useLazyQuery(GET_THOUGHTS);
    const getThoughts = (thoughtIds: string[]) => {
        const vars = {
            variables: {
                journalId: getActiveJournal(),
                thoughtIds,
            },
        };

        if (!called_thoughts) getThoughtsLazy(vars);
        else refetch_thoughts(vars);
    };

    // SERVER STATE

    // Fetch server state
    useEffect(() => {
        // Return if waiting on fresh journal entries or empty
        if (loading || error || journalEntries.length === 0) return;

        const neededThoughtIds: string[] = [];
        // Get all Thoughts missing from each Journal Entry
        for (const je of journalEntries) {
            for (const r of je.reflections) {
                if (
                    client.readFragment({
                        id: client.cache.identify({
                            __typename: THOUGHT_TYPENAME,
                            timeId: r.thoughId,
                        }),
                        fragment: gql`
                            fragment MyThought on Thought {
                                timeId
                                journalId
                                text
                            }
                        `,
                    }) === null
                )
                    neededThoughtIds.push(r.thoughtId);
            }
        }

        // Only fetch Thoughts from server if > 0 Thoughts needed
        if (neededThoughtIds.length === 0) return;

        getThoughts(neededThoughtIds);
    }, [loading, error, journalEntries]);
};
