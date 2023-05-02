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

    const {
        data: { activeJournal },
    } = useQuery(GET_ACTIVE_JOURNAL);
    const {
        data: { journalPhase },
    } = useQuery(GET_JOURNAL_PHASE);

    // ROUTING

    const router = useRouter();

    // SERVER/LOCAL STATE

    // Inklings
    const [getInklings, { loading, error, data, refetch, called }] =
        useLazyQuery(GET_INKLINGS);

    // SET JOURNAL PHASE

    // Cache Inklings from server, locally
    const _getInklings = () => {
        const vars = {
            variables: {
                journalId: activeJournal,
            },
        };

        if (!called) getInklings(vars);
        else refetch(vars);
    };
    useEffect(() => {
        if (activeJournal === null) return;

        _getInklings();
    }, [activeJournal]);

    // When Inklings are cached, determine journal phase
    useEffect(() => {
        if (!loading && !error) setJournalPhase(determineJournalPhase());
    }, [loading, error]);

    // HANDLE JOURNAL PHASE CHANGES

    useEffect(() => {
        switch (journalPhase) {
            case JournalPhase.Inklings: {
                router.push("/");
                break;
            }

            case JournalPhase.Reflection: {
                router.push("/");
                break;
            }

            default:
            case JournalPhase.Unknown: {
                // Do nothing
                break;
            }
        }
    }, [journalPhase]);
};
