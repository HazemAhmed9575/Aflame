import React from "react";
import { useSelector } from "react-redux";
import { MdStar } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
function LastSeasonComponant() {
  const { moveDetails } = useSelector((state) => state.details);

  return (
    <div className=" w-full lg:w-3/4  flex flex-col gap-y-7 max-h-screen ">
      <h1 className="text-[#0DCAF0] text-3xl font-bold">Last Season</h1>

      <div className="w-full bg-[#212529] flex  rounded-md">
        <div className="w-1/4 rounded-l-lg">
          <img
            className="rounded-l-lg"
            src={`https://image.tmdb.org/t/p/w500${
              moveDetails.seasons[moveDetails.seasons.length - 1].poster_path
            }`}
          />
        </div>

        <div className="flex flex-col text-white gap-y-5 py-6 px-3">
          <div className="flex gap-x-5">
            <button className="font-extrabold">
              {moveDetails.seasons[moveDetails.seasons.length - 1].name}
            </button>
            {/* div vote& dat */}
            <div className="flex gap-x-3 items-center font-bold font-sans ">
              {/* div vote */}
              <div className="flex items-center justify-center bg-white text-[#212529] rounded-lg p-1 font-bold px-2">
                <MdStar />
                {
                  moveDetails.seasons[moveDetails.seasons.length - 1]
                    .vote_average
                }
              </div>
              {/* end div vote */}
              <h1>
                {moveDetails.seasons[
                  moveDetails.seasons.length - 1
                ].air_date.slice(0, 4)}{" "}
                |{" "}
                {
                  moveDetails.seasons[moveDetails.seasons.length - 1]
                    .episode_count
                }{" "}
                Episodes
              </h1>
            </div>
            {/* end div vote& dat */}
          </div>

          <h1>
            {moveDetails.seasons[moveDetails.seasons.length - 1].overview == ""
              ? "There is no Overview for this Season"
              : moveDetails.seasons[moveDetails.seasons.length - 1].overview}
          </h1>
        </div>
      </div>

      <Link to={``} className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4">
        View All Seasons
      </Link>
    </div>
  );
}

export default LastSeasonComponant;