import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetalis = createAsyncThunk(
  "/getDetalis",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data; // Return data directly (no need for data.data)
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

const initialState = {
  moveDetails: [], // Initialized as an object
  detailsLoading: true,
  detailsError: false,
};

const detailsSlices = createSlice({
  name: "detailsSlices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDetalis.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(getDetalis.fulfilled, (state, { payload }) => {
        state.moveDetails = payload; // Store the data in moveDetails
        state.detailsLoading = false; // Set loading to false
        state.detailsError = false; // Clear any previous error


      })
      .addCase(getDetalis.rejected, (state, action) => {
        state.detailsError = action.payload || true; // Set the error
        state.detailsLoading = false; // Stop loading
      });
  },
});

export const details = detailsSlices.reducer;
