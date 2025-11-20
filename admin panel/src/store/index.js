// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import dashboardSlice from "./slices/dashboardSlice";
import pageSlice from "./slices/pageSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    dashboard: dashboardSlice,
    pages: pageSlice,
  },
});
