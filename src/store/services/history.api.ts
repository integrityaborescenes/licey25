import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IHistoryData } from "../../types/history.types.ts";
import { API_URL } from "../../config.ts";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getHistory: build.query<IHistoryData, void>({
      query: () => "history",
      transformResponse: (response: IHistoryData[]) => response[0],
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetHistoryQuery } = historyApi;
