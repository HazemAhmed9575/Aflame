import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getMedia = createAsyncThunk(
    "/getMedia",
    async ({ Subject, id }, thunkAPI) => {
      try {
        const data = await axios({
          method: "GET",
          url: `https://api.themoviedb.org/3/${Subject}/${id}/images`,
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
    postersMidia: [],
    backdropsMidia:[],
    mediaLoding: false,
    mediaErorr: false,
    textVideoMediaComp:true,
    textBackdrobMediaComp:false,
    textPostersMediaComp:false
  };

  const mediaSlice = createSlice({
name:"mediaSlice",
initialState,
reducers:{
  textVideo:(state)=>{
    state.textVideoMediaComp=true,
    state.textBackdrobMediaComp=false,
    state.textPostersMediaComp=false
  },
  textBackdrob:(state)=>{
    state.textVideoMediaComp=false,
    state.textBackdrobMediaComp=true,
    state.textPostersMediaComp=false
  },
  textPosters:(state)=>{
    state.textVideoMediaComp=false,
    state.textBackdrobMediaComp=false,
    state.textPostersMediaComp=true
  }
},
extraReducers:(builder)=>{
builder.addCase(getMedia.pending,(state)=>{
state.mediaLoding=true
})
.addCase(getMedia.fulfilled,(state,{ payload })=>{
  state.mediaLoding=false
    state.postersMidia=payload.posters
state.backdropsMidia=payload.backdrops  
})
.addCase(getMedia.rejected,(state)=>{
state.mediaErorr=true
})}})
export const media = mediaSlice.reducer;
 export const { textVideo,textBackdrob,textPosters } = mediaSlice.actions;