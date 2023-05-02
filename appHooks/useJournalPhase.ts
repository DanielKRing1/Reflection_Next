/**
 * Only use this hook once at the top-level of the app
 */

import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { GET_JOURNAL_PHASE } from "../graphql/apollo/local/gql/journalPhase";
import { JournalPhase } from "../utils_ui/journalPhase";
import {
    setJournalPhase,
    determineJournalPhase,
} from "../graphql/apollo/local/state/journalPhase";
import { GET_INKLINGS } from "../graphql/gql/inklings";
import { GET_ACTIVE_JOURNAL } from "../graphql/apollo/local/gql/activeJournal";

export default () => {
    // LOCAL STATE

    const { data: activeJournal } = useQuery<boolean>(GET_ACTIVE_JOURNAL);
    const { data: journalPhase } = useQuery<JournalPhase>(GET_JOURNAL_PHASE);

    // SERVER/LOCAL STATE

    // Inklings
    const [getInklings, { loading, error, data, refetch, called }] =
        useLazyQuery(GET_INKLINGS);

    // ROUTING

    const router = useRouter();

    // SET JOURNAL PHASE

    useEffect(() => {
        if (!activeJournal) return;

        if (!loading && !error) setJournalPhase(determineJournalPhase());
    }, [loading, error]);

    // HANDLE JOURNAL PHASE CHANGES

    useEffect(() => {
        switch (journalPhase) {
            case JournalPhase.Inklings: {
                router.push("/");
            }

            case JournalPhase.Reflection: {
                router.push("/");
            }

            default:
            case JournalPhase.Unknown: {
                // Do nothing
            }
        }
    }, [journalPhase]);
};
