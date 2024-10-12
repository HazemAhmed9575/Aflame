import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching series keywords
export const gitSriesKeywords = createAsyncThunk(
  "seriesKeywords/gitSriesKeywords",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/keywords`,
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODY0NTcxMC41MzE0NzIsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-9P7wYpOVRxRO_yt_WYnczrl9Z6coLmM9xcC6H_3KdU'
        },
      });

      return data.results; // Return the results directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle any error and return it
    }
  }
);

// Initial state
const initialState = {
  sriesWord: [], // This holds the fetched keywords
  loading: false,
  error: null,
};

// Create the slice
const seriesKeywordsSlice = createSlice({
  name: "seriesKeywordsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(gitSriesKeywords.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
        state.error = null; // Clear any previous errors
      })
      .addCase(gitSriesKeywords.fulfilled, (state, { payload }) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        state.sriesWord = payload; // Store the fetched keywords in the state
      })
      .addCase(gitSriesKeywords.rejected, (state, { payload }) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = payload; // Store the error message in the state
      });
  },
});

// Export the reducer
export const seriesWords = seriesKeywordsSlice.reducer;
