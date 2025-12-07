import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WaitModeType } from "../../types/waitMode.types.ts";

interface WaitModeState {
  isActive: boolean;
  data: WaitModeType[];
}

const initialState: WaitModeState = {
  isActive: false,
  data: [],
};

const isWaitModeSlice = createSlice({
  name: "isWaitMode",
  initialState,
  reducers: {
    startWaitMode(state, action: PayloadAction<WaitModeType[]>) {
      state.isActive = true;
      state.data = action.payload;
    },
    stopWaitMode(state) {
      state.isActive = false;
      state.data = [];
    },
  },
});

export const { startWaitMode, stopWaitMode } = isWaitModeSlice.actions;

export default isWaitModeSlice.reducer;
