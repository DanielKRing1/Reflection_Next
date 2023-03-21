// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { Inkling, ThoughtsDict } from "../../db/api/types";

// TYPES
import { Dict } from "../../types/data";
import { setIdentityThoughtIds } from "../db/identityThoughtsSlice";
import { setJournalingPhase } from "../journalingPhaseSlice";
import { JournalingPhase } from "../journalingPhaseSlice/types";
import { addJournalEntry } from "../db/journalSlice";
import { addThoughtsDict } from "../db/journalThoughtsDictSlice";
import { clearInklings } from "../db/newInklingsSlice";
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
    const time: number = Date.now();
    await dbDriver.createJournalEntry(
      activeJournalId,
      time,
      discardedThoughtIds,
      Object.keys(selectedThoughtIds),
      Object.keys(selectedInklingIds),
      discardedInklingIds
    );

    // 4. Add Journal Entry to Redux
    thunkAPI.dispatch(addJournalEntry);

    // 5. Update ThoughtsDict in Redux
    thunkAPI.dispatch(
      addThoughtsDict(
        newInklings.reduce<ThoughtsDict>((acc, cur) => {
          acc[cur.id] = {
            ...cur,
            time,
          };
          return acc;
        }, {})
      )
    );

    // 6. Update Identity Thoughts in Redux
    thunkAPI.dispatch(
      setIdentityThoughtIds([
        ...Object.keys(selectedThoughtIds),
        ...Object.keys(selectedInklingIds),
      ])
    );

    // 7. Clear new Inklings from Redux (They were already cleared from Db when adding the new Journal Entry)
    thunkAPI.dispatch(clearInklings());

    // 8. Clear selected Reflection ids
    thunkAPI.dispatch(clear());

    // 9. Manually set Journaling Phase to Inkling
    thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Inkling));

    return true;
  }
);

// ACTION TYPES

type AddIdAction = PayloadAction<string>;
type RmIdAction = PayloadAction<string>;
type ClearAction = PayloadAction<void>;
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
    clear: (state: NewJournalEntryState, action: ClearAction) => {
      state.selectedThoughtIds = {};
      state.selectedInklingIds = {};
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
const { clear } = NewJournalEntrySlice.actions;
export const { addThoughtId, addInklingId, rmThoughtId, rmInklingId } =
  NewJournalEntrySlice.actions;

export default NewJournalEntrySlice.reducer;
