// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import { JournalMetadata } from "../../types/db";

// REDUX
import { startSetActiveJournalId } from "../activeJournalSlice";

// TYPES
import { ThunkConfig } from "../types";

// INITIAL STATE

export interface CreateJournalState {
    newJournalName: string;
}

const initialState: CreateJournalState = {
    newJournalName: "",
};

// ASYNC THUNKS

export const startCreateJournal = createAsyncThunk<
    boolean,
    undefined,
    ThunkConfig
>("createJournal/startCreateJournal", async (undef, thunkAPI) => {
    const { newJournalName } = thunkAPI.getState().createJournalSlice;

    // Short-circuit if no newJournalName
    if (newJournalName === "") return;

    // 1. Create Journal in Db
    const { id, metadata } = await dbDriver.createJournal(newJournalName);

    // 2. Switch active Journal
    thunkAPI.dispatch(startSetActiveJournalId({ journalId: id, isNew: true }));

    // 3. Clear newJournalName
    thunkAPI.dispatch(clearNewJournalName());

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
            state.newJournalName = action.payload;
        },
        clearNewJournalName: (state: CreateJournalState) => {
            state.newJournalName = "";
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
const { clearNewJournalName } = CreateJournalSlice.actions;
export const { setNewJournalId } = CreateJournalSlice.actions;

export default CreateJournalSlice.reducer;
