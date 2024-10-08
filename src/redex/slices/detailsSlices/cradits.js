import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  cast: [],
  crew: [],
  craditLoding: false,
  craditErorr: false,
};

const craditSlice = createSlice({
  name: "craditSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCredits.pending, (state) => {
        state.craditLoding = true;
      })
      .addCase(getCredits.fulfilled, (state, { payload }) => {
        state.craditLoding = false;
        state.cast = payload.cast;
        state.crew = payload.crew;
      })
      .addCase(getCredits.rejected, (state) => {
        state.craditLoding = false;
        state.craditErorr = true;
      });
  },
});

export const cradit = craditSlice.reducer;
