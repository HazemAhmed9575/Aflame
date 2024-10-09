import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getcollection = createAsyncThunk(
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

      // Extract only serializable data
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  dataCollection: [],
  collectionLoading: false,
  collectionError: false,
};

const collectionSlice = createSlice({
  name: "collectionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getcollection.pending, (state) => {
        state.collectionLoading = true;
      })
      .addCase(getcollection.fulfilled, (state, { payload }) => {
        state.collectionLoading = false;
        state.dataCollection = payload; // Payload is now only the data part
      })
      .addCase(getcollection.rejected, (state) => {
        state.collectionLoading = false;
        state.collectionError = true;
      });
  },
});

export const collection = collectionSlice.reducer;
