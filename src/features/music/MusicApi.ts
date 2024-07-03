import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Định nghĩa API slice cho các yêu cầu liên quan đến âm nhạc
const musicApi = createApi({
  reducerPath: 'musicApi', // Đặt tên cho slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }), // URL cơ sở cho các yêu cầu API
  endpoints: (builder) => ({
    getMusicList: builder.query({
      query: () => 'music/list', // Định nghĩa endpoint để lấy danh sách nhạc
    }),
    getMusicDetails: builder.query({
      query: (id) => `music/details/${id}`, // Định nghĩa endpoint để lấy chi tiết một bài nhạc
    }),
  }),
});

export const { useGetMusicListQuery, useGetMusicDetailsQuery } = musicApi; // Xuất các hook để sử dụng trong các component
export default musicApi; // Xuất default slice này
