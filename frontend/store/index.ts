import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { baseAPI } from './api';

interface ErrorPayload {
  data?: {
    message: string;
    [key: string]: string;
  };
}

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as ErrorPayload;

      if (payload?.data?.status === '401') {
        location.href = '/login';
      }
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
