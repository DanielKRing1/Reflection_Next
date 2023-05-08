import { makeVar } from "@apollo/client";

// Initializes to null
export const activeJournalVar = makeVar<string>(null);

export const setActiveJournal = (journalId: string) =>
    activeJournalVar(journalId);

export const clearActiveJournal = () => activeJournalVar(null);

export const getActiveJournalVar = () => activeJournalVar;
export const getActiveJournal = () => activeJournalVar();
