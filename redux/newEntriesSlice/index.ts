import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types";
import { DataWId, Dict } from "../../types/data";

// INITIAL STATE

export interface NewEntriesState {
  // [ { id: 'id123', data: 'Hello' }, ... ]
  newEntries: DataWId<string>[];
  // { id123: true, ... }
  emptyEntries: Dict<boolean>;
}

const initialState: NewEntriesState = {
  newEntries: [],
  emptyEntries: {},
};

// ASYNC THUNKS

export const startNewEntriesAction = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startNewEntriesAction", async (undef, thunkAPI) => {
  // const {} = thunkAPI.getState().slice;

  // thunkAPI.dispatch(something());

  return true;
});

// ACTION TYPES

type AddEntryAction = PayloadAction<DataWId<string>>;
type EditEntryAction = PayloadAction<{
  index: number;
  data: string;
}>;
type RmEntryAction = PayloadAction<number>;
type ResetAction = PayloadAction<void>;
type StartEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const NewEntriesSlice = createSlice({
  name: "newEntries",
  initialState,
  reducers: {
    addEntry: (state: NewEntriesState, action: AddEntryAction) => {
      // Add new entry with empty data
      state.newEntries.push(action.payload);

      // Mark new entry as empty
      const { id } = action.payload;
      state.emptyEntries[id] = true;
    },
    editEntry: (state: NewEntriesState, action: EditEntryAction) => {
      const { index, data } = action.payload;
      // Out of bounds
      if (index >= state.newEntries.length) return;
      const { id } = state.newEntries[index];

      // Edit entry data
      state.newEntries[index].data = data;

      // Was an empty entry but is no longer
      if (state.emptyEntries[id] && data !== "") delete state.emptyEntries[id];
      // Was not an empty entry but is now
      else if (!state.emptyEntries[id] && data === "")
        state.emptyEntries[id] = true;
    },
    rmEntry: (state: NewEntriesState, action: RmEntryAction) => {
      const index: number = action.payload;
      // Out of bounds
      if (index >= state.newEntries.length) return;
      // Cache id before removing entry
      const { id } = state.newEntries[index];

      // Remove entry
      state.newEntries.splice(index, 1);
      // Remove as empty entry
      delete state.emptyEntries[id];
    },
    reset: (state: NewEntriesState, action: ResetAction) => {
      state.newEntries = [];
      state.emptyEntries = {};
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startNewEntriesAction.fulfilled,
      (state, action: StartEntriesFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startNewEntriesAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addEntry, rmEntry, editEntry, reset } = NewEntriesSlice.actions;

export default NewEntriesSlice.reducer;
