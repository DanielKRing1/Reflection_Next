import { hasInklings } from "./hydrateStore";

// JOURNAL

export enum JournalPhase {
    Unknown,
    CreateJournal,
    Inklings,
    Reflection,
}
export const getJournalPhase = () =>
    hasInklings() ? JournalPhase.Reflection : JournalPhase.Reflection;
