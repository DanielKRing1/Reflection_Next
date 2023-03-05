// UTILS
import {
  genInklingKey,
  genThoughtsDictKey,
  genJournalKey,
  genJournalIdsKey,
  genLastUsedJournalKey,
} from "./keyGen";

// TYPES
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
  createJournal: async function (journalId: string): Promise<void> {
    const journalIds: string[] = await LocalStorageDriver.getJournalIds();

    // 1. Add journal id
    journalIds.push(journalId);

    // 2. Save journal ids
    localStorage.setItem(genJournalIdsKey(), JSON.stringify(journalIds));
  },
  getJournal: async function (journalId: string): Promise<Journal> {
    try {
      return JSON.parse(localStorage.getItem(genJournalKey(journalId))) || [];
    } catch (err) {
      // No Journal
      return [];
    }
  },
  deleteJournal: async function (journalId: string): Promise<void> {
    // 1. Remove Inklings
    await LocalStorageDriver.clearInklings(journalId);

    // 2. Remove ThoughtsDict
    localStorage.removeItem(genThoughtsDictKey(journalId));

    // 3. Remove Journal
    localStorage.removeItem(genJournalKey(journalId));

    // 4. Remove from JournalIds
    const journalIdsToKeep: string[] = (
      await LocalStorageDriver.getJournalIds()
    ).filter((id: string) => id !== journalId);
    // Stringify array
    localStorage.setItem(genJournalIdsKey(), JSON.stringify(journalIdsToKeep));

    // 5. Remove if last used JournalId
    if (journalId === (await LocalStorageDriver.getLastUsedJournalId()))
      // By replacing with null
      localStorage.setItem(genLastUsedJournalKey(), null);
  },

  getJournalIds: async function (): Promise<string[]> {
    try {
      return JSON.parse(localStorage.getItem(genJournalIdsKey())) || [];
    } catch (err) {
      // No Journal ids
      return [];
    }
  },
  setLastUsedJournalId: async function (journalId: string): Promise<void> {
    localStorage.setItem(genLastUsedJournalKey(), journalId);
  },
  getLastUsedJournalId: async function (): Promise<string | undefined> {
    let lastUsedJournalId = JSON.parse(
      localStorage.getItem(genLastUsedJournalKey())
    );

    // 1. Get last used
    if (lastUsedJournalId !== null) return lastUsedJournalId;

    // 2. Else return any id or undefined if none
    const allIds: string[] = await LocalStorageDriver.getJournalIds();
    return allIds.length > 0 ? allIds[0] : undefined;
  },
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
