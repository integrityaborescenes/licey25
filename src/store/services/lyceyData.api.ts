import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ILyceyData } from "../../types/lyceyData.types.ts";

export const liceyDataApi = createApi({
  reducerPath: "liceyDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getLiceyData: build.query<ILyceyData[], void>({
      query: () => "licey",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetLiceyDataQuery } = liceyDataApi;
