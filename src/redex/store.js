import { configureStore } from "@reduxjs/toolkit";
import { contact } from "./slices/contactSlice";

import {movePhotoReducer} from "./slices/homeSlices/movePhotoSlice"
import {seriesPhotoReducer} from "./slices/homeSlices/seriesPhotoSlice"
import { moveData } from './slices/homeSlices/topMove';
import { seriesData } from './slices/homeSlices/topSeries';
import { series } from "./slices/seriesSlice";
import { moves } from "./slices/moviesSlice";
import { DetailsMoveSriesSlices } from "./slices/detailsSlices/move_sriesDetails";

const store = configureStore({
  reducer: {
    contact,
    movePhotoReducer,
    seriesPhotoReducer,
    moveData,
    seriesData,
    moves,
    series,
    DetailsMoveSriesSlices
  },
});


export default store;
