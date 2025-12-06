import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IFireDivisionData } from "../../types/fireDivisionData.types.ts";

export const fireDivisionDataApi = createApi({
  reducerPath: "fireDivisionDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getFireDivisionData: build.query<IFireDivisionData[], void>({
      query: () => "fire-division",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetFireDivisionDataQuery } = fireDivisionDataApi;
