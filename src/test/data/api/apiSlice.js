import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-api-movies.onrender.com/api/' }),
  endpoints: (builder) => ({
   
  }),
});

export default apiSlice;

