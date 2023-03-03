import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dict } from "../../types/data";

import { ThunkConfig } from "../types";

// INITIAL STATE

export interface NewJournalEntryState {
  selectedThoughtIds: Dict<boolean>;
  selectedInklingIds: Dict<boolean>;
}

const initialState: NewJournalEntryState = {
  selectedThoughtIds: {},
  selectedInklingIds: {},
};

// ASYNC THUNKS

export const startNewJournalEntryAction = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startNewJournalEntryAction", async (undef, thunkAPI) => {
  // const {} = thunkAPI.getState().slice;

  // thunkAPI.dispatch(something());

  return true;
});

// ACTION TYPES

type AddIdAction = PayloadAction<string>;
type RmIdAction = PayloadAction<string>;
type StartNewJournalEntryFulfilled = PayloadAction<boolean>;

// SLICE

export const NewJournalEntrySlice = createSlice({
  name: "newJournalEntry",
  initialState,
  reducers: {
    addThoughtId: (state: NewJournalEntryState, action: AddIdAction) => {
      state.selectedThoughtIds[action.payload] = true;
    },
    addInklingId: (state: NewJournalEntryState, action: AddIdAction) => {
      state.selectedInklingIds[action.payload] = true;
    },
    rmThoughtId: (state: NewJournalEntryState, action: RmIdAction) => {
      delete state.selectedThoughtIds[action.payload];
    },
    rmInklingId: (state: NewJournalEntryState, action: RmIdAction) => {
      delete state.selectedInklingIds[action.payload];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startNewJournalEntryAction.fulfilled,
      (state, action: StartNewJournalEntryFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startNewJournalEntryAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addThoughtId, addInklingId, rmThoughtId, rmInklingId } =
  NewJournalEntrySlice.actions;

export default NewJournalEntrySlice.reducer;
