import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPersonData } from "../../types/person.types.ts";

export const personApi = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://licey25.test.itlabs.top/api/" }),
  endpoints: (build) => ({
    getPersonData: build.query<IPersonData[], void>({
      query: () => "person",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetPersonDataQuery } = personApi;
