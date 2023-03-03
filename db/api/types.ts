import { DataWId, Dict } from "../../types/data";

// 1. User adds inklings to UI
// 2. User submits inklings to Temp table
// 3. User Reflects on Inklings and last JournalEntry (selects some)
// 4. User submits selection
// 4.1. All Inklings are coverted into Thoughts (add timestamp) and added to the ThoughtDict
// 4.2. The selected and discarded Thoughts and Inklings are recorded in a new JournalEntry

// THE BEGINNING OF A THOUGHT - AN IDEA NOT YET COMMITTED TO THE JOURNAL

// Submitted but not yet committed to a journal session
// { id, data }
export type Inkling = DataWId<string>;
export type Inklings = Inkling[];

// REFLECTIONS ON PREVIOUS AND CURRENT SESSIONS' THOUGHTS

// A reflection on a single thought
// An id tracked in 'CommittedEntries'
//      and 0 or 1 to denote whether the entry is kept (1) or discarded (0)
//      in the current snapshot
// { id, data: 0 | 1 }
export enum ReflectionDecision {
  Discard,
  Keep,
}
export type Reflection = DataWId<ReflectionDecision>;
// All the reflections of a journaling session
export type JournalEntry = {
  time: Date;
  reflections: Reflection[];
};
// All journaling sessions
export type Journal = JournalEntry[];

// IDEAS REFLECTED ON AND COMMITTED TO THE JOURNAL

// A single thought that has been committed to the journal
//      and reflected on (keep or discard thought)
export type Thought = Inkling & {
  time: Date;
};
// A dict of all committed thoughts (excludes pending thoughts)
//      This is 'the source of truth' for thought data
// { id: Thought }
export type ThoughtsDict = Dict<Thought>;

export type DbDriverType = {
  // INKLINGS
  commitInklings: (journalId: string, inklings: Inklings) => Promise<void>;
  getInklings: (journalId: string) => Promise<Inklings>;
  clearInklings: (journalId: string) => Promise<void>;

  // REFLECTIONS, ENTRIES, JOURNAL
  addJournalEntry: (
    journalId: string,
    thoughtIdsDiscarded: string[],
    thoughtIdsKept: string[],
    inklingIdsKept: string[],
    inklingIdsDiscarded: string[]
  ) => Promise<void>;
  getCurrentIdentityIds: (journalId: string) => Promise<string[]>;
  getJournal: (journalId: string) => Promise<Journal>;
  getJournalIds: () => Promise<string[]>;
  getLastUsedJournalId: () => Promise<string | undefined>;

  // THOUGHTS
  getThoughts: (journalId: string, thoughtIds: string[]) => Promise<Thought[]>;
  getThoughtsDict: (journalId: string) => Promise<ThoughtsDict>;
};

export type DbHardwareType = DbDriverType & {
  // THOUGHTS
  _convertInklingsToThoughts: (journalId: string) => Promise<void>;
  // User will never need to manually commit Inklings
  // Inklings will be committed once a Journal Reflection is complete
  _commitThoughts: (journalId: string, thoughts: Thought[]) => Promise<void>;
};
