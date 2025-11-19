import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "../../api/http";

const BASE = "posts";

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const data = await get(BASE);
  
  return data.data; 
});

// Add post
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const data = await post(BASE, postData);
  return data.data;
});

// Update post
export const updatePost = createAsyncThunk("posts/updatePost", async (postData) => {
  const data = await put(`${BASE}/${postData.id}`, postData);
  return data.data;
});

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await del(`${BASE}/${id}`);
  return id;
});

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
