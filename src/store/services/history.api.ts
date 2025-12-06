import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IHistoryData } from "../../types/history.types.ts";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getHistory: build.query<IHistoryData, void>({
      query: () => "history",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetHistoryQuery } = historyApi;
