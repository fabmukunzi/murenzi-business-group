import { BASE_API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['challenges', 'challenge', 'notifications', 'notification', 'skills', 'categories', 'prizes', 'systemLogs', 'users', 'stats'],
  endpoints: () => ({}),
});
