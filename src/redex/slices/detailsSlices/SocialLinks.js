import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk to fetch external IDs
export const getExternalIds = createAsyncThunk(
  "/getExternalIds",
  async ({ Subject,id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject=="movie"?"movie":"tv"}/${id}/external_ids`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODQ5OTc0MS43MTM2OTEsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dRir9eSw4lsgwUsnbfrm27yyChcPQybuq5gQfF5_kCQ",
        },
      });
      return data; // Return the external IDs data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

// Define the initial state
const initialState = {
  externalIds: [], // Object to store the external IDs
  externalIdsLoading: false,
  externalIdsError: false,
};

// Create the slice for managing external IDs state
const externalIdsSlice = createSlice({
  name: "externalIdsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getExternalIds.pending, (state) => {
        state.externalIdsLoading = true; // Set loading to true when fetching data
      })
      .addCase(getExternalIds.fulfilled, (state, { payload }) => {
        state.externalIds = payload; // Store the fetched data
        state.externalIdsLoading = false; // Set loading to false
        state.externalIdsError = false; // Clear any previous error
      })
      .addCase(getExternalIds.rejected, (state, action) => {
        state.externalIdsError = action.payload || true; // Handle error
        state.externalIdsLoading = false; // Stop loading
      });
  },
});

export const externalIds = externalIdsSlice.reducer;
