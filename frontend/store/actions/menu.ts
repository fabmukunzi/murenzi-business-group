import { MenuCategory, MenuItem, MenuResponse } from '@/lib/types/menu';
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
        deleteMenuItem: builder.mutation<{ data: { menu: MenuItem } }, { menuId: string }>({
            query: ({ menuId }) => ({
                url: `/menu/${menuId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['room'],
        }),
        updateMenu: builder.mutation<void, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/menu/${id}`,
                method: "put",
                body: data,
            }),
            invalidatesTags: ['room', 'single-room'],
        }),
    }),
});

export const { useAddNewMuneItemMutation, useGetMenuItemsQuery,useGetCategoriesQuery,useDeleteMenuItemMutation,useUpdateMenuMutation } = menuItemEndpoints;
