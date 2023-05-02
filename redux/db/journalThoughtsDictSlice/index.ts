// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dbDriver from "../../../db/api";

// TYPES
import { ThoughtsDict } from "../../../db/api/types";
import { ThunkConfig } from "../../types";

// INITIAL STATE

export interface JournalThoughtsDictState {
    thoughtsDict: ThoughtsDict;
}

const initialState: JournalThoughtsDictState = {
    thoughtsDict: {},
};

// THUNKS

// This is called from 'startSetActiveJournalId' when starting the app
/**
 * Pass Journal to hydrate with
 *    or 'undefined' to hydrate from Db
 */
export const startHydrateThoughtsDict = createAsyncThunk<
    boolean,
    ThoughtsDict | undefined,
    ThunkConfig
>(
    "journalThoughtsDictSlice/startHydrateThoughtsDict",
    async (thoughtsDict, thunkAPI) => {
        // 1. No ThoughtsDict provided, hydrate from Db
        if (thoughtsDict === undefined) {
            const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
            thoughtsDict = await dbDriver.getThoughtsDict(activeJournalId);
        }

        // 2. Set ThoughtsDict in Redux
        thunkAPI.dispatch(setThoughtsDict(thoughtsDict));

        return true;
    }
);

// ACTION TYPES

type SetThoughtsDict = PayloadAction<ThoughtsDict>;
type AddThoughtsDict = PayloadAction<ThoughtsDict>;

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

        addThoughtsDict: (
            state: JournalThoughtsDictState,
            action: AddThoughtsDict
        ) => {
            state.thoughtsDict = {
                ...state.thoughtsDict,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
const { setThoughtsDict } = JournalThoughtsDictSlice.actions;
export const { addThoughtsDict } = JournalThoughtsDictSlice.actions;

export default JournalThoughtsDictSlice.reducer;
