import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";

export const archiveCategoriesApi = createApi({
  reducerPath: "archiveCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getArchiveCategories: build.query<IArchiveCategories, void>({
      query: () => "archive/categories",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetArchiveCategoriesQuery } = archiveCategoriesApi;
