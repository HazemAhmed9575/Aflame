import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getDetalis= createAsyncThunk(
    "/getDetalis",
    async  ({Subject,id}, thunkAPI) => {
        try {
    console.log(Subject,id);
    const data  = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/${Subject}/${id}`,
      params: {language: 'en-US'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ'
    },
    });
    return data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
    })


    const move_sriesDetailsSlices = createSlice({

        name:"move_sriesDetailsSlices",
        initialState:{
            detais:{},
            error:false,
            loding:false


        },
reducers:{},
extraReducers:(builder) => {
    builder
      .addCase(getDetalis.pending, (state) => {
        state.loding = true;
console.log("pending");

      })
      .addCase(getDetalis.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.detais = payload
        state.loding = false;
      })
      .addCase(getDetalis.rejected, (state) => {
        state.error = true;
        state.loding = false;
        console.log("rejected");
        
      });
  },


    })


    export const DetailsMoveSriesSlices = move_sriesDetailsSlices.reducer