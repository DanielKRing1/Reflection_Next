// HARDWARE
import DbHardware from "../hardware";

// TYPES
import { DbDriverType } from "./types";

const dbDriver: DbDriverType = {
  // INKLINGS
  getInklings: DbHardware.getInklings,
  commitInklings: DbHardware.commitInklings,
  clearInklings: DbHardware.clearInklings,

  // REFLECTIONS, ENTRIES, JOURNAL
  addJournalEntry: async function (
    journalId: string,
    thoughtIdsDiscarded: string[],
    thoughtIdsKept: string[],
    inklingIdsKept: string[],
    inklingIdsDiscarded: string[]
  ): Promise<void> {
    // Save Inklings as Thoughts before deleting Inklings cache, so they can still be referenced
    await DbHardware._convertInklingsToThoughts(journalId);

    // Add JournalEntry
    await DbHardware.addJournalEntry(
      journalId,
      thoughtIdsDiscarded,
      thoughtIdsKept,
      inklingIdsKept,
      inklingIdsDiscarded
    );

    //
    await DbHardware.clearInklings(journalId);
  },
  getLastEntryKept: DbHardware.getLastEntryKept,
  getJournal: DbHardware.getJournal,

  // THOUGHTS
  commitThoughts: DbHardware.commitThoughts,
  getThoughts: DbHardware.getThoughts,
  getThoughtsDict: DbHardware.getThoughtsDict,
};

export default dbDriver;
