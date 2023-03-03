import { combineReducers } from "redux";

import newInklingsSlice from "./newInklingsSlice";
import selectedEntriesSlice from "./selectedThoughtsSlice";

export default combineReducers({
  newInklingsSlice,
  selectedEntriesSlice,
});
