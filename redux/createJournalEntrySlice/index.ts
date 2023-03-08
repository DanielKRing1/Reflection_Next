// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { Inkling } from "../../db/api/types";

// TYPES
import { Dict } from "../../types/data";
import { setJournalingPhase } from "../journalingPhaseSlice";
import { JournalingPhase } from "../journalingPhaseSlice/types";
import { addJournalEntry } from "../journalSlice";
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

export const startCreateJournalEntry = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>(
  "createJournalEntrySlice/startCreateJournalEntry",
  async (undef, thunkAPI) => {
    const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
    const { newInklings } = thunkAPI.getState().newInklingsSlice;
    const { selectedThoughtIds, selectedInklingIds } =
      thunkAPI.getState().createJournalEntrySlice;

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

    // 3. Add Journal Entry to Db
    await dbDriver.createJournalEntry(
      activeJournalId,
      discardedThoughtIds,
      Object.keys(selectedThoughtIds),
      Object.keys(selectedInklingIds),
      discardedInklingIds
    );

    // 4. Add Journal Entry to Redux
    thunkAPI.dispatch(addJournalEntry);

    // 5. Clear new Inklings from Redux (They were already cleared from Db when adding the new Journal Entry)
    thunkAPI.dispatch(clearInklings());

    // 6. Manually set Journaling Phase to Inkling
    thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Inkling));

    return true;
  }
);

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
      startCreateJournalEntry.fulfilled,
      (state, action: StartNewJournalEntryFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startCreateJournalEntry.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addThoughtId, addInklingId, rmThoughtId, rmInklingId } =
  NewJournalEntrySlice.actions;

export default NewJournalEntrySlice.reducer;
