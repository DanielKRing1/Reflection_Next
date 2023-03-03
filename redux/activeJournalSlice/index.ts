// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";

// REDUX
import { startDetermineJournalingPhase } from "../journalingPhaseSlice";

// TYPES
import { ThunkConfig } from "../types";

/**
 * FLOW OF EVENTS
 *
 * On StartUp: Call StartUp action -> Set activeJournalId to Db.lastUsedJournalId -> Hydrate committed Inklings + set Journaling Phase
 *                                                                               /
 * User Changes Journal ------------> Set activeJournalId to new journalId -----
 */

// INITIAL STATE

export interface ActiveJournalState {
  // Name of selected/active journal
  activeJournalId: string;
}

const initialState: ActiveJournalState = {
  activeJournalId: "",
};

// THUNKS

export const startSetActiveJournalId = createAsyncThunk<
  boolean,
  string | undefined,
  ThunkConfig
>(
  "journalingPhase/startSetActiveJournalId",
  async (journalId: string | undefined, thunkAPI) => {
    // 1. No Journal id provided, must be StartUp
    // Get last used Journal id
    if (journalId === undefined)
      journalId = await dbDriver.getLastUsedJournalId();

    // 2. Set activeJournalId
    if (journalId !== undefined)
      thunkAPI.dispatch(setActiveJournalId(journalId));

    // 3. Set Journaling Phase
    thunkAPI.dispatch(startDetermineJournalingPhase(journalId));

    return true;
  }
);

// ACTION TYPES

type SetActiveJournalIdAction = PayloadAction<string>;
type StartSetActiveJournalId = PayloadAction<boolean>;

// SLICE

export const ActiveJournalSlice = createSlice({
  name: "activeJournal",
  initialState,
  reducers: {
    setActiveJournalId: (
      state: ActiveJournalState,
      action: SetActiveJournalIdAction
    ) => {
      state.activeJournalId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startSetActiveJournalId.fulfilled,
      (state, action: StartSetActiveJournalId) => {
        // Add user to the state array
      }
    );
    builder.addCase(startSetActiveJournalId.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

const { setActiveJournalId } = ActiveJournalSlice.actions;

export default ActiveJournalSlice.reducer;
