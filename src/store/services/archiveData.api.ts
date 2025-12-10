import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import { API_URL } from "../../config.ts";

export const archiveDataApi = createApi({
  reducerPath: "archiveDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getArchiveData: build.query<IArchiveData[], void>({
      query: () => "archive",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetArchiveDataQuery } = archiveDataApi;
