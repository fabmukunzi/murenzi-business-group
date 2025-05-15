import { TransactionsResponse } from '@/lib/types/transaction';
import { baseAPI } from '@/store/api';

export const transactionEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        gettransactions: builder.query<TransactionsResponse, void>({
            query: () => '/transaction',
            providesTags: ['Transaction'],
        }),

    }),
});

export const { useGettransactionsQuery } = transactionEndpoints;
