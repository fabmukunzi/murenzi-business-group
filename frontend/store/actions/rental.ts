import { roomResponse } from '@/lib/types/room';
import { baseAPI } from '@/store/api';

const roomsEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        addNewRoom: builder.mutation<roomResponse, FormData>({
            query: (formData) => ({
                url: '/rooms',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useAddNewRoomMutation } = roomsEndpoints;
