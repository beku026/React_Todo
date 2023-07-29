import { configureStore, getDefaultMiddleware, } from '@reduxjs/toolkit'
import { TodoApi } from './TodoList/TodoList.api'
import TodoListSlice from './TodoList/TodoList.slice'

export const store = configureStore({
  reducer: {
    todo: TodoListSlice,
    [TodoApi.reducerPath]: TodoApi.reducer
  },
  middleware: getDefaultMiddleware().concat(TodoApi.middleware),
})
