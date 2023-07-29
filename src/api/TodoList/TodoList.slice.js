import { createSlice } from '@reduxjs/toolkit';
import { TodoApi } from './TodoList.api';

const initialState = {
  todo: []
}

const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers ({addMatcher}) {
    addMatcher(
      TodoApi.endpoints.getAllTodo.matchFulfilled, 
      (state, action) => {
        state.todo = action.payload
      }
    )
  },
})

export default TodoSlice.reducer;