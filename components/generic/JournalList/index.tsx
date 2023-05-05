import { useQuery } from "@apollo/client";
import { GET_JOURNALS } from "../../../graphql/gql/journal";

type JournalListProps = {};

export default (props: JournalListProps) => {
    const {
        loading,
        data: { journals = [] } = {},
        error,
    } = useQuery(GET_JOURNALS);

    console.log("Journal query data:");
    console.log(journals);

    return (
        <>
            {loading ? (
                <p>Loading Journals...</p>
            ) : (
                journals.map(({ id, name }) => <p key={id}>{name}</p>)
            )}
        </>
    );
};
