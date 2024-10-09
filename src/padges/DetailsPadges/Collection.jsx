import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollection } from "../../redex/slices/detailsSlices/collection";

function Collection() {
  const { dataCollection } = useSelector((state) => state.collection);
  const { moveDetails } = useSelector((state) => state.details);
  const dispatch = useDispatch();

  // Ensure moveDetails and its properties exist before dispatching the action
  useEffect(() => {
    if (moveDetails && moveDetails.belongs_to_collection) {
      dispatch(getCollection(moveDetails.belongs_to_collection.id));
    }
  }, [dispatch]);

  // Safe handling of background image
  let background = {
    backgroundImage: dataCollection?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/w500${dataCollection.backdrop_path}")`
      : "none",
  };

  return (
    <div className=" h-[85vh] w-full ">
      <div
        style={background}
        className="bg-no-repeat bg-center bg-cover w-full h-full flex gap-7"
      >
        {/* Poster Image */}
        <div className="flex justify-end items-center w-1/4">
          <div className="w-4/5">
            {dataCollection.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${dataCollection.poster_path}`}
                alt="Poster"
              />
            ) : (
              <div className="text-white">No Image Available</div>
            )}
          </div>
        </div>

        {/* Collection Details */}
        <div className="text-white font-medium flex flex-col justify-center gap-5">
          <h1 className="text-3xl">
            {dataCollection.name || "Unknown Collection"}
          </h1>

          {/* Genres */}
          <p>
            {moveDetails.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}, </span>
            )) || "No genres available"}
          </p>

          {/* Overview */}
          <div>
            <h1 className="text-[#0DCAF0] text-2xl">Overview :-</h1>
            <p>{dataCollection.overview || "No overview available"}</p>
          </div>

          {/* Number of Movies */}
          <h1 className="text-[#0DCAF0] text-2xl">
            Number of Movies:{" "}
            <span className="text-white">
              {dataCollection.parts?.length || 0}
            </span>
          </h1>

          {/* Revenue */}
          <h1 className="text-[#0DCAF0] text-2xl">
            Revenue:{" "}
            <span className="text-white">
              {moveDetails.revenue
                ? `$${Intl.NumberFormat().format(moveDetails.revenue)}`
                : "-"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Collection;
