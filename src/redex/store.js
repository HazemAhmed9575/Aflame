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
import { Recommendations } from "./slices/detailsSlices/Recommendations";
import { collection } from "./slices/detailsSlices/collection";
import { externalIds } from "./slices/detailsSlices/SocialLinks";
import { media } from "./slices/detailsSlices/media";
import { reviews } from "./slices/detailsSlices/Social";
import { season } from "./slices/detailsSlices/seasons";
import { actorDetails } from "./slices/detailsSlices/actorSlices/actorSlice";
import { socalLinksReducer } from "./slices/detailsSlices/actorSlices/socalLinksSlice";
import { kayWordes } from "./slices/detailsSlices/kayWords";
import { search } from "./slices/search";
import { searchpadges } from "./slices/sarchpadges";
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
    Recommendations,
    collection,
    externalIds,
    media,
    reviews,
    season,
    actorDetails,
    socalLinksReducer,
    kayWordes,
    search,
    searchpadges
  },
});

export default store;
