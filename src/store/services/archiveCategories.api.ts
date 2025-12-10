import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";
import { API_URL } from "../../config.ts";

export const archiveCategoriesApi = createApi({
  reducerPath: "archiveCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getArchiveCategories: build.query<IArchiveCategories[], void>({
      query: () => "archive/categories",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetArchiveCategoriesQuery } = archiveCategoriesApi;
