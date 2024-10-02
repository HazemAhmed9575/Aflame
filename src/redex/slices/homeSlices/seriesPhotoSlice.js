import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create the async thunk
export const swiperserisData = createAsyncThunk(
  "/swiperserisData",
  async  (_, thunkAPI) => {
    try {
      const data  = await axios({
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

// Create the slice
const movePhotoSlice = createSlice({
  name: "movePhoto",
  initialState: { photosSweper: [], loding:false, error: false },
  extraReducers: (builder) => {
    builder
      .addCase(swiperserisData.pending, (state) => {
        state.loding=true
            })
      .addCase(swiperserisData.fulfilled, (state, action) => {
        state.photosSweper = action.payload;
        state.loding=false
      })
      .addCase(swiperserisData.rejected, (state, action) => {
        state.loding=false
        state.error=true
      });
  },
});

// Export the reducer as a named export
export const seriesPhotoReducer = movePhotoSlice.reducer;
