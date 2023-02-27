import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types";
import { DataWId } from "../../types/data";

// INITIAL STATE

export interface NewEntriesState {
  newEntries: DataWId<string>[];
}

const initialState: NewEntriesState = {
  newEntries: [],
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
  newEntry: DataWId<string>;
}>;
type RmEntryAction = PayloadAction<number>;
type StartEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const NewEntriesSlice = createSlice({
  name: "newEntries",
  initialState,
  reducers: {
    addEntry: (state: NewEntriesState, action: AddEntryAction) => {
      state.newEntries.push(action.payload);
    },
    editEntry: (state: NewEntriesState, action: EditEntryAction) => {
      const { index, newEntry } = action.payload;
      state.newEntries[index] = newEntry;
    },
    rmEntry: (state: NewEntriesState, action: RmEntryAction) => {
      state.newEntries.splice(action.payload, 1);
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
export const { addEntry, rmEntry, editEntry } = NewEntriesSlice.actions;

export default NewEntriesSlice.reducer;
