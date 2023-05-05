import { makeVar } from "@apollo/client";
import client from "../../client/client";

import { GET_INKLINGS } from "../../../gql/inklings";
import { getActiveJournal } from "./activeJournal";

import { JournalPhase } from "../../../../utils_ui/journalPhase";
import { GET_JOURNALS } from "../../../gql/journal";

// Initializes to Unknown
const journalPhaseVar = makeVar<JournalPhase>(JournalPhase.Unknown);

export const getJournalPhase = () => journalPhaseVar();

const setJournalPhase = (phase: JournalPhase) => journalPhaseVar(phase);
export const setJournalPhaseCreateJournal = () =>
    journalPhaseVar(JournalPhase.CreateJournal);
export const setJournalPhaseInklings = () =>
    journalPhaseVar(JournalPhase.Inklings);
export const setJournalPhaseReflection = () =>
    journalPhaseVar(JournalPhase.Reflection);

export const determineJournalPhase = (): JournalPhase => {
    try {
        const activeJournalId: string = getActiveJournal();

        const { journals = [] } =
            client.readQuery({
                query: GET_JOURNALS,
            }) || {};
        console.log("determine, journals");
        console.log(journals);

        const { inklings = [] } =
            client.readQuery({
                query: GET_INKLINGS,
                // Provide any required variables in this object.
                // Variables of mismatched types will return `null`.
                variables: {
                    journalId: activeJournalId,
                },
            }) || {};

        console.log("hererherher");
        console.log(inklings);

        return journals.length === 0
            ? setJournalPhase(JournalPhase.CreateJournal)
            : inklings.length === 0
            ? setJournalPhase(JournalPhase.Inklings)
            : setJournalPhase(JournalPhase.Reflection);
    } catch (err) {
        console.log(err);
        return setJournalPhase(JournalPhase.Unknown);
    }
};
