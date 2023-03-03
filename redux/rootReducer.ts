import { combineReducers } from "redux";

import activeJournalSlice from "./activeJournalSlice";
import newInklingsSlice from "./newInklingsSlice";
import newJournalEntrySlice from "./newJournalEntrySlice";

export default combineReducers({
  activeJournalSlice,
  newInklingsSlice,
  newJournalEntrySlice,
});
