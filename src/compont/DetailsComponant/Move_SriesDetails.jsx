import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoIosPlayCircle, IoIosStarOutline } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { showVideo } from "../../redex/slices/detailsSlices/video";

// _________________________________________________________________________________

function Move_SriesDetails() {
  // data move_sriesDetails
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++
  const { Subject } = useParams();
  const { moveDetails } = useSelector((state) => state.details);
  // const {video} =useSelector((state)=>state.videos)
  const { cast, crew } = useSelector((state) => state.cradit);
  const dispatch = useDispatch();
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // style div backgroundImage
  let background = {
    backgroundImage: moveDetails?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/w500${moveDetails.backdrop_path}")`
      : "none",
  };
  // end style
  return (
    <div
      style={background}
      className=" bg-no-repeat bg-center bg-cover w-full md:sm:py-5 relative ">
      {/* h1 move & serias moveDetails */}
      <div className=" text-center p-7 z-75 relative ">
        <h1 className="font-semibold md:text-4xl  text-[#0DCAF0]  text-base">
          {Subject == "movie" ? "Movie" : "Series"} - moveDetails
        </h1>
      </div>
      {/* end h1 move & serias moveDetails */}

      {/* moveDetailse */}
      <div className="flex lg:flex-row flex-col justify-center items-center gap-x-6 z-75 relative">
        {/* img */}
        <div className="flex lg:justify-end justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${moveDetails.poster_path}`}
            className="h-full w-3/4"
            alt=""
          />
        </div>
        {/* end img */}
        {/* moveDetailse name & OverView & Casting & video & bouton */}
        <div className=" flex flex-col justify-start gap-y-10 w-7/12  ">
          <div className=" flex flex-col lg:justify-start lg:items-start items-center justify-center  text-white gap-y-4 ">
            <h1 className="text-4xl p-2 font-medium">
              {Subject == "movie"
                ? moveDetails.original_title
                : moveDetails.name}
            </h1>
            <p className="text-base  font-medium ">
              {Subject == "movie"
                ? moveDetails.release_date
                : moveDetails.first_air_date}{" "}
              ({moveDetails.original_language}) 👉{" "}
              {moveDetails.genres?.map((genres) => (
                <span key={genres.id}>{genres.name},</span>
              ))}
              👈{" "}
              {Subject == "tv"
                ? `Episode Run Time :${moveDetails.episode_run_time} min`
                : ` ${Math.round(moveDetails.runtime / 60)}h ${
                    moveDetails.runtime -
                    Math.round(moveDetails.runtime / 60) * 60
                  }min`}
            </p>
            <div>
              <span className="text-4xl text-[#0DCAF0] ">OverView : </span>
              <p className="inline text-base font-medium">
                {moveDetails.overview}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 ">
            <h1 className="text-4xl text-[#0DCAF0]  ">Casting :</h1>
            {/*  */}
            <div className="flex justify-evenly   text-white flex-col sm:flex-row">
              <div className="text-center">
                <h3 className="text-xl">{cast[0]?.name}</h3>
                <h3 className="text-[#FFC117] text-base">Acting</h3>
              </div>

              <h1>||</h1>

              <div className="text-center">
                <h3 className="text-xl">{cast[1]?.name}</h3>
                <h3 className="text-[#FFC117] text-base">Acting</h3>
              </div>
            </div>
            {/*  */}

            <div className="flex justify-evenly  text-white flex-col sm:flex-row">
              <div>
                <h3 className="md:text-xl text-base">
                  {crew.filter((data) => data.job == "Producer")[0]
                    ? crew.filter((data) => data.job == "Producer")[0]
                        .original_name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Production</h3>
              </div>

              <h1>||</h1>
              <div>
                <h3 className="md:text-xl text-base">
                  {Subject == "movie"
                    ? crew.filter((data) => data.job == "Director")[0]
                      ? crew.filter((data) => data.job == "Director")[0]
                          .original_name
                      : ""
                    : crew.filter(
                        (data) => data.known_for_department == "Directing"
                      )[0]
                    ? crew.filter(
                        (data) => data.known_for_department == "Directing"
                      )[0].original_name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Directing</h3>
              </div>

              <h1>||</h1>
              <div>
                <h3 className="md:text-xl text-base">
                  {crew.filter((data) => data.job == "Producer")[1]
                    ? crew.filter((data) => data.job == "Producer")[1].name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Production</h3>
              </div>
            </div>
          </div>
          <div className=" flex justify-evenly items-center flex-col sm:flex-row">
            <button className="text-white flex flex-col items-center">
              {" "}
              <MdNoteAdd className="text-[#198754] text-4xl" />
              AddTo WatchList
            </button>
            <button className="text-white flex flex-col items-center">
              {" "}
              <IoIosStarOutline className="text-[#FFC117] text-4xl" /> Rate
              Movie
            </button>
            <button

              onClick={() => dispatch(showVideo(moveDetails.homepage
                ))}

              className="text-white flex flex-col items-center">
              {" "}
              <IoIosPlayCircle className="text-red-500 text-4xl" /> Play Trailer
            </button>
          </div>
          <div className="text-center ">
            <button
              onClick={() => window.history.go(-1)}
              className="py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black">
              Back a step
            </button>
          </div>
        </div>
        {/* end moveDetailse name & OverView & Casting & video & bouton */}
      </div>
      {/* end moveDetailse */}
      {/* div transparent */}
      <div className="w-full h-full absolute top-0 transparent "></div>
    </div>
  );
}

export default Move_SriesDetails;
