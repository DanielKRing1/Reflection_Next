import {
  DbHardwareType,
  Inkling,
  Inklings,
  Journal,
  JournalEntry,
  Reflection,
  ReflectionDecision,
  Thought,
  ThoughtsDict,
} from "../../api/types";
import {
  genInklingKey,
  genJournalIdsKey,
  genJournalKey,
  genLastUsedJournalKey,
  genThoughtsDictKey,
} from "./keyGen";

const LocalStorageDriver: DbHardwareType = {
  // INKLINGS
  getInklings: async function (journalId: string): Promise<Inklings> {
    try {
      return JSON.parse(localStorage.getItem(genInklingKey(journalId))) || [];
    } catch (err) {
      // No Inklings
      return [];
    }
  },
  commitInklings: async function (
    journalId: string,
    inklings: Inklings
  ): Promise<void> {
    localStorage.setItem(genInklingKey(journalId), JSON.stringify(inklings));
  },
  clearInklings: async function (journalId: string): Promise<void> {
    localStorage.removeItem(genInklingKey(journalId));
  },

  // REFLECTIONS, ENTRIES, JOURNAL
  addJournalEntry: async function (
    journalId: string,
    thoughtIdsDiscarded: string[],
    thoughtIdsKept: string[],
    inklingIdsKept: string[],
    inklingIdsDiscarded: string[]
  ): Promise<void> {
    const journal: Journal = await LocalStorageDriver.getJournal(journalId);

    const reflections: Reflection[] = [];
    // Add Discarded Thoughts
    reflections.push(
      ...thoughtIdsDiscarded.map((id: string) => ({
        id,
        data: ReflectionDecision.Discard,
      }))
    );
    // Add Kept Thoughts
    reflections.push(
      ...thoughtIdsKept.map((id: string) => ({
        id,
        data: ReflectionDecision.Keep,
      }))
    );
    // Add Kept Inklings
    reflections.push(
      ...inklingIdsKept.map((id: string) => ({
        id,
        data: ReflectionDecision.Keep,
      }))
    );
    // Add Discarded Inklings
    reflections.push(
      ...inklingIdsDiscarded.map((id: string) => ({
        id,
        data: ReflectionDecision.Discard,
      }))
    );

    // Create new JournalEntry
    const newEntry: JournalEntry = {
      time: new Date(),
      reflections,
    };
    journal.push(newEntry);
    localStorage.setItem(genJournalKey(journalId), JSON.stringify(journal));
  },
  getCurrentIdentityIds: async function (journalId: string): Promise<string[]> {
    try {
      const journal: Journal = await LocalStorageDriver.getJournal(journalId);

      const lastReflections: Reflection[] =
        journal.length > 0 ? journal[journal.length - 1].reflections : [];

      return lastReflections
        .filter(({ data }: Reflection) => data === ReflectionDecision.Keep)
        .map(({ id }: Reflection) => id);
    } catch (err) {
      // No current Identity
      return [];
    }
  },
  getJournal: async function (journalId: string): Promise<Journal> {
    try {
      return JSON.parse(localStorage.getItem(genJournalKey(journalId))) || [];
    } catch (err) {
      // No Journal
      return [];
    }
  },
  getJournalIds: async function (): Promise<string[]> {
    try {
      return JSON.parse(localStorage.getItem(genJournalIdsKey())) || [];
    } catch (err) {
      // No Journal ids
      return [];
    }
  },
  getLastUsedJournalId: async function (): Promise<string | undefined> {
    let lastUsedJournalId = localStorage.getItem(genLastUsedJournalKey());

    // 1. Get last used
    if (lastUsedJournalId !== null) return lastUsedJournalId;

    // 2. Else return any id or undefined if none
    const allIds: string[] = await LocalStorageDriver.getJournalIds();
    return allIds.length > 0 ? allIds[0] : undefined;
  },

  // THOUGHTS
  _convertInklingsToThoughts: async function (journalId: string) {
    // 1. Get Inklings
    const inklings: Inklings = await LocalStorageDriver.getInklings(journalId);

    // 2. Convert Inklings to Thoughts
    const time: Date = new Date();
    const newThoughts: Thought[] = inklings.map((inkling: Inkling) => ({
      ...inkling,
      time,
    }));

    // 3. Save new Thoughts in ThoughtsDict
    LocalStorageDriver._commitThoughts(journalId, newThoughts);
  },
  _commitThoughts: async function (journalId: string, thoughts: Thought[]) {
    // 0. Get ThoughtsDict
    const thoughtsDict: ThoughtsDict = await LocalStorageDriver.getThoughtsDict(
      journalId
    );

    // 1. Add Thoughts to ThoughtsDict
    thoughts.forEach(
      (thought: Thought) => (thoughtsDict[thought.id] = thought)
    );

    // 2. Save updated ThoughtsDict
    localStorage.setItem(
      genThoughtsDictKey(journalId),
      JSON.stringify(thoughtsDict)
    );
  },
  getThoughts: async function (
    journalId: string,
    thoughtIds: string[]
  ): Promise<Thought[]> {
    // 0. Get ThoughtsDict
    const thoughtsDict: ThoughtsDict = await LocalStorageDriver.getThoughtsDict(
      journalId
    );

    // 1. Map Thought ids to Thoughts list
    return thoughtIds.map((id: string) => thoughtsDict[id]);
  },
  getThoughtsDict: async function (journalId: string): Promise<ThoughtsDict> {
    return JSON.parse(localStorage.getItem(genThoughtsDictKey(journalId)));
  },
};

export default LocalStorageDriver;
