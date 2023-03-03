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
import { genInklingKey, genJournalKey, genThoughtsDictKey } from "./keyGen";

const LocalStorageDriver: DbHardwareType = {
  // INKLINGS
  getInklings: async function (journalId: string): Promise<Inklings> {
    return JSON.parse(localStorage.getItem(genInklingKey(journalId)));
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
  getLastEntryKept: async function (journalId: string): Promise<string[]> {
    const journal: Journal = await LocalStorageDriver.getJournal(journalId);

    const lastReflections: Reflection[] =
      journal.length > 0 ? journal[journal.length - 1].reflections : [];
    return lastReflections
      .filter(({ data }: Reflection) => data === ReflectionDecision.Keep)
      .map(({ id }: Reflection) => id);
  },
  getJournal: function (journalId: string): Promise<Journal> {
    return JSON.parse(localStorage.getItem(genJournalKey(journalId)));
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
    LocalStorageDriver.commitThoughts(journalId, newThoughts);

    // 4. Delete Inklings
    LocalStorageDriver.clearInklings(journalId);
  },
  commitThoughts: async function (journalId: string, thoughts: Thought[]) {
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
