import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WaitModeType } from "../../types/waitMode.types.ts";

export const waitModeApi = createApi({
  reducerPath: "waitModeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getWaitModeData: build.query<WaitModeType[], void>({
      query: () => "wait-mode",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetWaitModeDataQuery } = waitModeApi;
