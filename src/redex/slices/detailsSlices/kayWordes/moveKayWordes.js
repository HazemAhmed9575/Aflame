import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching movie keywords
export const gitMoveKeywords = createAsyncThunk(
  "moveKeywords/gitMoveKeywords",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}/keywords`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODMyMjI5Ny4zNzAyODgsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ltPSMdfXZ2eS9wHaAUhWknDrSdv_A7AHyo1JT8EGklA'
        }
      });
      return data; // Return the data to the fulfilled action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle any error and return it
    }
  }
);

// Initial state
const initialState = {
  moveWords: [],
  loading: false,
  error: null,
};

// Create the slice
const moveKeywordsSlice = createSlice({
  name: "moveKeywordsSlice",
  initialState,
  reducers: {
    // You can add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(gitMoveKeywords.pending, (state) => {
        state.loading = true; // Set loading to true when the request starts
        state.error = null; // Clear any previous error
      })
      .addCase(gitMoveKeywords.fulfilled, (state, {payload}) => {
        state.loading = false; // Set loading to false when the request completes
        state.moveWords = payload.keywords; // Store the keywords in state
      })
      .addCase(gitMoveKeywords.rejected, (state, {payload}) => {
        state.loading = false; // Set loading to false when the request fails
        state.error =payload; // Store the error message in state
      });
  },
});



export const moveWordes =moveKeywordsSlice.reducer