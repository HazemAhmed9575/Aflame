import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch actor movie credits
export const gitActorCredits = createAsyncThunk(
  "gitActorCredits",
  async (person_id, { rejectWithValue }) => {
    try {
      const {data} = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${person_id}/movie_credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODkxMjg1Ny42NzY3MzksInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ll4jjkQIYAeAdD1DxGOSVyi83jmXfwJdgtHWWOtS-Ds",
        },
      });
      console.log();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  Credit: [],
  loading: false,
  error: false,
};

const actorCreditsSlice = createSlice({
  name: "actorCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gitActorCredits.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(gitActorCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.Credit = action.payload.cast; // Assuming credits are in `cast` key
      })
      .addCase(gitActorCredits.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const actorCredit = actorCreditsSlice.reducer;
