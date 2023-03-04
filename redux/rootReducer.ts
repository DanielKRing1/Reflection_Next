import { combineReducers } from "redux";

import journalingPhaseSlice from "./journalingPhaseSlice";
import createJournalSlice from "./createJournalSlice";
import activeJournalSlice from "./activeJournalSlice";
import newInklingsSlice from "./newInklingsSlice";
import newJournalEntrySlice from "./newJournalEntrySlice";

export default combineReducers({
  journalingPhaseSlice,

  createJournalSlice,
  activeJournalSlice,

  newInklingsSlice,
  newJournalEntrySlice,
});
