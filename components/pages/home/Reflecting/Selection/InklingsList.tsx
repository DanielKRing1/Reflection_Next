import { useQuery } from "@apollo/client";

import { GET_PENDING_INKLING_REFLECTIONS } from "../../../../../graphql/apollo/local/gql/pendingReflections";
import ReflectionRow from "./ReflectionRow";
import { editInklingReflection } from "../../../../../graphql/apollo/local/state/pendingReflections";
import { GET_INKLINGS } from "../../../../../graphql/gql/inklings";
import { GET_ACTIVE_JOURNAL } from "../../../../../graphql/apollo/local/gql/activeJournal";

type InklingsListProps = {};
export default (props: InklingsListProps) => {
    const { data: { activeJournal = null } = {} } =
        useQuery(GET_ACTIVE_JOURNAL);

    const { data: { inklings = [] } = {} } = useQuery(GET_INKLINGS, {
        variables: {
            journalId: activeJournal,
        },
    });
    // TODO: Try using reactive variable instead
    const { data: { inklingReflections = {} } = {} } = useQuery(
        GET_PENDING_INKLING_REFLECTIONS
    );

    return (
        <>
            <p>New Thoughts</p>
            {inklings.map(({ timeId, text }, i: number) => {
                const keep =
                    inklingReflections[timeId] !== undefined
                        ? inklingReflections[timeId].keep
                        : false;

                return (
                    <ReflectionRow
                        key={timeId}
                        text={text}
                        isSelected={keep}
                        onClick={() => editInklingReflection(timeId, !keep)}
                    />
                );
            })}
        </>
    );
};
