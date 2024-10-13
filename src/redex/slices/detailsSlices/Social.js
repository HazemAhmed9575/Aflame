import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch reviews from the API
export const gitSocial = createAsyncThunk(
  "gitSocial",
  async ({ Subject,id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject=="movie"?"movie":"tv"}/${id}/reviews`,
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyODY0NTcxMC41MzE0NzIsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-9P7wYpOVRxRO_yt_WYnczrl9Z6coLmM9xcC6H_3KdU"
        },
      });
      return data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Utility function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const initialState = {
  review: [],
  reviewLoading: false,
  reviewError: false,
  expandedReviews: {}, // An object to track expanded reviews by index or ID
};

const socialSlice = createSlice({
  name: "socialSlice",
  initialState,
  reducers: {
    toggleReview: (state, action) => {
      const reviewId = action.payload;
      // Toggle the visibility of the specific review
      state.expandedReviews[reviewId] = !state.expandedReviews[reviewId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gitSocial.pending, (state) => {
        state.reviewLoading = true;
        state.reviewError = false;
      })
      .addCase(gitSocial.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.review = action.payload.map((reviewItem) => ({
          ...reviewItem,
          formattedDate: formatDate(reviewItem.updated_at),
        }));
      })
      .addCase(gitSocial.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = false;
      });
  },
});

export const { toggleReview } = socialSlice.actions;
export const reviews = socialSlice.reducer;
