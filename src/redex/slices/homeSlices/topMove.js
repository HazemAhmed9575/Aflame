import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopMoveData = createAsyncThunk(
  "/getTopMoveData",
  async (_, thunkAPI) => {
    try {
      const data = await axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'en-US', page: '1' },
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
  movesData: [],
  loding: false,
  erorr: false,
};
const topMoveData = createSlice({
  name: "topMoveData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTopMoveData.pending, (state) => {
      state.loding = true;
    });
    builder.addCase(getTopMoveData.fulfilled, (state, action) => {
      state.loding = false;
      
      state.movesData = action.payload.filter((move) => move.vote_average > 7);
    });
    builder.addCase(getTopMoveData.rejected, (state) => {
      state.erorr = true;
    });
  },
});

export const moveData = topMoveData.reducer;
