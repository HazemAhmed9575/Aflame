import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Async Thunk to fetch movie data
export const getMoveData = createAsyncThunk("/getMoveData", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState().moves; // Get the current state (to access pageNumber)
    const { data } = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: state.pageNumber }, // Pass the current pageNumber
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGNlOTQ3ZTkzYTdjYTI5ZDFmNDExYTQ2M2Q5OTQ1ZiIsIm5iZiI6MTcyNzg5ODEyNy42MTI2OTUsInN1YiI6IjY2ZjlhZWYwZTdkMjRlYmIyYmEyNjY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtEe4ZTAv5velob1kun-CyTVFC_wwGUg8d90B_ygw2I",
      },
    });
    return data.results; // Return movie data
  } catch (error) {
    // Return a custom error message in case of failure
    return rejectWithValue("Failed to fetch movie data.");
  }
});

const initialState = {
  pageNumber: 1,
  moveData: [],
  loading: false, // To track loading state
  error: null, // To store error messages
  Pagin:true
};

const movesData = createSlice({
  name: "movesData",
  initialState,
  reducers: {

setPagin:(state,{payload})=>{
  state.Pagin = payload
},


    incremintPage: (state) => {
      if (state.pageNumber < 500) {
        state.pageNumber += 1;
      }
    },
    decremintPage: (state) => {
      if (state.pageNumber > 1) {
        state.pageNumber -= 1;
      }
    },
    toMax: (state) => {
      state.pageNumber = 500;
    },
    toMini: (state) => {
      state.pageNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoveData.pending, (state) => {
        state.loading = true; // Set loading to true while fetching data
        state.error = null; // Clear previous errors
      })
      .addCase(getMoveData.fulfilled, (state, { payload }) => {
        state.loading = false; // Set loading to false when data is received
       
        
        state.moveData = payload; // Store the fetched movie data
      })
      .addCase(getMoveData.rejected, (state, { payload }) => {
        state.loading = false; // Stop loading if the request fails
        state.error = payload; // Store the error message
      });
  },
});

export const { incremintPage, decremintPage, toMax, toMini,setPagin } = movesData.actions;
export const moves = movesData.reducer;
