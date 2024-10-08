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
          Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with a safe way to handle your API token
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
        console.log(payload);
      })
      .addCase(gitSriesKeywords.rejected, (state, { payload }) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = payload; // Store the error message in the state
      });
  },
});

// Export the reducer
export const seriesWords = seriesKeywordsSlice.reducer;
