// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { JournalMetadata } from "../../db/api/types";

// REDUX
import { startDetermineJournalingPhase } from "../journalingPhaseSlice";
import { setJournalMetadata } from "../journalMetadataSlice";

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

/**
 * Pass 'journalId' as null to initiate app with 'lastUsedJournalId'
 * Fetches metadata from Db if not provided
 *
 * Sets 'activeJournalId'
 * Sets 'journalMetadata'
 * Initiates determining Journaling Phase
 */
type StartSetActiveJournalIdArgs = {
  journalId: string | null;
  metadata?: JournalMetadata;
};
export const startSetActiveJournalId = createAsyncThunk<
  boolean,
  StartSetActiveJournalIdArgs,
  ThunkConfig
>(
  "journalingPhase/startSetActiveJournalId",
  async ({ journalId = null, metadata }, thunkAPI) => {
    // 1. No Journal id provided, must be StartUp
    // Get last used Journal id
    if (journalId === null) journalId = await dbDriver.getLastUsedJournalId();

    if (journalId !== null) {
      // 2. Set activeJournalId in Redux
      thunkAPI.dispatch(setActiveJournalId(journalId));
      // 3. Set lastUsedJournalId in Db
      await dbDriver.setLastUsedJournalId(journalId);

      // 4. Get Journal metadata if not provided
      if (!metadata) metadata = await dbDriver.getJournalMetadata(journalId);
      // 5. Get Journal metadata in Redux
      thunkAPI.dispatch(setJournalMetadata(metadata));
    }

    // 6. Set Journaling Phase
    // null journalId (bcus no 'lastUsedJournalId' and therefore no existing journals) will prompt CreateJournal phase
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

// Only callable from 'startSetActiveJournalId'
const { setActiveJournalId } = ActiveJournalSlice.actions;

export default ActiveJournalSlice.reducer;
