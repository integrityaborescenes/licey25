import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPersonData } from "../../types/person.types.ts";
import { API_URL } from "../../config.ts";

export const personApi = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (build) => ({
    getPersonData: build.query<IPersonData[], void>({
      query: () => "person",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetPersonDataQuery } = personApi;
