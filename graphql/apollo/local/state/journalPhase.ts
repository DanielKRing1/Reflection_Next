import { makeVar } from "@apollo/client";
import client from "../../client/client";

import { GET_INKLINGS } from "../../../gql/inklings";
import { getActiveJournal } from "./activeJournal";

import { JournalPhase } from "../../../../utils_ui/journalPhase";
import { GET_JOURNALS } from "../../../gql/journal";
import { GET_USER } from "../../../gql/user";

// Initializes to Unknown
export const journalPhaseVar = makeVar<JournalPhase>(JournalPhase.Unknown);

export const getJournalPhase = () => journalPhaseVar();

const setJournalPhase = (phase: JournalPhase) => journalPhaseVar(phase);
export const setJournalPhaseUnknown = () =>
    journalPhaseVar(JournalPhase.Unknown);
export const setJournalPhaseCreateJournal = () =>
    journalPhaseVar(JournalPhase.CreateJournal);
export const setJournalPhaseInklings = () =>
    journalPhaseVar(JournalPhase.Inklings);
export const setJournalPhaseReflection = () =>
    journalPhaseVar(JournalPhase.Reflection);

export const determineJournalPhase = (): JournalPhase => {
    try {
        const activeJournalId: string = getActiveJournal();

        const { journals = null } =
            client.readQuery({
                query: GET_JOURNALS,
            }) || {};

        const { user = null } =
            client.readQuery({
                query: GET_USER,
            }) || {};

        const { inklings = [] } =
            client.readQuery({
                query: GET_INKLINGS,
                // Provide any required variables in this object.
                // Variables of mismatched types will return `null`.
                variables: {
                    journalId: activeJournalId,
                },
            }) || {};

        return user === null || journals === null
            ? setJournalPhaseUnknown()
            : activeJournalId === null
            ? setJournalPhaseCreateJournal()
            : inklings.length === 0
            ? setJournalPhaseInklings()
            : setJournalPhaseReflection();
    } catch (err) {
        console.log(err);
        return setJournalPhase(JournalPhase.Unknown);
    }
};
