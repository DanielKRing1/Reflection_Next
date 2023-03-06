import { combineReducers } from "redux";

import journalingPhaseSlice from "./journalingPhaseSlice";

import createJournalSlice from "./createJournalSlice";
import activeJournalSlice from "./activeJournalSlice";
import journalMetadataSlice from "./journalMetadataSlice";
import journalThoughtsDictSlice from "./journalThoughtsDictSlice";
import journalSlice from "./journalSlice";
import identityThoughtsSlice from "./identityThoughtsSlice";

import newInklingsSlice from "./newInklingsSlice";
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
