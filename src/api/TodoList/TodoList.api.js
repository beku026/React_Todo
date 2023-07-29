import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const TodoApi = createApi({
  reducerPath: 'Todo',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64bed2c35ee688b6250cf7f2.mockapi.io/native'
  }),
  tagTypes: ["users"],
  endpoints: ({query, mutation}) => ({
    getAllTodo: query({
      query: () => '/users',
      providesTags: ['users']
    }),
    deleteTodo: mutation({
      query: (id) => ({
        url: '/users/' + id,
        method: "DELETE"
      }),
      invalidatesTags: ['users']
    }),
    updateTodo: mutation({
      query: (obj) => ({
        url: 'users/' + obj.id,
        method: 'PATCH',
        body: obj
      }),
      invalidatesTags: ['users']
    }),
    addTodo: mutation({
      query: (obj) => ({
        url: 'users', 
        method: 'POST',
        body: obj
      }),
      invalidatesTags: ['users']
    })
  })
})

export const { 
  useGetAllTodoQuery, 
  useDeleteTodoMutation, 
  useUpdateTodoMutation,
  useAddTodoMutation
} = TodoApi;
