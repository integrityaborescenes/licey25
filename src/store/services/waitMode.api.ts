import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WaitModeType } from "../../types/waitMode.types.ts";
import { API_URL } from "../../config.ts";

export const waitModeApi = createApi({
  reducerPath: "waitModeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getWaitModeData: build.query<WaitModeType[], void>({
      query: () => "wait-mode",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetWaitModeDataQuery } = waitModeApi;
