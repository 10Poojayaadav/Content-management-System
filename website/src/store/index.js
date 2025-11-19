import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice'; // This will be created in step 4

export const store = configureStore({
  reducer: {
    posts: postReducer, 
  },
});