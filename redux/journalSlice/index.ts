import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dbDriver from "../../db/api";
import { Journal, JournalEntry } from "../../db/api/types";

import { ThunkConfig } from "../types";

// INITIAL STATE

export interface JournalState {
  journal: Journal;
}

const initialState: JournalState = {
  journal: [],
};

// ASYNC THUNKS

// This is called from 'startSetActiveJournalId' when starting the app
/**
 * Pass Journal to hydrate with
 *    or 'undefined' to hydrate from Db
 */
export const startHydrateJournal = createAsyncThunk<
  boolean,
  Journal | undefined,
  ThunkConfig
>("journalSlice/startHydrateJournal", async (journal, thunkAPI) => {
  // 1. No Journal provided, hydrate from Db
  if (journal === undefined) {
    const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
    journal = await dbDriver.getJournal(activeJournalId);
  }

  // 2. Set Journal Entries in Redux
  thunkAPI.dispatch(setJournal(journal));

  return true;
});

// ACTION TYPES

type SetJournalAction = PayloadAction<Journal>;
type AddJournalEntryAction = PayloadAction<JournalEntry>;
type StartJournalFulfilled = PayloadAction<boolean>;

// SLICE

export const journalSlice = createSlice({
  name: "journalSlice",
  initialState,
  reducers: {
    setJournal: (state: JournalState, action: SetJournalAction) => {
      state.journal = action.payload;
    },
    addJournalEntry: (state: JournalState, action: AddJournalEntryAction) => {
      state.journal.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startHydrateJournal.fulfilled,
      (state, action: StartJournalFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startHydrateJournal.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setJournal, addJournalEntry } = journalSlice.actions;

export default journalSlice.reducer;
