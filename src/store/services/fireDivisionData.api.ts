import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IFireDivisionData } from "../../types/fireDivisionData.types.ts";
import { API_URL } from "../../config.ts";

export const fireDivisionDataApi = createApi({
  reducerPath: "fireDivisionDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getFireDivisionData: build.query<IFireDivisionData[], void>({
      query: () => "fire-division",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetFireDivisionDataQuery } = fireDivisionDataApi;
