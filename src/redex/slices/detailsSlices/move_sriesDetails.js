import { createSlice } from "@reduxjs/toolkit";

import Swal from "sweetalert2";

const initialState = {};

const move_sriesDetailsSlices = createSlice({
  name: "move_sriesDetailsSlices",
  initialState,
  reducers: {
    // fu alart video
    showVideo: (state, { payload }) => {
      Swal.fire({
        html: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${payload.key}?si=dFaN3MJ_NpFtMKqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        showConfirmButton: false,
        background: "#212529",
      });
    },
  },
});
export const DetailsMoveSriesSlices = move_sriesDetailsSlices.reducer;
export const { showVideo } = move_sriesDetailsSlices.actions;