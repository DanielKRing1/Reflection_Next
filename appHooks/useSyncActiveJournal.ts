/**
 * Only use this hook once at the top-level of the app
 */

import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import { GET_USER } from "../graphql/gql/user";
import {
    activeJournalVar,
    setActiveJournal,
} from "../graphql/apollo/local/state/activeJournal";
import { UPDATE_LAST_USEDJID } from "../graphql/gql/updateUser";
import { GET_JOURNALS } from "../graphql/gql/journal";
import { getIsLoggedIn } from "../graphql/apollo/local/state/isLoggedIn";

export default () => {
    // LOCAL STATE

    const activeJournal = useReactiveVar(activeJournalVar);

    // SERVER STATE

    // Query User (only from cache)
    const {
        // loading: loading_user,
        // error: error_user,
        data: { user = null } = {},
    } = useQuery(GET_USER, {
        fetchPolicy: "cache-only",
    });

    // Query Journal (only from cache)
    const {
        // loading: loading_journals,
        // error: error_journals,
        data: { journals = null } = {},
    } = useQuery(GET_JOURNALS, {
        fetchPolicy: "cache-only",
    });

    // Mutate last used journal id
    const [
        updateLastUsedJId,
        { loading: loading_jid, error: error_jid, data: data_jid },
    ] = useMutation(UPDATE_LAST_USEDJID);

    // SET USER'S LAST ACTIVE JOURNAL

    // Determine initial starting active journal, from user.lastUsedJId and journals list
    useEffect(() => {
        // 0.1. If active journal already set, do not set again
        if (activeJournal !== null) return;
        // 0.2. If user or journals queries have not completed yet, wait
        if (user === null || journals === null) return;

        // 1. Determine the initial active journal (before any active journals have been set yet)
        const initialActiveJournal =
            user.lastUsedJId !== null
                ? // Use last used journal if not null
                  user.lastUsedJId
                : journals.length > 0
                ? // Else first journal in list if any exist
                  journals[0].id
                : // Else still null
                  null;

        // 2. Set initial active journal, if not null
        if (initialActiveJournal !== null)
            setActiveJournal(initialActiveJournal);
    }, [user, journals]);

    useEffect(() => {
        if (!getIsLoggedIn()) return;

        // TODO:
        // If user loading for first time, this will execute, but
        // This should not triggerserver mutation

        // lastUsedJId should update, even if activeJournal becomes null
        updateLastUsedJId({ variables: { journalId: activeJournal } });
    }, [activeJournal]);
};
