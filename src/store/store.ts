import { configureStore } from "@reduxjs/toolkit";
import { mainScreenDataApi } from "./services/mainScreenData.api.ts";
import isModalOpenSlice from "./slices/isModalOpenSlice.ts";

export const store = configureStore({
  reducer: {
    [mainScreenDataApi.reducerPath]: mainScreenDataApi.reducer,
    isModalOpen: isModalOpenSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainScreenDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
