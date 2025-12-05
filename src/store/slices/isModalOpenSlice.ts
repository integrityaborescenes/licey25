import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModelState = {
  value: boolean;
  image?: string;
};

const initialState: ModelState = {
  value: false,
  image: undefined,
};

export const isModalOpenSlice = createSlice({
  name: "isModalOpen",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.value = true;
      state.image = action.payload;
    },
    closeModal: (state) => {
      state.value = false;
      state.image = undefined;
    },
  },
});

export const { openModal, closeModal } = isModalOpenSlice.actions;
export default isModalOpenSlice.reducer;
