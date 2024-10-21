import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch social links for the actor
export const gitSocalLinks = createAsyncThunk(
  "socalLinks/gitSocalLinks",
  async (person_id, { rejectWithValue }) => {
    try {
      const {data} = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${person_id}/external_ids`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODkxMjg1Ny42NzY3MzksInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ll4jjkQIYAeAdD1DxGOSVyi83jmXfwJdgtHWWOtS-Ds",
        }
      });
      return data;
    } catch (error) {
    
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  socialLinks: {},
  socialLinksLoding: false,
  socialLinkserror: false
};

const socalLinksSlice = createSlice({
  name: "socalLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gitSocalLinks.pending, (state) => {
        state.socialLinksLoding = true;
      })
      .addCase(gitSocalLinks.fulfilled, (state, action) => {
        state.socialLinksLoding = false;
        state.socialLinks = action.payload;
      })
      .addCase(gitSocalLinks.rejected, (state, action) => {
        state.socialLinksLoding = false;
        state.socialLinkserror = action.payload;
      });
  }
});

export const socalLinksReducer = socalLinksSlice.reducer;
