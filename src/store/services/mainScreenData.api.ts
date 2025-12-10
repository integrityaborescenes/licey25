import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IMainScreenData } from "../../types/mainScreenData.types.ts";
import { API_URL } from "../../config.ts";

export const mainScreenDataApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getMainScreenData: build.query<IMainScreenData, void>({
      query: () => "main-screen",
      transformResponse: (response: IMainScreenData[]) => response[0],
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetMainScreenDataQuery } = mainScreenDataApi;
