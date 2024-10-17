import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to convert ISO 639-1 codes to language names
const getLanguageName = (isoCode) => {
  if (!isoCode || typeof isoCode !== "string") {
    return "No LANGUAGE"; // Fallback for invalid or missing ISO codes
  }
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
    return displayNames.of(isoCode) || "No LANGUAGE"; // Fallback to 'No LANGUAGE' if no match found
  } catch (error) {
    return "No LANGUAGE"; // Handle potential errors
  }
};

export const getMedia = createAsyncThunk(
  "/getMedia",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/images`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  postersMidia: [],
  backdropsMidia: [],
  postersMidiaArranged: {},
  backdropsMidiaArranged: {},
  mediaLoding: false,
  mediaErorr: false,
  textVideoMediaComp: true,
  textBackdrobMediaComp: false,
  textPostersMediaComp: false,
};

const mediaSlice = createSlice({
  name: "mediaSlice",
  initialState,
  reducers: {
    textVideo: (state) => {
      state.textVideoMediaComp = true;
      state.textBackdrobMediaComp = false;
      state.textPostersMediaComp = false;
    },
    textBackdrob: (state) => {
      state.textVideoMediaComp = false;
      state.textBackdrobMediaComp = true;
      state.textPostersMediaComp = false;
    },
    textPosters: (state) => {
      state.textVideoMediaComp = false;
      state.textBackdrobMediaComp = false;
      state.textPostersMediaComp = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMedia.pending, (state) => {
        state.mediaLoding = true;
      })
      .addCase(getMedia.fulfilled, (state, { payload }) => {
        state.mediaLoding = false;
        state.postersMidia = payload.posters;
        state.backdropsMidia = payload.backdrops;

        // Arrange backdrops by language name
        state.backdropsMidiaArranged = state.backdropsMidia.reduce(
          (acc, item) => {
            const langName = getLanguageName(item.iso_639_1);
            if (!acc[langName]) {
              acc[langName] = [];
            }
            acc[langName].push(item);
            return acc;
          },
          {}
        );

        // Arrange posters by language name
        state.postersMidiaArranged = state.postersMidia.reduce((acc, item) => {
          const langName = getLanguageName(item.iso_639_1);
          if (!acc[langName]) {
            acc[langName] = [];
          }
          acc[langName].push(item);
          return acc;
        }, {});
      })
      .addCase(getMedia.rejected, (state) => {
        state.mediaErorr = true;
      });
  },
});

export const media = mediaSlice.reducer;
export const { textVideo, textBackdrob, textPosters } = mediaSlice.actions;
