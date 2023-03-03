import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dict } from "../../types/data";

import { ThunkConfig } from "../types";

// INITIAL STATE

export interface SelectedEntriesState {
  selectedThoughtIds: Dict<boolean>;
  selectedInklingIds: Dict<boolean>;
}

const initialState: SelectedEntriesState = {
  selectedThoughtIds: {},
  selectedInklingIds: {},
};

// ASYNC THUNKS

export const startSelectedEntriesAction = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startSelectedEntriesAction", async (undef, thunkAPI) => {
  // const {} = thunkAPI.getState().slice;

  // thunkAPI.dispatch(something());

  return true;
});

// ACTION TYPES

type AddIdAction = PayloadAction<string>;
type RmIdAction = PayloadAction<string>;
type StartSelectedEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const SelectedEntriesSlice = createSlice({
  name: "selectedEntries",
  initialState,
  reducers: {
    addId: (state: SelectedEntriesState, action: AddIdAction) => {
      state.selectedIds[action.payload] = true;
    },
    rmId: (state: SelectedEntriesState, action: RmIdAction) => {
      delete state.selectedIds[action.payload];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startSelectedEntriesAction.fulfilled,
      (state, action: StartSelectedEntriesFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startSelectedEntriesAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addId, rmId } = SelectedEntriesSlice.actions;

export default SelectedEntriesSlice.reducer;
