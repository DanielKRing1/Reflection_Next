// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import {
  DEFAULT_JOURNAL_METADATA,
  Inklings,
  Journal,
  JournalMetadata,
} from "../../db/api/types";

// REDUX
import { startDetermineJournalingPhase } from "../journalingPhaseSlice";
import { startHydrateJournalMetadata } from "../journalMetadataSlice";
import { startHydrateJournal } from "../journalSlice";
import { startHydrateNewInklings } from "../newInklingsSlice";

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
  isNew?: boolean;
};
export const startSetActiveJournalId = createAsyncThunk<
  boolean,
  StartSetActiveJournalIdArgs,
  ThunkConfig
>(
  "journalingPhase/startSetActiveJournalId",
  async ({ journalId = null, isNew = false }, thunkAPI) => {
    // 1. No Journal id provided, must be StartUp
    // Get last used Journal id
    if (journalId === null) journalId = await dbDriver.getLastUsedJournalId();
    if (journalId === null) return false;

    // 2. Set activeJournalId in Redux
    thunkAPI.dispatch(setActiveJournalId(journalId));
    // 3. Set lastUsedJournalId in Db
    await dbDriver.setLastUsedJournalId(journalId);

    // 4. Get Journal metadata if not provided (default Journal Metadata might be provided if Journal was just created)
    const metadata: JournalMetadata = isNew
      ? DEFAULT_JOURNAL_METADATA
      : await dbDriver.getJournalMetadata(journalId);
    // 5. Set Journal metadata in Redux
    thunkAPI.dispatch(startHydrateJournalMetadata(metadata));

    // 6. Get committed Inklings from Db
    const committedInklings: Inklings = isNew
      ? []
      : await dbDriver.getInklings(journalId);
    // 7. Hydrate committed Inklings if any
    if (committedInklings.length > 0)
      thunkAPI.dispatch(startHydrateNewInklings(committedInklings));

    // 8. Get committed Inklings from Db
    const journal: Journal = isNew ? [] : await dbDriver.getJournal(journalId);
    // 9. Hydrate committed Inklings if any
    if (journal.length > 0) thunkAPI.dispatch(startHydrateJournal(journal));

    // 10. Set Journaling Phase
    // - 'null' journalId (bcus no 'lastUsedJournalId' and therefore no existing journals) will prompt CreateJournal phase
    // - Having committedInklings will prompt Reflecting phase, else Inkling phase
    thunkAPI.dispatch(
      startDetermineJournalingPhase({
        journalId,
        hasCommittedInklings: committedInklings.length > 0,
      })
    );

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
