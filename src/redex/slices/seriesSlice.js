import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeries = createAsyncThunk("/getSeries", async (_, { getState, rejectWithValue }) => {
  const {padges} = getState().contact;
  try {

const data = await axios({
  method: 'GET',
  url: 'https://api.themoviedb.org/3/tv/popular',
  params: {language: 'en-US', padges },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ'
}})
return data.data.results;
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})


const initialState = {
  seriestv:[],
padges:1,
loding:false,
error:false
  }



  const seriesslice = createSlice({
    name: "seriesslice",
    initialState,
    reducers: {
      setPadges:()=>{}
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSeries.pending, (state) => {
          state.loding=true
          console.log("pending");
          
        })
        .addCase(getSeries.fulfilled, (state, {payload}) => {
          state.seriestv = payload;
console.log("fulfilled",payload);


          state.loding=false
        })
        .addCase(getSeries.rejected, (state) => {
          state.error=true
          console.log("rejected");
          
          state.loding=false
  
        });
    },
  })


export const series =seriesslice.reducer
export const {padges} = seriesslice.actions  