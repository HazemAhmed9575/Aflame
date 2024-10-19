import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeries = createAsyncThunk(
  "/getSeries",
  async (_, { getState, rejectWithValue }) => {
    const { padges } = getState().series;
    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/popular",
        params: { language: "en-US", page: padges },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data.data.results;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  seriestv: [],
  padges: 1,
  loding: false,
  error: false,
  expandedOverview:{}
};

const seriesslice = createSlice({
  name: "seriesslice",
  initialState,
  reducers: {
    incremintPageSeries: (state) => {
      if (state.padges < 500) {
        state.padges += 1;
      }
    },
    decremintPageSeries: (state) => {
      if (state.padges > 1) {
        state.padges -= 1;
      }
    },
    toMaxSeries: (state) => {
      state.padges = 500;
    },
    toMiniSeries: (state) => {
      state.padges = 1;
    },
    toggleOverview: (state, action) => {
      const reviewId = action.payload;
      // Toggle the visibility of the specific review
      state.expandedOverview[reviewId] = !state.expandedOverview[reviewId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeries.pending, (state) => {
        state.loding = true;
      })
      .addCase(getSeries.fulfilled, (state, { payload }) => {
        state.seriestv = payload;
        state.loding = false;
      })
      .addCase(getSeries.rejected, (state) => {
        state.error = true;
        state.loding = false;
      });
  },
});

export const series = seriesslice.reducer;
export const {
  incremintPageSeries,
  decremintPageSeries,
  toMaxSeries,
  toMiniSeries,
  toggleOverview
} = seriesslice.actions;
