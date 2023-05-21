// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB

// TYPES
import { ThunkConfig } from "../../types";
import { Dict } from "../../../types/data";
import { Inkling, Inklings } from "../../../types/db";
import dbDriver from "../../../db/api";
import { setJournalingPhase } from "../../journalingPhaseSlice";
import { JournalingPhase } from "../../journalingPhaseSlice/types";

// INITIAL STATE

export interface NewInklingsState {
    // [ { id: 'id123', data: 'Hello' }, ... ]
    newInklings: Inklings;
    // { id123: true, ... }
    emptyInklings: Dict<boolean>;

    // index
    focusedInklingIndex: number;
}

const initialState: NewInklingsState = {
    newInklings: [],
    emptyInklings: {},

    focusedInklingIndex: -1,
};

// ASYNC THUNKS

// This is called from 'startSetActiveJournalId'
/**
 * Pass Inklings to hydrate with
 *    or 'undefined' to hydrate from Db
 */
export const startHydrateNewInklings = createAsyncThunk<
    boolean,
    Inklings | undefined,
    ThunkConfig
>(
    "newInklingsSlice/startHydrateNewInklings",
    async (inklings: Inklings | undefined, thunkAPI) => {
        thunkAPI.dispatch(clearInklings());

        // 1. No Inklings provided, hydrate from Db
        if (inklings === undefined) {
            const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
            inklings = await dbDriver.getInklings(activeJournalId);
        }

        // 2. Add each Inkling
        // Add individually, so 'addInkling' action can check for empty Inklings
        inklings.forEach((inkling: Inkling) =>
            thunkAPI.dispatch(addInkling(inkling))
        );

        return true;
    }
);

export const startCommitNewInklings = createAsyncThunk<
    boolean,
    undefined,
    ThunkConfig
>("newInklingsSlice/startCommitNewInklings", async (undef, thunkAPI) => {
    const { activeJournalId } = thunkAPI.getState().activeJournalSlice;
    const { newInklings } = thunkAPI.getState().newInklingsSlice;

    // 1. Cache Inklings for Reflection phase
    // Keep Inklings in Redux, so they can be used during Reflection and to create a new Journal Entry
    await dbDriver.commitInklings(activeJournalId, newInklings);

    // 2. Manually set Journaling Phase to Reflecting
    thunkAPI.dispatch(setJournalingPhase(JournalingPhase.Reflecting));

    return true;
});

// ACTION TYPES

type AddInklingAction = PayloadAction<Inkling>;
type EditInklingAction = PayloadAction<{
    index: number;
    data: string;
}>;
type RmInklingAction = PayloadAction<number>;
type ResetAction = PayloadAction<void>;
type SetFocusedInklingAction = PayloadAction<number>;
type RmFocusedInklingAction = PayloadAction<void>;
type StartEntriesFulfilled = PayloadAction<boolean>;

// SLICE

export const NewInklingsSlice = createSlice({
    name: "newInklings",
    initialState,
    reducers: {
        addInkling: (state: NewInklingsState, action: AddInklingAction) => {
            // 1. Add new Inkling with empty data
            state.newInklings.push(action.payload);

            // 2. Check if new Inkling is empty
            const { timeId, text } = action.payload;
            if (text === "") state.emptyInklings[timeId] = true;

            // 3. Focus new Inkling
            state.focusedInklingIndex = state.newInklings.length - 1;
        },
        editInkling: (state: NewInklingsState, action: EditInklingAction) => {
            const { index, data } = action.payload;
            // Out of bounds
            if (index >= state.newInklings.length) return;

            // 1. Edit Inkling data
            const { timeId } = state.newInklings[index];
            state.newInklings[index].text = data;

            // Was an empty Inkling but is no longer
            if (state.emptyInklings[timeId] && data !== "")
                delete state.emptyInklings[timeId];
            // Was not an empty Inkling but is now
            else if (!state.emptyInklings[timeId] && data === "")
                state.emptyInklings[timeId] = true;
        },
        rmInkling: (state: NewInklingsState, action: RmInklingAction) => {
            const index: number = action.payload;
            // Out of bounds
            if (index >= state.newInklings.length) return;

            // 1. Cache id before removing Inkling
            const { timeId } = state.newInklings[index];

            // 2. Remove Inkling
            state.newInklings.splice(index, 1);
            // Remove as empty Inkling
            delete state.emptyInklings[timeId];

            // 3. Unfocus Inkling if was focused
            if (index === state.focusedInklingIndex)
                state.focusedInklingIndex = -1;
        },
        clearInklings: (state: NewInklingsState, action: ResetAction) => {
            state.newInklings = [];
            state.emptyInklings = {};
            state.focusedInklingIndex = -1;
        },
        setFocusedInkling: (
            state: NewInklingsState,
            action: SetFocusedInklingAction
        ) => {
            state.focusedInklingIndex = action.payload;
        },
        rmFocusedInkling: (
            state: NewInklingsState,
            action: RmFocusedInklingAction
        ) => {
            state.focusedInklingIndex = -1;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            startCommitNewInklings.fulfilled,
            (state, action: StartEntriesFulfilled) => {
                // Add user to the state array
            }
        );
        builder.addCase(startCommitNewInklings.rejected, (state, action) => {
            console.log(action.error.message);
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    addInkling,
    rmInkling,
    editInkling,
    clearInklings,
    setFocusedInkling,
    rmFocusedInkling,
} = NewInklingsSlice.actions;

export default NewInklingsSlice.reducer;
