// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../../db/api";

// TYPES
import { ThunkConfig } from "../../types";

// INITIAL STATE

export interface IdentityThoughtsState {
  identityThoughtIds: string[];
}

const initialState: IdentityThoughtsState = {
  identityThoughtIds: [],
};

// ASYNC THUNKS

export const startHydrateIdentityThoughtIds = createAsyncThunk<
  boolean,
  string[] | undefined,
  ThunkConfig
>(
  "identityThoughtsSlice/startHydrateIdentityThoughtIds",
  async (identityThoughtIds: string[] | undefined, thunkAPI) => {
    // 1. No Journal Metadata provided, hydrate from Db
    if (identityThoughtIds === undefined) {
      const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
      identityThoughtIds = await dbDriver.getCurrentIdentityIds(
        activeJournalId
      );
    }

    // 2. Set Journal Metadata
    thunkAPI.dispatch(setIdentityThoughtIds(identityThoughtIds));

    return true;
  }
);
// ACTION TYPES

type SetIdentityThoughtIdsAction = PayloadAction<string[]>;
type StartIdentityThoughtsFulfilled = PayloadAction<boolean>;

// SLICE

export const IdentityThoughtsSlice = createSlice({
  name: "identityThoughts",
  initialState,
  reducers: {
    setIdentityThoughtIds: (
      state: IdentityThoughtsState,
      action: SetIdentityThoughtIdsAction
    ) => {
      state.identityThoughtIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startHydrateIdentityThoughtIds.fulfilled,
      (state, action: StartIdentityThoughtsFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(
      startHydrateIdentityThoughtIds.rejected,
      (state, action) => {
        console.log(action.error.message);
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { setIdentityThoughtIds } = IdentityThoughtsSlice.actions;

export default IdentityThoughtsSlice.reducer;
