import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create the async thunk
export const swiperMoveData = createAsyncThunk(
  "/swiperMoveData",
  async  (_, thunkAPI) => {
    try {
      const data  = await axios({
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

// Create the slice
const movePhotoSlice = createSlice({
  name: "movePhoto",
  initialState: { photosSweper: [], loding :false, error: false },
  extraReducers: (builder) => {
    builder
      .addCase(swiperMoveData.pending, (state) => {
        state.loding=true
      })
      .addCase(swiperMoveData.fulfilled, (state, action) => {
        state.photosSweper = action.payload;
        state.loding=false
      })
      .addCase(swiperMoveData.rejected, (state, action) => {
        state.error=true
        state.loding=false

      });
  },
});

// Export the reducer as a named export
export const movePhotoReducer = movePhotoSlice.reducer;
