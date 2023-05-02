/**
 * Only use this hook once at the top-level of the app
 */

import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_USER } from "../graphql/gql/user";
import { GET_IS_LOGGED_IN } from "../graphql/apollo/local/gql/isLoggedIn";
import { GET_JOURNALS } from "../graphql/gql/journal";

export default () => {
    // LOCAL STATE

    const { data: isLoggedIn } = useQuery<boolean>(GET_IS_LOGGED_IN);

    // SERVER STATE

    // User
    const [
        getUser,
        {
            loading: loading_user,
            error: error_user,
            data: data_user,
            refetch: refetch_user,
            called: called_user,
        },
    ] = useLazyQuery(GET_USER);

    const _hydrateUser = () => {
        if (!called_user) getUser();
        else refetch_user();
    };

    // Journals
    const [
        getJournals,
        {
            loading: loading_journals,
            error: error_journals,
            data: data_journals,
            refetch: refetch_journals,
            called: called_journals,
        },
    ] = useLazyQuery(GET_JOURNALS);

    const _hydrateJournals = () => {
        if (!called_journals) getJournals();
        else refetch_journals();
    };

    useEffect(() => {
        if (!isLoggedIn) return;

        // Hydrate app
        _hydrateUser();
        _hydrateJournals();
    }, [isLoggedIn]);
};
