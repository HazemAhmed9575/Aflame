import React from "react";
import { useSelector } from "react-redux";
import { MdStar } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loding from "../Loding";
import Erorr from "../Erorr";

function LastSeasonComponant() {
  const { Subject, id, name } = useParams();
  const { moveDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.details
  );
  const navigate = useNavigate();

  // Handle error state
  if (detailsError) {
    return <Erorr />;
  }

  // Handle loading state
  if (detailsLoading) {
    return (
      <div className="w-full lg:w-3/4">
        <Loding />
      </div>
    );
  }

  // Main content rendering
  return (
    <div className="flex flex-col justify-center w-full lg:w-3/4 items-center lg:items-start gap-y-8 lg:gap-y-12 rounded-lg">
      {detailsLoading && (
          <Loding />
      )}
      <h1 className="text-[#0DCAF0] text-2xl lg:text-3xl font-bold text-center lg:text-left">
        Last Season
      </h1>

      <div className="bg-[#212529] flex flex-col items-center lg:flex-row lg:items-start lg:w-full rounded-lg">
        <button
          onClick={() =>
            navigate(
              `/${Subject}/${id}/${name}/season/${
                moveDetails?.seasons[moveDetails.seasons.length - 1]
                  ?.season_number
              }`
            )
          }
          className="w-full lg:w-1/4 lg:rounded-l-lg"
        >
          <img
            className="w-full rounded-lg lg:rounded-l-lg object-cover"
            src={
              moveDetails?.seasons[moveDetails?.seasons?.length - 1]
                ?.poster_path == null
                ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                : `https://image.tmdb.org/t/p/w500${
                    moveDetails?.seasons[moveDetails?.seasons?.length - 1]
                      ?.poster_path
                  }`
            }
            alt="Last season poster"
          />
        </button>

        <div className="flex flex-col justify-center items-center lg:items-start p-5 text-white gap-y-5 lg:gap-y-3 py-6 px-3 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-center gap-y-3 lg:gap-x-5">
            <button
              onClick={() =>
                navigate(
                  `/${Subject}/${id}/${name}/season/${
                    moveDetails?.seasons[moveDetails.seasons.length - 1]
                      ?.season_number
                  }`
                )
              }
              className="font-extrabold hover:text-gray-400 text-xl text-center lg:text-left"
            >
              {moveDetails.seasons[moveDetails.seasons.length - 1]?.name}
            </button>
            {/* vote & date */}
            <div className="flex gap-x-3 items-center font-bold font-sans">
              {/* vote */}
              <div className="flex items-center justify-center bg-white text-[#212529] rounded-lg p-1 font-bold px-2">
                <MdStar />
                {
                  moveDetails.seasons[moveDetails.seasons.length - 1]
                    ?.vote_average
                }
              </div>
              {/* end vote */}
              <h1 className="text-center lg:text-left">
                {moveDetails?.seasons[
                  moveDetails?.seasons?.length - 1
                ].air_date?.slice(0, 4)}{" "}
                |{" "}
                {
                  moveDetails?.seasons[moveDetails?.seasons?.length - 1]
                    ?.episode_count
                }{" "}
                Episodes
              </h1>
            </div>
            {/* end vote & date */}
          </div>
          <div className="text-center lg:text-start w-full lg:w-auto lg:max-w-xl">
            <h1>
              {moveDetails?.seasons[moveDetails?.seasons?.length - 1]
                ?.overview === ""
                ? "There is no Overview for this Season"
                : moveDetails?.seasons[moveDetails?.seasons?.length - 1]
                    ?.overview}
            </h1>
          </div>
        </div>
      </div>

      <Link
        to={`/${Subject}/${id}/${name}/season`}
        className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4"
      >
        View All Seasons
      </Link>
    </div>
  );
}

export default LastSeasonComponant;
