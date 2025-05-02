import { IRoom } from '@/lib/types/room';
import { baseAPI } from '@/store/api';

const roomsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addNewRoom: builder.mutation<IRoom, FormData>({
      query: (formData) => ({
        url: '/rooms',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['room'],
    }),
    getRentals: builder.query<{ data: { rooms: IRoom[] } }, void>({
      query: () => ({
        url: '/rooms',
        method: 'GET',
      }),
      providesTags: ['room'],
    }),
    getSingleRental: builder.query<{ data: { room: IRoom } }, { roomId: string }>({
      query: ({ roomId }) => ({
        url: `/rooms/${roomId}`,
        method: 'GET',
      }),
      providesTags: ['single-room'],
    }),
    deleteRental: builder.mutation<{ data: { room: IRoom } }, { roomId: string }>({
      query: ({ roomId }) => ({
        url: `/rooms/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['room'],
    }),
    updateRoom: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/rooms/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ['room', 'single-room'],
    }),
    deleteRoomImage: builder.mutation<void, { roomId: string; imageUrl: string }>({
      query: ({ roomId, imageUrl }) => ({
        url: `/rooms/${roomId}/images`,
        method: 'DELETE',
        body: { imageUrl },
      }),
      invalidatesTags: ['room', 'single-room'],
    }),
  }),
});

export const { useAddNewRoomMutation, useGetRentalsQuery, useGetSingleRentalQuery, useDeleteRentalMutation, useUpdateRoomMutation,useDeleteRoomImageMutation } = roomsEndpoints;
