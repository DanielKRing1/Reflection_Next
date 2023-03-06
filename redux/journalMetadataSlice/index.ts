import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dbDriver from "../../db/api";
import { DEFAULT_JOURNAL_METADATA, JournalMetadata } from "../../db/api/types";

import { ThunkConfig } from "../types";

// INITIAL STATE

export interface JournalMetadataState {
  metadata: JournalMetadata;
}

const initialState: JournalMetadataState = {
  metadata: DEFAULT_JOURNAL_METADATA,
};

// THUNKS

// This is called from 'startDetermineJournalingPhase' when starting the app
/**
 * Pass inklings to hydrate with
 *    of 'undefined' to hydrate from Db
 */
export const startHydrateJournalMetadata = createAsyncThunk<
  boolean,
  JournalMetadata | undefined,
  ThunkConfig
>(
  "journalMetadataSlice/startHydrateJournalMetadata",
  async (metadata: JournalMetadata | undefined, thunkAPI) => {
    // 1. No Journal Metadata provided, hydrate from Db
    if (metadata === undefined) {
      const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
      metadata = await dbDriver.getJournalMetadata(activeJournalId);
    }

    // 2. Set Journal Metadata
    thunkAPI.dispatch(setJournalMetadata(metadata));

    return true;
  }
);

export const startEditJournalMetadata = createAsyncThunk<
  boolean,
  Partial<JournalMetadata>,
  ThunkConfig
>(
  "journalMetadataSlice/startEditJournalMetadata",
  async (additionalMetadata, thunkAPI) => {
    const { metadata } = thunkAPI.getState().journalMetadataSlice;
    const { activeJournalId } = thunkAPI.getState().activeJournalSlice;

    // 1. Add Journal metadata to Db
    await dbDriver.addJournalMetadata(activeJournalId, additionalMetadata);

    // 2. Add Journal metadata to Redux
    thunkAPI.dispatch(
      setJournalMetadata({ ...metadata, ...additionalMetadata })
    );

    return true;
  }
);

// ACTION TYPES

type SetJournalMetadata = PayloadAction<JournalMetadata>;
type StartJournalMetadataFulfilled = PayloadAction<boolean>;

// SLICE

export const JournalMetadataSlice = createSlice({
  name: "journalMetadata",
  initialState,
  reducers: {
    setJournalMetadata: (
      state: JournalMetadataState,
      action: SetJournalMetadata
    ) => {
      state.metadata = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { setJournalMetadata } = JournalMetadataSlice.actions;

export default JournalMetadataSlice.reducer;
