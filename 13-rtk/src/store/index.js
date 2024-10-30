import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../store/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
