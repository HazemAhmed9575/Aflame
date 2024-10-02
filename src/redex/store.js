import { configureStore } from "@reduxjs/toolkit";
import { contact } from "./slices/contactSlice";
import {movePhotoReducer} from "./slices/homeSlices/movePhotoSlice"
import {seriesPhotoReducer} from "./slices/homeSlices/seriesPhotoSlice"
import { moveData } from './slices/homeSlices/topMove';
import { seriesData } from './slices/homeSlices/topSeries';

const store =configureStore({
reducer:{contact,movePhotoReducer,seriesPhotoReducer,moveData,seriesData},

})


export default store