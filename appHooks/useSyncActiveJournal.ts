/**
 * Only use this hook once at the top-level of the app
 */

import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_USER } from "../graphql/gql/user";
import { setActiveJournal } from "../graphql/apollo/local/state/activeJournal";
import { GET_ACTIVE_JOURNAL } from "../graphql/apollo/local/gql/activeJournal";
import { UPDATE_LAST_USEDJID } from "../graphql/gql/updateUser";

export default () => {
    // LOCAL STATE

    const {
        data: { activeJournal },
    } = useQuery(GET_ACTIVE_JOURNAL);

    // SERVER STATE

    // Query User (only from cache)
    const {
        loading: loading_user,
        error: error_user,
        data: { user = {} } = {},
    } = useQuery(GET_USER, {
        fetchPolicy: "cache-only",
    });

    // Mutate last used journal id
    const [
        updateLastUsedJId,
        { loading: loading_jid, error: error_jid, data: data_jid },
    ] = useMutation(UPDATE_LAST_USEDJID);

    // SET USER'S LAST ACTIVE JOURNAL

    useEffect(() => {
        try {
            console.log("useSyncActiveJournal-update");
            console.log(user);

            if (user.lastUsedJId === activeJournal) return;

            setActiveJournal(user.lastUsedJId);
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    useEffect(() => {
        updateLastUsedJId({ variables: { journalId: activeJournal } });
    }, [activeJournal]);
};
