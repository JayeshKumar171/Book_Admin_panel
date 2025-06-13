// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../src/features/book/bookApiSlice';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});
