import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types";
import { Dict } from "../../types/data";
import { Inkling, Inklings } from "../../db/api/types";

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

export const startCommitNewInklings = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startCommitNewInklings", async (undef, thunkAPI) => {
  const { newInklings } = thunkAPI.getState().newInklingsSlice;

  thunkAPI.dispatch(reset());

  return true;
});

export const startClearIdeas = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startClearIdeas", async (undef, thunkAPI) => {
  const { newInklings } = thunkAPI.getState().newInklingsSlice;

  thunkAPI.dispatch(reset());

  return true;
});

// ACTION TYPES

type AddEntryAction = PayloadAction<Inkling>;
type EditEntryAction = PayloadAction<{
  index: number;
  data: string;
}>;
type RmEntryAction = PayloadAction<number>;
type ResetAction = PayloadAction<void>;
type StartEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const NewInklingsSlice = createSlice({
  name: "newInklings",
  initialState,
  reducers: {
    addEntry: (state: NewInklingsState, action: AddEntryAction) => {
      // Add new entry with empty data
      state.newInklings.push(action.payload);

      // Mark new entry as empty
      const { id } = action.payload;
      state.emptyEntries[id] = true;
    },
    editEntry: (state: NewInklingsState, action: EditEntryAction) => {
      const { index, data } = action.payload;
      // Out of bounds
      if (index >= state.newInklings.length) return;
      const { id } = state.newInklings[index];

      // Edit entry data
      state.newInklings[index].data = data;

      // Was an empty entry but is no longer
      if (state.emptyEntries[id] && data !== "") delete state.emptyEntries[id];
      // Was not an empty entry but is now
      else if (!state.emptyEntries[id] && data === "")
        state.emptyEntries[id] = true;
    },
    rmEntry: (state: NewInklingsState, action: RmEntryAction) => {
      const index: number = action.payload;
      // Out of bounds
      if (index >= state.newInklings.length) return;
      // Cache id before removing entry
      const { id } = state.newInklings[index];

      // Remove entry
      state.newInklings.splice(index, 1);
      // Remove as empty entry
      delete state.emptyEntries[id];
    },
    reset: (state: NewInklingsState, action: ResetAction) => {
      state.newInklings = [];
      state.emptyEntries = {};
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startNewInklingsAction.fulfilled,
      (state, action: StartEntriesFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startNewInklingsAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addEntry, rmEntry, editEntry, reset } = NewInklingsSlice.actions;

export default NewInklingsSlice.reducer;
