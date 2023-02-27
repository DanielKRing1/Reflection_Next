import { combineReducers } from "redux";

import newEntriesSlice from "./newEntriesSlice";
import selectedEntriesSlice from "./selectedEntriesSlice";

export default combineReducers({
  newEntriesSlice,
  selectedEntriesSlice,
});
