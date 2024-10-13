import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeasons = createAsyncThunk(
    "/getSeasons",
    async ({ id }, thunkAPI) => {
      try {
        const data = await axios({
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${id}/changes`,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
          },
        });
        return data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

  const initialState = {

    Seasons:[]


  }

  const seasonsSlice = createSlice({
name:"seasonsSlice",
initialState,
extraReducers:(builder)=>{
    builder.addCase(getSeasons.pending,(state)=>{
console.log("pending");
    })
    .addCase(getSeasons.fulfilled,(state,{ payload })=>{
        console.log(payload);
        
        console.log("fulfilled");
            })
            .addCase(getSeasons.rejected,(state,{ payload })=>{
                console.log("rejected");
                    })

}

  })

  export const season = seasonsSlice.reducer;