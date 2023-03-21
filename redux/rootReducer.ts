import { combineReducers } from "redux";

import journalingPhaseSlice from "./journalingPhaseSlice";

import createJournalSlice from "./createJournalSlice";
import activeJournalSlice from "./activeJournalSlice";
import journalMetadataSlice from "./journalMetadataSlice";
import journalThoughtsDictSlice from "./db/journalThoughtsDictSlice";
import journalSlice from "./db/journalSlice";
import identityThoughtsSlice from "./db/identityThoughtsSlice";

import newInklingsSlice from "./db/newInklingsSlice";
import createJournalEntrySlice from "./createJournalEntrySlice";

export default combineReducers({
  journalingPhaseSlice,

  createJournalSlice,
  activeJournalSlice,
  journalMetadataSlice,
  journalThoughtsDictSlice,
  journalSlice,
  identityThoughtsSlice,

  newInklingsSlice,
  createJournalEntrySlice,
});
