// _________________________________________________________________________________
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoIosPlayCircle, IoIosStarOutline } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { showVideo } from "../../redex/slices/detailsSlices/detailsHome";

// _________________________________________________________________________________

function Move_SriesDetails() {
  // data move_sriesDetails
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++
  const { Subject } = useParams();
  const { detais, crew, cast} = useSelector(
    (state) => state.DetailsHome
  );
  const dispatch = useDispatch();
  
  
  
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // style div backgroundImage
  let background = {
    backgroundImage: `url("https://image.tmdb.org/t/p/w500${detais.backdrop_path}")`,
  };
  // end style
  return (
    <div
      style={ background}
      className=" bg-no-repeat bg-center bg-cover w-full md:sm:py-5 relative ">
      {/* h1 move & serias Details */}
      <div className=" text-center p-7 z-75 relative ">
        <h1 className="font-semibold text-4xl  text-[#0DCAF0] ">
          {Subject == "movie" ? "Movie" : "Series"} - Details
        </h1>
      </div>
      {/* end h1 move & serias Details */}

      {/* Detailse */}
      <div className="flex lg:flex-row flex-col justify-center items-center gap-x-6 z-75 relative">
        {/* img */}
        <div className="flex lg:justify-end justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${detais.poster_path}`}
            className="h-full w-3/4"
            alt=""
          />
        </div>
        {/* end img */}
        {/* Detailse name & OverView & Casting & video & bouton */}
        <div className=" flex flex-col justify-start gap-y-10 w-7/12  ">
          <div className=" flex flex-col lg:justify-start lg:items-start items-center justify-center  text-white gap-y-4 ">
            <h1 className="text-4xl p-2 font-medium">
              {Subject == "movie" ? detais.original_title : detais.name}
            </h1>
            <p className="text-base  font-medium ">
              {Subject == "movie" ? detais.release_date : detais.first_air_date}{" "}
              ({detais.original_language}) 👉{" "}
              {detais.genres?.map((genres) => (
                <span key={genres.id}>{genres.name},</span>
              ))}
              👈{" "}
              {Subject == "tv"
                ? `Episode Run Time : ${detais.episode_run_time} min`
                : `${Math.round(detais.runtime / 60)}h ${
                    detais.runtime - Math.round(detais.runtime / 60) * 60
                  }min`}{" "}
            </p>
            <div >
              <span className="text-4xl text-[#0DCAF0] ">OverView : </span>
              <p className="inline text-base font-medium">{detais.overview}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 ">
            <h1 className="text-4xl text-[#0DCAF0] ">Casting :</h1>
            {/*  */}
            <div className="flex justify-evenly   text-white">
              <div className="text-center">
                <h3 className="text-xl">{cast[0]?.name}</h3>
                <h3 className="text-[#FFC117] text-base">
                Acting
                </h3>
              </div>

              <h1>||</h1>

              <div className="text-center">
                <h3 className="text-xl">{cast[1]?.name}</h3>
                <h3 className="text-[#FFC117] text-base">
                Acting
                </h3>
              </div>
            </div>
            {/*  */}

            <div className="flex justify-evenly  text-white">
              <div>
                <h3 className="text-xl">
                  {crew.filter((data) => data.job == "Producer")[0]
                    ? crew.filter((data) => data.job == "Producer")[0]
                        .original_name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Production</h3>
              </div>

              <h1>||</h1>
              <div>
                <h3 className="text-xl">
                  {crew.filter((data) => data.job == "Director")[0]
                    ? crew.filter((data) => data.job == "Director")[0]
                        .original_name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Directing</h3>
              </div>

              <h1>||</h1>
              <div>
                <h3 className="text-xl">
                  {crew.filter((data) => data.job == "Producer")[1]
                    ? crew.filter((data) => data.job == "Producer")[1].name
                    : ""}
                </h3>
                <h3 className="text-[#FFC117] text-base">Production</h3>
              </div>
            </div>
          </div>
          <div className=" flex justify-evenly items-center">
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
              onClick={() => dispatch(showVideo())}
              className="text-white flex flex-col items-center">
              {" "}
              <IoIosPlayCircle className="text-red-500 text-4xl" /> Play Trailer
            </button>
          </div>
          <div className="text-center">
            <button onClick={()=>window.history.go(-1)} className="py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black">
              Back a step
            </button>
          </div>
        </div>
        {/* end Detailse name & OverView & Casting & video & bouton */}
      </div>
      {/* end Detailse */}
      {/* div transparent */}
      <div className="w-full h-full absolute top-0 transparent "></div>
    </div>
  );
}

export default Move_SriesDetails;
