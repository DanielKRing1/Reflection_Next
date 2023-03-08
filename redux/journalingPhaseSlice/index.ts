// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// TYPES
import { ThunkConfig } from "../types";
import { JournalingPhase } from "./types";

// INITIAL STATE

export interface JournalingPhaseState {
  journalingPhase: JournalingPhase;
}

const initialState: JournalingPhaseState = {
  journalingPhase: JournalingPhase.StartUp,
};

// ASYNC THUNKS

// This method is only called by 'startSetActiveJournalId'
// This method is called in response to the active Journal changing
export const startDetermineJournalingPhase = createAsyncThunk<
  boolean,
  { journalId: string | null; hasCommittedInklings?: boolean },
  ThunkConfig
>(
  "journalingPhase/startDetermineJournalingPhase",
  // The journalId that is currently being dispatched
  async ({ journalId = null, hasCommittedInklings = false }, thunkAPI) => {
    // 1. Provided journalId is null, so no journals exist
    if (journalId === null)
      thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Create_Journal));
    // 2. Journal exists
    else {
      // 2.1. If no committed Inklings, then still Inkling phase
      if (!hasCommittedInklings)
        thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Inkling));
      // 2.2. Else Reflecting phase
      else thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Reflecting));
    }

    return true;
  }
);

// ACTION TYPES

type SetJournalingPhase = PayloadAction<JournalingPhase>;
type StartJournalingPhaseFulfilled = PayloadAction<boolean>;

// SLICE

export const JournalingPhaseSlice = createSlice({
  name: "journalingPhase",
  initialState,
  reducers: {
    setJournalingPhase: (
      state: JournalingPhaseState,
      action: SetJournalingPhase
    ) => {
      state.journalingPhase = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startDetermineJournalingPhase.fulfilled,
      (state, action: StartJournalingPhaseFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startDetermineJournalingPhase.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setJournalingPhase } = JournalingPhaseSlice.actions;

export default JournalingPhaseSlice.reducer;
