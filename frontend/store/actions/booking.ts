import { BookingPayload, IRoom } from '@/lib/types/room';
import { baseAPI } from '@/store/api';

const bookingEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        bookingRoom: builder.mutation<{ booking: any }, any>({
            query: (body) => ({
                url: '/bookings',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useBookingRoomMutation } = bookingEndpoints;
