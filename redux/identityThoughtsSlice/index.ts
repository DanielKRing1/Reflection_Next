// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { Thought } from "../../db/api/types";

// TYPES
import { ThunkConfig } from "../types";

// INITIAL STATE

export interface IdentityThoughtsState {
  identityThoughts: Thought[];
}

const initialState: IdentityThoughtsState = {
  identityThoughts: [],
};

// ASYNC THUNKS

export const startHydrateIdentityThoughts = createAsyncThunk<
  boolean,
  Thought[] | undefined,
  ThunkConfig
>(
  "identityThoughtsSlice/startHydrateIdentityThoughts",
  async (identityThoughts: Thought[] | undefined, thunkAPI) => {
    // 1. No Journal Metadata provided, hydrate from Db
    if (identityThoughts === undefined) {
      const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
      const { thoughtsDict } = thunkAPI.getState().journalThoughtsDictSlice;
      identityThoughts = (
        await dbDriver.getCurrentIdentityIds(activeJournalId)
      ).map((id: string) => thoughtsDict[id]);
    }

    // 2. Set Journal Metadata
    thunkAPI.dispatch(setIdentityThoughts(identityThoughts));

    return true;
  }
);
// ACTION TYPES

type SetIdentityThoughtsAction = PayloadAction<Thought[]>;
type StartIdentityThoughtsFulfilled = PayloadAction<boolean>;

// SLICE

export const IdentityThoughtsSlice = createSlice({
  name: "identityThoughts",
  initialState,
  reducers: {
    setIdentityThoughts: (
      state: IdentityThoughtsState,
      action: SetIdentityThoughtsAction
    ) => {
      state.identityThoughts = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startHydrateIdentityThoughts.fulfilled,
      (state, action: StartIdentityThoughtsFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startHydrateIdentityThoughts.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIdentityThoughts } = IdentityThoughtsSlice.actions;

export default IdentityThoughtsSlice.reducer;
