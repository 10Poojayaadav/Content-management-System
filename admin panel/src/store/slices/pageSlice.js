import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "../../api/http";

const BASE = "pages";

// Fetch pages
export const fetchPosts = createAsyncThunk("pages/fetchPosts", async () => {
  const response = await get(BASE);
  return response.data; // normalize
});

// Add page
export const addPost = createAsyncThunk("pages/addPost", async (pageData) => {
  const formData = new FormData();
  Object.keys(pageData).forEach((key) => formData.append(key, pageData[key]));

  const response = await post(BASE, formData, true);
  return response.data;
});

// Toggle publish/unpublish
export const togglePublish = createAsyncThunk(
  "pages/togglePublish",
  async (id) => {
    const response = await post(`${BASE}/${id}/toggle-publish`);
    return response.data; // assuming backend returns updated page
  }
);

// Update page
export const updatePost = createAsyncThunk(
  "pages/updatePost",
  async (pageData) => {
    const formData = new FormData();
    Object.keys(pageData).forEach((key) => formData.append(key, pageData[key]));

    const response = await put(`${BASE}/${pageData.id}`, formData);
    return response.data; // <-- this is returned to extraReducers
  }
);

// Delete page
export const deletePost = createAsyncThunk("pages/deletePost", async (id) => {
  await del(`${BASE}/${id}`);
  return id;
});

// Slice
const pageSlice = createSlice({
  name: "pages",
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
        state.error = null;
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
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })

      // Toggle publish
      .addCase(togglePublish.fulfilled, (state, action) => {
        const updatedPage = action.payload;
        const index = state.items.findIndex((p) => p.id === updatedPage.id);
        if (index !== -1) state.items[index] = updatedPage;
      });
  },
});

export default pageSlice.reducer;
