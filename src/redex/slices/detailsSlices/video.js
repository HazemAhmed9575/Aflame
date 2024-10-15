import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const getVideo = createAsyncThunk(
  "/gitVideo",
  async ({ Subject, id }, thunkAPI) => {
    try {
      const {data} = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${Subject}/${id}/videos`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ0YjA5MmViNTBhZDYxM2E5YmE4MTk3M2IyMTY3NSIsIm5iZiI6MTcyNzg4MzI4MC40NzQ2MTYsInN1YiI6IjY2ZjlhYzlmZTdkMjRlYmIyYmEyNjVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.js0nQHd1HmgjSIbdxzjSji985VdDD0TF_Q7bwpsIceQ",
        },
      });
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
const initialState = {
  video: [],
  videoLoding: false,
  videoErorr: false,
};

const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    // fu alart video
    showVideo: (state ,{payload}) => {
      if (state.video[0]) {
        Swal.fire({
          html: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${state.video[0].key}?si=dFaN3MJ_NpFtMKqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
          showConfirmButton: false,
          background: "#212529",
        });
      } else {
        Swal.fire({
          html: `<a style="color:#0839EF" href="${payload?payload:"/"}"> Go to the Home Page</a>`,
          showConfirmButton: false,
          background: "#212529",
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideo.pending, (state) => {
        state.videoLoding = true;
      })
      .addCase(getVideo.fulfilled, (state, { payload }) => {
        state.videoLoding = false;
        state.video = payload; 
      })
      .addCase(getVideo.rejected, (state) => {
        state.videoLoding = false;
        state.videoErorr = true;
      });
  },
});

export const videos = videoSlice.reducer;
export const { showVideo } = videoSlice.actions;
