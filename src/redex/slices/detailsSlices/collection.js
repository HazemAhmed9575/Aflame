import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching the collection details
export const getCollection = createAsyncThunk(
  "/getcollection",
  async (collectionId, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/collection/${collectionId}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      // Log the full response (for debugging, can remove later)
      console.log("Response:", res);
      return res.data;
    } catch (error) {
      // Log the error for debugging (can remove later)
      console.error("Error fetching collection:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Initial state
const initialState = {
  dataCollection: [], // Change to an object to avoid issues accessing properties
  collectionLoading: false,
  collectionError: null, // Make it null initially for better error tracking
};

// Collection slice
const collectionSlice = createSlice({
  name: "collectionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
        state.collectionLoading = true;
        state.collectionError = null; // Reset error on new fetch
        console.log("Fetching collection..."); // Log the pending state
      })
      .addCase(getCollection.fulfilled, (state, { payload }) => {
        state.collectionLoading = false;
        state.dataCollection = payload; // Store the fetched data
        console.log("Collection data:", payload); // Log the data for debugging
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.collectionLoading = false;
        state.collectionError = action.payload || "Failed to fetch collection"; // Store error
        console.log("Failed to fetch collection", action.payload); // Log error for debugging
      });
  },
});

// Export the reducer
export const collection = collectionSlice.reducer;
