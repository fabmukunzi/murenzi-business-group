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
    }),
  }),
});

export const { useAddNewRoomMutation, useGetRentalsQuery, useGetSingleRentalQuery, useDeleteRentalMutation,useUpdateRoomMutation } = roomsEndpoints;
