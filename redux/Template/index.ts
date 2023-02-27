import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types";

// INITIAL STATE

export interface TemplateState {
  value: any;
}

const initialState: TemplateState = {
  value: "",
};

// ASYNC THUNKS

export const startTemplateAction = createAsyncThunk<
  boolean,
  undefined,
  ThunkConfig
>("template/startTemplateAction", async (undef, thunkAPI) => {
  // const {} = thunkAPI.getState().slice;

  // thunkAPI.dispatch(something());

  return true;
});

// ACTION TYPES

type TemplateAction = PayloadAction<any>;
type StartTemplateFulfilled = PayloadAction<boolean>;

// SLICE

export const TemplateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    templateAction: (state: TemplateState, action: TemplateAction) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      startTemplateAction.fulfilled,
      (state, action: StartTemplateFulfilled) => {
        // Add user to the state array
      }
    );
    builder.addCase(startTemplateAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { templateAction } = TemplateSlice.actions;

export default TemplateSlice.reducer;
