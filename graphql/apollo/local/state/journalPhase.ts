import { makeVar } from "@apollo/client";
import client from "../../client/client";

import { GET_INKLINGS } from "../../../gql/inklings";
import { getActiveJournal } from "./activeJournal";

import { JournalPhase } from "../../../../utils_ui/journalPhase";

// Initializes to Unknown
const journalPhaseVar = makeVar<JournalPhase>(JournalPhase.Unknown);

export const getJournalPhase = () => journalPhaseVar();

export const setJournalPhase = (phase: JournalPhase) => journalPhaseVar(phase);

export const determineJournalPhase = (): JournalPhase => {
    try {
        const activeJournalId: string = getActiveJournal();

        const { inklings } = client.readQuery({
            query: GET_INKLINGS,
            // Provide any required variables in this object.
            // Variables of mismatched types will return `null`.
            variables: {
                journalId: activeJournalId,
            },
        });

        return inklings.length === 0
            ? JournalPhase.Inklings
            : JournalPhase.Reflection;
    } catch (err) {
        console.log(err);
        return JournalPhase.Unknown;
    }
};
