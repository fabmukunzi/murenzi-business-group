import { MenuCategory, MenuResponse } from '@/lib/types/menu';
import { IRoom } from '@/lib/types/room';
import { baseAPI } from '@/store/api';

const menuItemEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        addNewMuneItem: builder.mutation<IRoom, FormData>({
            query: (formData) => ({
                url: '/menu',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['menu'],
        }),
        getMenuItems: builder.query<MenuResponse, { categoryId?: string }>({
            query: ({ categoryId }) => {
                const params = new URLSearchParams();
                if (categoryId) {
                    params.append('categoryId', categoryId);
                }

                return {
                    url: `/menu?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['menu'],
        }),
        getCategories: builder.query<{ data: { categories: MenuCategory[] } }, void>({
            query: () => ({
                url: '/menu/categories',
                method: 'GET',
            }),
            providesTags: ['menu'],
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

export const { useAddNewMuneItemMutation, useGetMenuItemsQuery,useGetCategoriesQuery } = menuItemEndpoints;
