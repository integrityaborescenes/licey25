import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WaitModeSettingsType } from "../../types/waitMode.types.ts";

export const waitModeApi2 = createApi({
  reducerPath: "waitModeApi2",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getWaitModeSetting: build.query<WaitModeSettingsType, void>({
      query: () => "wait_mode",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetWaitModeSettingQuery } = waitModeApi2;
