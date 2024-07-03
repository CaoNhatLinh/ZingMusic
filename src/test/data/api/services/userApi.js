import apiSlice from '../apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'nguoidung',
    }),
    getUser: builder.query({
      query: (id) => `nguoidung/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserListQuery, useGetUserQuery } = userApi;
