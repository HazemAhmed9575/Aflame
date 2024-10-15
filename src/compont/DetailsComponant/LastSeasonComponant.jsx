import React from "react";
import { useSelector } from "react-redux";
import { MdStar } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loding from "../Loding";
function LastSeasonComponant() {
  const { Subject, id, name } = useParams();
  const { moveDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.details
  );
  const navigate = useNavigate();

  if (detailsError) {
    return <div></div>;
  } else if (detailsLoading) {
    return (
      <div className=" w-full lg:w-3/4  ">
        <Loding />
      </div>
    );
  } else {
    return (
      <div className="  flex flex-col justify-center  w-full lg:w-3/4 items-center lg:items-start gap-y-12  rounded-lg">
        <h1 className="text-[#0DCAF0] text-3xl font-bold">Last Season</h1>

        <div
          className=" 
         bg-[#212529] flex flex-col items-center lg:flex-row lg:items-start lg:w-full  ">
          <button
            onClick={() =>
              navigate(
                `/${Subject}/${id}/${name}/season/${
                  moveDetails?.seasons[moveDetails.seasons.length - 1]
                    .season_number
                }`
              )
            }
            className="lg:w-1/4  lg:rounded-l-lg">
            <img
              className=" rounded-lg  lg:rounded-l-lg"
              src={
                moveDetails?.seasons[moveDetails.seasons.length - 1]
                  ?.poster_path == null
                  ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  : `https://image.tmdb.org/t/p/w500${
                      moveDetails?.seasons[moveDetails.seasons.length - 1]
                        ?.poster_path
                    }`
              }
            />
          </button>

          <div className="flex flex-col justify-center items-center lg:items-start p-5  text-white gap-y-5 py-6 px-3">
            <div className="flex flex-col lg:flex-row justify-center gap-y-5 lg:gap-x-5">
              <button
                onClick={() =>
                  navigate(
                    `/${Subject}/${id}/${name}/season/${
                      moveDetails?.seasons[moveDetails.seasons.length - 1]
                        .season_number
                    }`
                  )
                }
                className="font-extrabold hover:text-gray-400">
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
                    moveDetails?.seasons[moveDetails.seasons.length - 1]
                      .episode_count
                  }{" "}
                  Episodes
                </h1>
              </div>
              {/* end div vote& dat */}
            </div>
            <div className="text-center lg:text-start  w-96 lg:w-full">
              <h1>
                {moveDetails.seasons[moveDetails.seasons.length - 1].overview ==
                ""
                  ? "There is no Overview for this Season"
                  : moveDetails.seasons[moveDetails.seasons.length - 1]
                      .overview}
              </h1>
            </div>
          </div>
        </div>

        <Link
          to={`/${Subject}/${id}/${name}/season`}
          className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4">
          View All Seasons
        </Link>
      </div>
    );
  }
}

export default LastSeasonComponant;
