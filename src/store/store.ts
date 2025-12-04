import { configureStore } from "@reduxjs/toolkit";
import { mainScreenDataApi } from "./services/mainScreenData.api.ts";

export const store = configureStore({
  reducer: {
    [mainScreenDataApi.reducerPath]: mainScreenDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainScreenDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
