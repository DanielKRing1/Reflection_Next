import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_PENDING_THOUGHT_REFLECTIONS } from "../../../../../graphql/apollo/local/gql/pendingReflections";
import { editThoughtReflection } from "../../../../../graphql/apollo/local/state/pendingReflections";
import ReflectionRow from "./ReflectionRow";
import { GET_JOURNAL_ENTRIES } from "../../../../../graphql/gql/journalEntry";
import { activeJournalVar } from "../../../../../graphql/apollo/local/state/activeJournal";

type ThoughtsListProps = {};
export default (props: ThoughtsListProps) => {
    const activeJournal = useReactiveVar(activeJournalVar);

    console.log("ThoughtList refetch journal entries");

    // const now = useMemo(() => new Date(), []);

    const { data: { journalEntries = [] } = {} } = useQuery(
        GET_JOURNAL_ENTRIES,
        {
            variables: {
                journalId: activeJournal,
                // cursorTime: now,
                // count: 1,
            },
        }
    );
    const { data: { thoughtReflections = {} } = {} } = useQuery(
        GET_PENDING_THOUGHT_REFLECTIONS
    );

    return (
        <>
            <p>Thoughts</p>

            {journalEntries.length === 1 &&
                journalEntries[0].reflections
                    .filter(
                        ({ thoughtId, decision, thought }, i: number) =>
                            decision === 1 || decision === 2
                    )
                    .map(({ thoughtId, decision, thought }, i: number) => {
                        const keep =
                            thoughtReflections[thoughtId] !== undefined
                                ? thoughtReflections[thoughtId].keep
                                : false;

                        return (
                            <ReflectionRow
                                key={thoughtId}
                                text={thought.text}
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
