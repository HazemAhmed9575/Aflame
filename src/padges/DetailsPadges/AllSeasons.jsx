import React, { useEffect } from "react";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdStar } from "react-icons/md";
import Erorr from "../../compont/Erorr";
import Loding from "../../compont/Loding";
import { getDetalis } from "../../redex/slices/detailsSlices/detalis";
function AllSeasons() {
  const { moveDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.details
  );
  const { Subject, id, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetalis({ Subject, id }));
  }, [id]);

  if (detailsError) {
    return <Erorr />;
  }
  if (detailsLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Loding />{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col  gap-y-5">
      <div className="flex flex-col md:flex-row items-center p-4 bg-[#212529]">
        <img
          src={`https://image.tmdb.org/t/p/w500${moveDetails?.poster_path}`}
          alt={moveDetails?.original_title}
          className="rounded-lg shadow-lg w-20 md:w-40 mb-4"
        />
        <div className="md:ml-4 text-center md:text-left">
          <h1 className="text-2xl text-white font-bold">
            {moveDetails.name}{" "}
            <span className="text-[#6C757D]">
              ({moveDetails.first_air_date.slice(0, 4)})
            </span>
          </h1>
          <p
            className="flex items-center text-gray-400 mt-2 cursor-pointer hover:text-[#C7BAA1]"
            onClick={() => window.history.go(-1)}>
            <HiMiniArrowSmallLeft className="mr-2" /> Back to main
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center lg:w-full items-center gap-y-12 p-12">
        {moveDetails.seasons.map((data, index) => (
          <div
            key={index}
            className="  bg-[#212529] flex flex-col lg:w-full lg:flex-row rounded-md">
            <button className=" lg:w-1/6  rounded-l-lg">
              <img
                onClick={() =>
                  navigate(
                    `/${Subject}/${id}/${name}/season/${data.season_number}`
                  )
                }
                className="rounded-l-lg"
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              />
            </button>

            <div className="flex flex-col justify-center items-center lg:items-start p-5 text-white gap-y-5 py-6 px-3">
              <div className="flex flex-col lg:flex-row justify-center gap-y-5 lg:gap-x-5">
                <button
                  onClick={() =>
                    navigate(
                      `/${Subject}/${id}/${name}/season/${data.season_number}`
                    )
                  }
                  className="font-bold text-3xl hover:text-gray-400">
                  {data.name}
                </button>
                {/* div vote& dat */}
                <div className="flex  flex-col gap-y-3   lg:flex-row  lg:gap-x-3 items-center font-bold font-sans ">
                  {/* div vote */}
                  <div className="flex items-center justify-center bg-white text-[#212529] rounded-lg p-1 font-bold px-2">
                    <MdStar />
                    {data.vote_average}
                  </div>
                  {/* end div vote */}
                  <h1>
                    {data.air_date.slice(0, 4)} | {data.episode_count} Episodes
                  </h1>
                </div>
                {/* end div vote& dat */}
              </div>
              <div className="flex flex-col justify-center items-center gap-y-3 lg:flex-row lg:gap-x-3">
                <h1>
                  Season{" "}
                  <span className="text-[#0DCAF0]">{data.season_number}</span>{" "}
                  of
                </h1>
                <h1 className="underline underline-offset-8">{name}</h1>
                <h1>premiered on </h1>
                <h1 className="text-[#0DCAF0]">
                  {new Date(data.air_date).toDateString()}
                </h1>
              </div>

              <div className="text-center  lg:text-start sm:w-auto md:w-96 lg:w-full ">
                <h1>
                  {data.overview == ""
                    ? "There is no Overview for this Season"
                    : data.overview}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSeasons;
