import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch actor details using createAsyncThunk
export const gitActorDetails = createAsyncThunk(
  'actor/gitActorDetails',
  async (actorId, { rejectWithValue }) => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/person/${actorId}`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODkxMjg1Ny42NzY3MzksInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ll4jjkQIYAeAdD1DxGOSVyi83jmXfwJdgtHWWOtS-Ds'
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  actor: [],
  actorLoading: false,
  actorError: false,
};

const actorSlice = createSlice({
  name: 'actorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gitActorDetails.pending, (state) => {
        state.actorLoading = true;
        state.actorError = false;
      })
      .addCase(gitActorDetails.fulfilled, (state, action) => {
        state.actorLoading = false;
        state.actor = action.payload;
      })
      .addCase(gitActorDetails.rejected, (state) => {
        state.actorLoading = false;
        state.actorError = true;
      });
  },
});

export const actorDetails = actorSlice.reducer;
