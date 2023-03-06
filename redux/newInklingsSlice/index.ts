// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB

// TYPES
import { ThunkConfig } from "../types";
import { Dict } from "../../types/data";
import { Inkling, Inklings } from "../../db/api/types";
import dbDriver from "../../db/api";
import { setJournalingPhase } from "../journalingPhaseSlice";
import { JournalingPhase } from "../journalingPhaseSlice/types";

// INITIAL STATE

export interface NewInklingsState {
  // [ { id: 'id123', data: 'Hello' }, ... ]
  newInklings: Inklings;
  // { id123: true, ... }
  emptyEntries: Dict<boolean>;
}

const initialState: NewInklingsState = {
  newInklings: [],
  emptyEntries: {},
};

// ASYNC THUNKS

// This is called from 'startDetermineJournalingPhase' when starting the app
/**
 * Pass inklings to hydrate with
 *    of 'undefined' to hydrate from Db
 */
export const startHydrateNewInklings = createAsyncThunk<
  boolean,
  Inklings | undefined,
  ThunkConfig
>(
  "newInklingsSlice/startHydrateNewInklings",
  async (inklings: Inklings | undefined, thunkAPI) => {
    // 1. No Inklings provided, hydrate from Db
    if (inklings === undefined) {
      const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
      inklings = await dbDriver.getInklings(activeJournalId);
    }

    // 2. Add each Inkling
    // Add individually, so 'addInkling' action can check for empty Inklings
    inklings.forEach((inkling: Inkling) =>
      thunkAPI.dispatch(addInkling(inkling))
    );

    return true;
  }
);

export const startCommitNewInklings = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("newInklingsSlice/startCommitNewInklings", async (undef, thunkAPI) => {
  const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
  const { newInklings } = thunkAPI.getState().newInklingsSlice;

  // 1. Cache Inklings for Reflection
  // Keep Inklings in Redux, so they can be used during Reflection and to create a new Journal Entry
  await dbDriver.commitInklings(activeJournalId, newInklings);

  // 2. Manually set Journaling Phase to Reflecting
  thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Reflecting));

  return true;
});

// ACTION TYPES

type AddInklingAction = PayloadAction<Inkling>;
type EditInklingAction = PayloadAction<{
  index: number;
  data: string;
}>;
type RmInklingAction = PayloadAction<number>;
type ResetAction = PayloadAction<void>;
type StartEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const NewInklingsSlice = createSlice({
  name: "newInklings",
  initialState,
  reducers: {
    addInkling: (state: NewInklingsState, action: AddInklingAction) => {
      // Add new Inkling with empty data
      state.newInklings.push(action.payload);

      // Check if new Inkling is empty
      const { id, data } = action.payload;
      if (data === "") state.emptyEntries[id] = true;
    },
    editInkling: (state: NewInklingsState, action: EditInklingAction) => {
      const { index, data } = action.payload;
      // Out of bounds
      if (index >= state.newInklings.length) return;

      // 1. Edit Inkling data
      const { id } = state.newInklings[index];
      state.newInklings[index].data = data;

      // Was an empty Inkling but is no longer
      if (state.emptyEntries[id] && data !== "") delete state.emptyEntries[id];
      // Was not an empty Inkling but is now
      else if (!state.emptyEntries[id] && data === "")
        state.emptyEntries[id] = true;
    },
    rmInkling: (state: NewInklingsState, action: RmInklingAction) => {
      const index: number = action.payload;
      // Out of bounds
      if (index >= state.newInklings.length) return;

      // 1. Cache id before removing Inkling
      const { id } = state.newInklings[index];

      // 2. Remove Inkling
      state.newInklings.splice(index, 1);
      // Remove as empty Inkling
      delete state.emptyEntries[id];
    },
    clearInklings: (state: NewInklingsState, action: ResetAction) => {
      state.newInklings = [];
      state.emptyEntries = {};
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startCommitNewInklings.fulfilled,
      (state, action: StartEntriesFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startCommitNewInklings.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addInkling, rmInkling, editInkling, clearInklings } =
  NewInklingsSlice.actions;

export default NewInklingsSlice.reducer;
