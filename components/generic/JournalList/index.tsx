import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_JOURNALS } from "../../../graphql/gql/journal";
import { activeJournalVar } from "../../../graphql/apollo/local/state/activeJournal";

type JournalListProps = {};

export default (props: JournalListProps) => {
    const {
        loading,
        data: { journals = [] } = {},
        error,
    } = useQuery(GET_JOURNALS);

    const activeJournal = useReactiveVar(activeJournalVar);

    return (
        <>
            <p>Active: {activeJournal}</p>
            {loading ? (
                <p>Loading Journals...</p>
            ) : (
                journals.map(({ id, name }) => <p key={id}>{name}</p>)
            )}
        </>
    );
};
