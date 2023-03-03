import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// INITIAL STATE

export interface ActiveJournalState {
  // Name of selected/active journal
  activeJournalId: string;
}

const initialState: ActiveJournalState = {
  activeJournalId: "",
};

// ACTION TYPES

type SetActiveJournalIdAction = PayloadAction<string>;

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
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { setActiveJournalId } = ActiveJournalSlice.actions;

export default ActiveJournalSlice.reducer;
