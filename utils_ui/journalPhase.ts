import { hasInklings } from "./hydrateStore";

// JOURNAL

export enum JournalPhase {
    Unknown,
    MustCreateJournal,
    Inklings,
    Reflection,
}
export const getJournalPhase = () =>
    hasInklings() ? JournalPhase.Reflection : JournalPhase.Reflection;
