// THIRD PARTY
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TYPES
import { ThoughtsDict } from "../../db/api/types";

// INITIAL STATE

export interface JournalThoughtsDictState {
  thoughtsDict: ThoughtsDict;
}

const initialState: JournalThoughtsDictState = {
  thoughtsDict: {},
};

// ACTION TYPES

type SetThoughtsDict = PayloadAction<ThoughtsDict>;

// SLICE

export const JournalThoughtsDictSlice = createSlice({
  name: "journalThoughtsDict",
  initialState,
  reducers: {
    setThoughtsDict: (
      state: JournalThoughtsDictState,
      action: SetThoughtsDict
    ) => {
      state.thoughtsDict = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { setThoughtsDict } = JournalThoughtsDictSlice.actions;

export default JournalThoughtsDictSlice.reducer;
