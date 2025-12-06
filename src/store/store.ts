import { configureStore } from "@reduxjs/toolkit";
import { mainScreenDataApi } from "./services/mainScreenData.api.ts";
import isModalOpenSlice from "./slices/isModalOpenSlice.ts";
import { liceyDataApi } from "./services/lyceyData.api.ts";
import { archiveDataApi } from "./services/archiveData.api.ts";
import { archiveCategoriesApi } from "./services/archiveCategories.api.ts";
import { personApi } from "./services/personData.api.ts";
import { historyApi } from "./services/history.api.ts";

export const store = configureStore({
  reducer: {
    [mainScreenDataApi.reducerPath]: mainScreenDataApi.reducer,
    [liceyDataApi.reducerPath]: liceyDataApi.reducer,
    [archiveDataApi.reducerPath]: archiveDataApi.reducer,
    [archiveCategoriesApi.reducerPath]: archiveCategoriesApi.reducer,
    [personApi.reducerPath]: personApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    isModalOpen: isModalOpenSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainScreenDataApi.middleware)
      .concat(liceyDataApi.middleware)
      .concat(archiveDataApi.middleware)
      .concat(archiveCategoriesApi.middleware)
      .concat(personApi.middleware)
      .concat(historyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
