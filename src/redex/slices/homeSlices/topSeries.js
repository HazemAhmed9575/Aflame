import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopSeriesData = createAsyncThunk(
  "/getTopSeriesData",
  async (_, thunkAPI) => {
    try {
      const data = await axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular',
        params: {language: 'en-US', page: '1'},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyNzc5NDE5Ni42MDAyMTcsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LQ5-FXgioRbvRaN2nInfKR5ovC0gY7c27MzAMLK-isw'
       },
      });
      return data.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  seriesData: [],
  loding: false,
  erorr: false,
};
const topSeriesData = createSlice({
  name: "topSeriesData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTopSeriesData.pending, (state) => {
      state.loding = true;
    });
    builder.addCase(getTopSeriesData.fulfilled, (state, action) => {
      state.loding = false;
      state.seriesData = action.payload.filter(
        (series) => series.vote_average >= 5.5
      );
    });
    builder.addCase(getTopSeriesData.rejected, (state) => {
      state.erorr = true;
    });
  },
});

export const seriesData = topSeriesData.reducer;
