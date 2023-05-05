/**
 * Only use this hook once at the top-level of the app
 */

import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_ACTIVE_JOURNAL } from "../graphql/apollo/local/gql/activeJournal";
import { GET_INKLINGS } from "../graphql/gql/inklings";
import { GET_JOURNAL_ENTRIES } from "../graphql/gql/journalEntry";

export default () => {
    // LOCAL STATE
    const { data: { activeJournal = null } = {} } =
        useQuery(GET_ACTIVE_JOURNAL);

    // SERVER STATE

    // Inklings
    const [
        getInklings,
        {
            loading: loading_inklings,
            error: error_inklings,
            data: data_inklings,
            refetch: refetch_inklings,
            called: called_inklings,
        },
    ] = useLazyQuery(GET_INKLINGS);

    const _hydrateInklings = () => {
        const vars = {
            variables: {
                journalId: activeJournal,
            },
        };

        if (!called_inklings) getInklings(vars);
        else refetch_inklings(vars);
    };

    // Journal Entries
    const [
        getJournalEntries,
        {
            loading: loading_journalEntries,
            error: error_journalEntries,
            data: data_journalEntries,
            refetch: refetch_journalEntries,
            called: called_journalEntries,
        },
    ] = useLazyQuery(GET_JOURNAL_ENTRIES);

    const _hydrateJournalEntries = () => {
        const vars = {
            variables: {
                journalId: activeJournal,
                cursorTime: new Date(),
                count: 5,
            },
        };

        if (!called_journalEntries) getJournalEntries(vars);
        else refetch_journalEntries(vars);
    };

    // HYDRATE JOURNAL

    useEffect(() => {
        if (activeJournal === null) return;

        _hydrateInklings();
        _hydrateJournalEntries();
    }, [activeJournal]);
};
