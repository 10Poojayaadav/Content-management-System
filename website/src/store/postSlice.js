import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../api/http";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await get("/posts-list");
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload || []; // array
      })

      // Failure
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export reducer
export default postSlice.reducer;
