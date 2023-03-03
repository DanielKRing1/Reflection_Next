import { combineReducers } from "redux";

import newInklingsSlice from "./newInklingsSlice";
import newJournalEntrySlice from "./newJournalEntrySlice";

export default combineReducers({
  newInklingsSlice,
  newJournalEntrySlice,
});
