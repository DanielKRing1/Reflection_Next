/**
 * Only use this hook once at the top-level of the app
 */

import { useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { JournalPhase } from "../utils_ui/journalPhase";
import {
    determineJournalPhase,
    journalPhaseVar,
} from "../graphql/apollo/local/state/journalPhase";
import { GET_INKLINGS } from "../graphql/gql/inklings";
import { activeJournalVar } from "../graphql/apollo/local/state/activeJournal";
import { GET_JOURNALS } from "../graphql/gql/journal";
import { GET_USER } from "../graphql/gql/user";

export default () => {
    // LOCAL STATE

    const activeJournal = useReactiveVar(activeJournalVar);
    const journalPhase = useReactiveVar(journalPhaseVar);

    // ROUTING

    const router = useRouter();

    // SERVER/LOCAL STATE

    // Local User, Journal, Inklings
    const {
        loading: loading_user,
        error: error_user,
        data: { user = null } = {},
        refetch: refetch_user,
    } = useQuery(GET_USER, {
        fetchPolicy: "cache-only",
    });
    const {
        loading: loading_journals,
        error: error_journals,
        data: { journals = null } = {},
        refetch: refetch_journals,
    } = useQuery(GET_JOURNALS, {
        fetchPolicy: "cache-only",
    });
    const {
        loading: loading_inklings,
        error: error_inklings,
        data: { inklings = null } = {},
        refetch: refetch_inklings,
    } = useQuery(GET_INKLINGS, {
        variables: {
            journalId: activeJournal,
        },
        fetchPolicy: "cache-only",
    });

    // SET JOURNAL PHASE

    // After Inklings are cached, determine journal phases
    useEffect(() => {
        if (user === null || journals === null || inklings === null) return;

        determineJournalPhase();
    }, [user, journals, inklings]);

    // HANDLE JOURNAL PHASE CHANGES

    // useEffect(() => {
    //     switch (journalPhase) {
    //         case JournalPhase.Inklings: {
    //             router.push("/");
    //             break;
    //         }

    //         case JournalPhase.Reflection: {
    //             router.push("/");
    //             break;
    //         }

    //         default:
    //         case JournalPhase.Unknown: {
    //             // Do nothing
    //             break;
    //         }
    //     }
    // }, [journalPhase]);
};
