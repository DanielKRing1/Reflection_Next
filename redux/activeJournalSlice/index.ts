// THIRD PARTY
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// DB
import dbDriver from "../../db/api";
import {
    DEFAULT_JOURNAL_METADATA,
    Inklings,
    Journal,
    JournalMetadata,
    Thought,
    ThoughtsDict,
} from "../../types/db";
import { startHydrateIdentityThoughtIds } from "../db/identityThoughtsSlice";

// REDUX
import { startDetermineJournalingPhase } from "../journalingPhaseSlice";
import { startHydrateJournalMetadata } from "../journalMetadataSlice";
import { startHydrateJournal } from "../db/journalSlice";
import { startHydrateThoughtsDict } from "../db/journalThoughtsDictSlice";
import { startHydrateNewInklings } from "../db/newInklingsSlice";

// TYPES
import { ThunkConfig } from "../types";

/**
 * FLOW OF EVENTS
 *
 * On StartUp: Call StartUp action -> Set activeJournalId to Db.lastUsedJournalId -> Hydrate committed Inklings + set Journaling Phase
 *                                                                               /
 * User Changes Journal ------------> Set activeJournalId to new journalId -----
 */

// INITIAL STATE

export interface ActiveJournalState {
    // Name of selected/active journal
    activeJournalId: string;
}

const initialState: ActiveJournalState = {
    activeJournalId: "",
};

// THUNKS

/**
 * Pass 'journalId' as null to initiate app with 'lastUsedJournalId'
 * Fetches metadata from Db if not provided
 *
 * Sets 'activeJournalId'
 * Sets 'journalMetadata'
 * Initiates determining Journaling Phase
 */
type StartSetActiveJournalIdArgs = {
    journalId: string | null;
    isNew?: boolean;
};
export const startSetActiveJournalId = createAsyncThunk<
    boolean,
    StartSetActiveJournalIdArgs,
    ThunkConfig
>(
    "journalingPhase/startSetActiveJournalId",
    async ({ journalId = null, isNew = false }, thunkAPI) => {
        // 1. No Journal id provided, must be StartUp
        // Get last used Journal id
        if (journalId === null)
            journalId = await dbDriver.getLastUsedJournalId();

        let committedInklings: Inklings = [];
        if (journalId !== null) {
            // 2. Set activeJournalId in Redux
            thunkAPI.dispatch(setActiveJournalId(journalId));
            // 3. Set lastUsedJournalId in Db
            await dbDriver.setLastUsedJournalId(journalId);

            // 4. Get Journal metadata if not provided (default Journal Metadata might be provided if Journal was just created)
            const metadata: JournalMetadata | undefined = isNew
                ? DEFAULT_JOURNAL_METADATA
                : undefined;
            // 5. Set Journal metadata in Redux
            thunkAPI.dispatch(startHydrateJournalMetadata(metadata));

            // 6. Get committed Inklings from Db
            committedInklings = isNew
                ? []
                : await dbDriver.getInklings(journalId);
            // 7. Hydrate committed Inklings if any
            thunkAPI.dispatch(startHydrateNewInklings(committedInklings));

            // 8. Hydrate committed Inklings if any
            const journal: Journal | undefined = isNew ? [] : undefined;
            thunkAPI.dispatch(startHydrateJournal(journal));

            // 9. Hydrate committed Inklings if any
            const identityThoughtIds: string[] | undefined = isNew
                ? []
                : undefined;
            thunkAPI.dispatch(
                startHydrateIdentityThoughtIds(identityThoughtIds)
            );

            // 10. Hydrate ThoughtsDict if any
            const thoughtsDict: ThoughtsDict | undefined = isNew
                ? {}
                : undefined;
            thunkAPI.dispatch(startHydrateThoughtsDict(thoughtsDict));
        }

        // 12. Set Journaling Phase
        // - 'null' journalId (bcus no 'lastUsedJournalId' and therefore no existing journals) will prompt CreateJournal phase
        // - Having committedInklings will prompt Reflecting phase, else Inkling phase
        thunkAPI.dispatch(
            startDetermineJournalingPhase({
                journalId,
                hasCommittedInklings: committedInklings.length > 0,
            })
        );

        return true;
    }
);

// ACTION TYPES

type SetActiveJournalIdAction = PayloadAction<string>;
type StartSetActiveJournalId = PayloadAction<boolean>;

// SLICE

export const ActiveJournalSlice = createSlice({
    name: "activeJournal",
    initialState,
    reducers: {
        setActiveJournalId: (
            state: ActiveJournalState,
            action: SetActiveJournalIdAction
        ) => {
            state.activeJournalId = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            startSetActiveJournalId.fulfilled,
            (state, action: StartSetActiveJournalId) => {
                // Add user to the state array
            }
        );
        builder.addCase(startSetActiveJournalId.rejected, (state, action) => {
            console.log(action.error.message);
        });
    },
});

// Only callable from 'startSetActiveJournalId'
const { setActiveJournalId } = ActiveJournalSlice.actions;

export default ActiveJournalSlice.reducer;
