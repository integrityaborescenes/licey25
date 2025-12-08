import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SliderState {
  currentSlide: number;
}

const initialState: SliderState = {
  currentSlide: 0,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSlide(state, action: PayloadAction<number>) {
      state.currentSlide = action.payload;
    },
  },
});

export const { setSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
