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
import { Thought } from "../../../../../db/api/types";
import { Dict } from "../../../../../types/data";

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
    const { data: { thoughts = {} } = {} } = useQuery(GET_THOUGHTS, {
        variables: {
            journalId: activeJournal,
            thoughtIds: [],
        },
        fetchPolicy: "cache-only",
    });
    const thoughtDict = useMemo(() => {
        if (thoughts.length === 0) return {};

        return thoughts.reduce((acc: Dict<Thought>, cur: Thought) => {
            acc[cur.timeId] = cur;

            return acc;
        }, {});
    }, [thoughts]);

    // LOCAL REACTIVE VARS

    const thoughtReflections = useReactiveVar(thoughtReflectionsVar);

    // const [a, setA] = useState(1);
    useEffect(() => {
        // const handle = setInterval(() => setA(Math.random()), 1000);
        const handle = setInterval(() => {
            console.log(activeJournal);

            console.log(
                client.readQuery({
                    query: GET_THOUGHTS,
                    variables: { journalId: activeJournal, thoughtIds: [] },
                })
            );
        }, 10000);

        return () => clearInterval(handle);
    }, []);

    return (
        <>
            {/* {a} */}
            <p>Thoughts</p>

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
