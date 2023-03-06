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
