// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { Inkling } from "../../db/api/types";

// TYPES
import { Dict } from "../../types/data";
import { clearInklings } from "../newInklingsSlice";
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

export const startAddJournalEntry = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("newJournalEntrySlice/startAddJournalEntry", async (undef, thunkAPI) => {
  const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
  const { newInklings } = thunkAPI.getState().newInklingsSlice;
  const { selectedThoughtIds, selectedInklingIds } =
    thunkAPI.getState().newJournalEntrySlice;

  // 1. Get discarded Thoughts
  const currentIdentityIds: string[] = await dbDriver.getCurrentIdentityIds(
    activeJournalId
  );
  const discardedThoughtIds: string[] = currentIdentityIds.filter(
    (id) => !selectedThoughtIds[id]
  );

  // 2. Get discarded Inklings
  const discardedInklingIds: string[] = newInklings
    .filter(({ id }: Inkling) => !selectedInklingIds[id])
    .map(({ id }: Inkling) => id);

  // 3. Add Journal Entry
  await dbDriver.addJournalEntry(
    activeJournalId,
    discardedThoughtIds,
    Object.keys(selectedThoughtIds),
    Object.keys(selectedInklingIds),
    discardedInklingIds
  );

  // 4. Clear new Inklings
  thunkAPI.dispatch(clearInklings());

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
      startAddJournalEntry.fulfilled,
      (state, action: StartNewJournalEntryFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startAddJournalEntry.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addThoughtId, addInklingId, rmThoughtId, rmInklingId } =
  NewJournalEntrySlice.actions;

export default NewJournalEntrySlice.reducer;
