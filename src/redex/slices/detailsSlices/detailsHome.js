import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//  fu get detalis move & series
export const getDetalis = createAsyncThunk(
  "/getDetalis",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}`,
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

// fu get ALLvideo move & series
export const getVideo = createAsyncThunk(
  "/gitVideo",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/videos`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// fu get cradits cast & crew
export const getCredits = createAsyncThunk(
  "/getCredits",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/credits`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  detais: [],
  error: false,
  loading: true,
  video: [],
  cast: [],
  crew: [],
  test: "",
};

const DetailsSlices = createSlice({
  name: "DetailsSlices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDetalis.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalis.fulfilled, (state, { payload }) => {
        state.detais = payload;
      })
      .addCase(getDetalis.rejected, (state) => {
        state.error = true;
      })
      .addCase(getVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideo.fulfilled, (state, { payload }) => {
        state.video = payload;
      })
      .addCase(getVideo.rejected, (state) => {
        state.error = true;
      })
      .addCase(getCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCredits.fulfilled, (state, { payload }) => {
        state.cast = payload.cast;
        state.crew = payload.crew;

        state.loading = false;
      })
      .addCase(getCredits.rejected, (state) => {
        state.error = true;
      });
  },
});

export const DetailsHome = DetailsSlices.reducer;
