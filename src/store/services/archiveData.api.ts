import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArchiveData } from "../../types/archiveData.types.ts";

export const archiveDataApi = createApi({
  reducerPath: "archiveDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getArchiveData: build.query<IArchiveData[], void>({
      query: () => "archive",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetArchiveDataQuery } = archiveDataApi;
