import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecommendations = createAsyncThunk(
  "/getRecommendations",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/recommendations?page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  recommend: [],
};

const RecommendationsSlices = createSlice({
  name: " RecommendationsSlices",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, { payload }) => {
        (state.loading = false), (state.recommend = payload.results);
      })
      .addCase(getRecommendations.rejected, (state) => {
        (state.loading = false), (state.error = true);
      });
  },
});

export const Recommendations = RecommendationsSlices.reducer;
