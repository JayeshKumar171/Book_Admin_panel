import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ['Books'], 
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      transformResponse: (res) => res.map(b => ({ ...b, id: b._id })),
      providesTags: ['Books'],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'], 
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...updatedBook }) => ({
        url: `/books/${_id}`,
        method: 'PUT',
        body: updatedBook,
      }),
      invalidatesTags: ['Books'], 
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'], 
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
