import { IBooking } from '@/lib/types/booking';
import { BookingPayload, BookingResponse } from '@/lib/types/room';
import { baseAPI } from '@/store/api';

const bookingEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    bookingRoom: builder.mutation<BookingResponse, BookingPayload>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getBookings: builder.query<{ data: { bookings: IBooking[] } }, void>({
      query: () => '/bookings',
    }),
  }),
});

export const { useBookingRoomMutation, useGetBookingsQuery } = bookingEndpoints;
