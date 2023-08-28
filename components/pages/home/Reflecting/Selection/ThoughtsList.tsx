import { useEffect, useMemo } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";

import client from "../../../../../graphql/apollo/client/client";
import {
    editThoughtReflection,
    thoughtReflectionsVar,
} from "../../../../../graphql/apollo/local/state/pendingReflections";
import ReflectionRow from "./ReflectionRow";
import { GET_JOURNAL_ENTRIES } from "../../../../../graphql/gql/journalEntry";
import { activeJournalVar } from "../../../../../graphql/apollo/local/state/activeJournal";
import { GET_THOUGHTS } from "../../../../../graphql/gql/thoughts";
import { Thought } from "../../../../../types/db";
import { arrayToObj } from "../../../../../utils/obj";

type ThoughtsListProps = {};
export default (props: ThoughtsListProps) => {
    const activeJournal = useReactiveVar(activeJournalVar);

    console.log("ThoughtList refetch journal entries");

    // const now = useMemo(() => new Date(), []);

    // QUERIES

    const { data: { journalEntries = [] } = {} } = useQuery(
        GET_JOURNAL_ENTRIES,
        {
            variables: {
                journalId: activeJournal,
                // cursorTime: now,
                // count: 1,
            },
            fetchPolicy: "cache-only",
        }
    );
    const { data: { thoughts = [] } = {} } = useQuery(GET_THOUGHTS, {
        variables: {
            journalId: activeJournal,
            thoughtIds: [],
        },
        fetchPolicy: "cache-only",
    });
    const thoughtDict = useMemo(() => {
        return arrayToObj<Thought>(thoughts, (t: Thought) => t.timeId);
    }, [thoughts]);

    // LOCAL REACTIVE VARS

    const thoughtReflections = useReactiveVar(thoughtReflectionsVar);

    useEffect(() => {
        console.log("journalEntries CHANGED");
        console.log(journalEntries);
        console.log(activeJournal);
    }, [journalEntries]);

    return (
        <>
            <p>Past Thoughts</p>

            {journalEntries.length > 0 &&
                journalEntries[0].reflections
                    .filter(
                        ({ thoughtId, decision, thought }, i: number) =>
                            decision === 1 || decision === 2
                    )
                    .map(({ thoughtId, decision, thought }, i: number) => {
                        thought = thoughtDict[thoughtId];

                        console.log(thoughtDict);

                        console.log(thought);

                        const keep =
                            thoughtReflections[thoughtId] !== undefined
                                ? thoughtReflections[thoughtId].keep
                                : false;

                        return (
                            <ReflectionRow
                                key={thoughtId}
                                text={
                                    thought
                                        ? thought.text
                                        : "fetch thought from server"
                                }
                                isSelected={keep}
                                onClick={() =>
                                    editThoughtReflection(thoughtId, !keep)
                                }
                            />
                        );
                    })}
        </>
    );
};
