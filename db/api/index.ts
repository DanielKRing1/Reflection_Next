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

  createJournal: DbHardware.createJournal,
  getJournal: DbHardware.getJournal,
  deleteJournal: DbHardware.deleteJournal,

  getJournalIds: DbHardware.getJournalIds,
  setLastUsedJournalId: DbHardware.setLastUsedJournalId,
  getLastUsedJournalId: DbHardware.getLastUsedJournalId,

  /**
   * 1. Converts Inklings to Thoughts,
   * 2. Saves them to ThoughtsDict,
   * 3. Adds a new JournalEntry,
   * 4. Then deletes old Inklings
   */
  addJournalEntry: async function (
    journalId: string,
    thoughtIdsDiscarded: string[],
    thoughtIdsKept: string[],
    inklingIdsKept: string[],
    inklingIdsDiscarded: string[]
  ): Promise<void> {
    // 1. Save Inklings as Thoughts in Db
    // Save them before deleting Inklings cache, so they can still be referenced by Journal Entries
    await DbHardware._convertInklingsToThoughts(journalId);

    // 2. Save JournalEntry
    await DbHardware.addJournalEntry(
      journalId,
      thoughtIdsDiscarded,
      thoughtIdsKept,
      inklingIdsKept,
      inklingIdsDiscarded
    );

    // 3. Delete Inklings
    await DbHardware.clearInklings(journalId);
  },
  getCurrentIdentityIds: DbHardware.getCurrentIdentityIds,

  // THOUGHTS
  getThoughts: DbHardware.getThoughts,
  getThoughtsDict: DbHardware.getThoughtsDict,
};

export default dbDriver;
