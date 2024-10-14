import { configureStore } from "@reduxjs/toolkit";
import { contact } from "./slices/contactSlice";
import { movePhotoReducer } from "./slices/homeSlices/movePhotoSlice";
import { seriesPhotoReducer } from "./slices/homeSlices/seriesPhotoSlice";
import { moveData } from "./slices/homeSlices/topMove";
import { seriesData } from "./slices/homeSlices/topSeries";
import { series } from "./slices/seriesSlice";
import { moves } from "./slices/moviesSlice";
import { cradit } from "./slices/detailsSlices/cradits";
import { videos } from "./slices/detailsSlices/video";
import { details } from "./slices/detailsSlices/detalis";
import { moveWordes } from "./slices/detailsSlices/kayWordes/moveKayWordes";
import { seriesWords } from "./slices/detailsSlices/kayWordes/sriesKaywordes";
import { Recommendations } from "./slices/detailsSlices/Recommendations";
import { collection } from "./slices/detailsSlices/collection";
import { externalIds } from "./slices/detailsSlices/SocialLinks";
import { media } from "./slices/detailsSlices/media";
import { reviews } from "./slices/detailsSlices/Social";
import { season } from "./slices/detailsSlices/seasons";
import { actorDetails } from "./slices/detailsSlices/actorSlices/actorSlice";
import {socalLinksReducer}from "./slices/detailsSlices/actorSlices/socalLinksSlice"
import {actorCredit}from "./slices/detailsSlices/actorSlices/actorCredits"

const store = configureStore({
  reducer: {
    contact,
    movePhotoReducer,
    seriesPhotoReducer,
    moveData,
    seriesData,
    moves,
    series,
    cradit,
    videos,
    details,
    moveWordes,
    seriesWords,
    Recommendations,
    collection,
    externalIds,
    media,
    reviews,
    season,
    actorDetails,
    socalLinksReducer,
    actorCredit
  },
});

export default store;
