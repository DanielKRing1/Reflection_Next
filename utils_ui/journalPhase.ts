import { hasInklings } from "./hydrateStore";

// JOURNAL

export enum JournalPhase {
    Inklings,
    Reflection,
}
export const getJournalPhase = () =>
    hasInklings() ? JournalPhase.Reflection : JournalPhase.Reflection;
