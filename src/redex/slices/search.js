import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for getting TV shows or movies based on the search query
export const gitSearchData = createAsyncThunk(
  "search/gitSearchData", // Provide a more descriptive type
  async ({ search, searchCategore }, { rejectWithValue }) => {
    console.log(searchCategore);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${searchCategore}`,
        {
          params: {
            query: search,
            include_adult: "false",
            language: "en-US",
            page: 1,
          },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyOTI2ODQ3My45MjE3NDMsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.31RNtKary8XCVVpaJeyJ0QjLellZiPABmmXdY7GDI_k",
          },
        }
      );
      return response.data.results; // Return the results from the API
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gitSearchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gitSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(gitSearchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const search = searchSlice.reducer;
