import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch credits
export const getCredits = createAsyncThunk(
  "/getCredits",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/credits`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Corrected variable 'e' to 'error'
    }
  }
);

// Initial state
const initialState = {
  cast: [],
  crew: [],
  Art: [],
  Camera: [],
  MakeUp: [],
  Writing: [],
  supCrew: [],
  Directing: [],
  Editing: [],
  Lighting: [],
  Sound: [],
  VisualEffects: [],
  craditLoding: false,
  craditErorr: false,
};

// Creating the slice
const craditSlice = createSlice({
  name: "craditSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCredits.pending, (state) => {
        state.craditLoding = true;
      })
      .addCase(getCredits.fulfilled, (state, { payload }) => {
        state.craditLoding = false;
        state.cast = payload.cast;
        state.crew = payload.crew;

        // Filter crew by departments
        state.Art = payload.crew?.filter(
          (member) => member.known_for_department === "Art"
        );
        state.Camera = payload.crew?.filter(
          (member) => member.known_for_department === "Camera"
        );
        state.MakeUp = payload.crew?.filter(
          (member) => member.known_for_department === "Costume & Make-Up"
        );
        state.Writing = payload.crew?.filter(
          (member) => member.known_for_department === "Writing"
        );
        state.supCrew = payload.crew?.filter(
          (member) => member.known_for_department === "Crew"
        );
        state.Directing = payload.crew?.filter(
          (member) => member.known_for_department === "Directing"
        );
        state.Editing = payload.crew?.filter(
          (member) => member.known_for_department === "Editing"
        );
        state.Lighting = payload.crew?.filter(
          (member) => member.known_for_department === "Lighting"
        );
        state.Sound = payload.crew?.filter(
          (member) => member.known_for_department === "Sound"
        );
        state.VisualEffects = payload.crew?.filter(
          (member) => member.known_for_department === "Visual Effects"
        );
      })
      .addCase(getCredits.rejected, (state) => {
        state.craditLoding = false;
        state.craditErorr = true;
      });
  },
});

// Export the reducer
export const cradit = craditSlice.reducer;
