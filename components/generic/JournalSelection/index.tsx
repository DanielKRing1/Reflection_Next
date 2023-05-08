import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_JOURNALS } from "../../../graphql/gql/journal";
import {
    activeJournalVar,
    setActiveJournal,
} from "../../../graphql/apollo/local/state/activeJournal";
import { SelectionRow } from "./SelectionRow";

type JournalSelectionProps = {};

export default (props: JournalSelectionProps) => {
    const {
        loading,
        data: { journals = [] } = {},
        error,
    } = useQuery(GET_JOURNALS);

    const activeJournal = useReactiveVar(activeJournalVar);

    return (
        <>
            {loading ? (
                <p>Loading Journals...</p>
            ) : (
                journals.map(({ id, name }) => (
                    <SelectionRow
                        key={id}
                        name={name}
                        isSelected={id === activeJournal}
                        onSelect={() => setActiveJournal(id)}
                    />
                ))
            )}
        </>
    );
};
