import { combineReducers } from "redux";

import journalingPhaseSlice from "./journalingPhaseSlice";
import activeJournalSlice from "./activeJournalSlice";
import newInklingsSlice from "./newInklingsSlice";
import newJournalEntrySlice from "./newJournalEntrySlice";

export default combineReducers({
  journalingPhaseSlice,
  activeJournalSlice,
  newInklingsSlice,
  newJournalEntrySlice,
});
