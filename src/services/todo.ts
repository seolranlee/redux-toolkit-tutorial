import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: builder => ({
    getTodoByName: builder.query<TodoType, string>({
      query: name => `todos/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoByNameQuery } = todoApi;
