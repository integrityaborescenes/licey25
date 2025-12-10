import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WaitModeSettingsType } from "../../types/waitMode.types.ts";
import { API_URL } from "../../config.ts";

export const waitModeApi2 = createApi({
  reducerPath: "waitModeApi2",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getWaitModeSetting: build.query<WaitModeSettingsType, void>({
      query: () => "wait_mode",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetWaitModeSettingQuery } = waitModeApi2;
