// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";

// REDUX
import { startSetActiveJournalId } from "../activeJournalSlice";

// TYPES
import { ThunkConfig } from "../types";

// INITIAL STATE

export interface CreateJournalState {
  newJournalId: string;
}

const initialState: CreateJournalState = {
  newJournalId: "",
};

// ASYNC THUNKS

export const startCreateJournal = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("createJournal/startCreateJournal", async (undef, thunkAPI) => {
  const { newJournalId } = thunkAPI.getState().createJournalSlice;

  // Short-circuit if no newJournalId
  if (newJournalId === "") return;

  // 1. Create Journal in Db
  await dbDriver.createJournal(newJournalId);

  // 2. Switch active Journal
  thunkAPI.dispatch(startSetActiveJournalId(newJournalId));

  // 3. Clear newJournalId
  thunkAPI.dispatch(clearNewJournalId());

  return true;
});

// ACTION TYPES

type SetNewJournalIdAction = PayloadAction<string>;
type StartCreateJournalFulfilled = PayloadAction<boolean>;

// SLICE

export const CreateJournalSlice = createSlice({
  name: "createJournal",
  initialState,
  reducers: {
    setNewJournalId: (
      state: CreateJournalState,
      action: SetNewJournalIdAction
    ) => {
      state.newJournalId = action.payload;
    },
    clearNewJournalId: (state: CreateJournalState) => {
      state.newJournalId = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startCreateJournal.fulfilled,
      (state, action: StartCreateJournalFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startCreateJournal.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
const { clearNewJournalId } = CreateJournalSlice.actions;
export const { setNewJournalId } = CreateJournalSlice.actions;

export default CreateJournalSlice.reducer;
