import { makeVar } from "@apollo/client";

// Initializes to null
const activeJournalVar = makeVar<string>(null);

export const setActiveJournal = (journalId: string) =>
    activeJournalVar(journalId);

export const getActiveJournal = () => activeJournalVar();
