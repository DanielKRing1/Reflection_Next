import { makeVar } from "@apollo/client";
import client from "../../client/client";

import { getInklings } from "../../../gql/inklings";
import { getActiveJournal } from "./activeJournal";

import { JournalPhase } from "../../../../utils_ui/journalPhase";

// Initializes to Unknown
const journalPhaseVar = makeVar<JournalPhase>(JournalPhase.Unknown);

export const getJournalPhase = () => journalPhaseVar();

export const setJournalPhase = (phase: JournalPhase) => journalPhaseVar(phase);

export const determineJournalPhase = (): JournalPhase => {
    const activeJournalId: string = getActiveJournal();

    const { inklings } = client.readQuery({
        query: getInklings,
        // Provide any required variables in this object.
        // Variables of mismatched types will return `null`.
        variables: {
            journalId: activeJournalId,
        },
    });

    return inklings.length === 0
        ? JournalPhase.Inklings
        : JournalPhase.Reflection;
};
