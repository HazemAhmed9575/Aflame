import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSeasons } from "../../redex/slices/detailsSlices/seasons";
import Loding from "../../compont/Loding";
import Erorr from "../../compont/Erorr";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { MdStar } from "react-icons/md";

function SeasonDetails() {
  const { Subject, id, name, seasonNumber } = useParams();
  const { Seasons, loding, erorr } = useSelector((state) => state.season);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasons({ id, seasonNumber }));
  }, [dispatch, seasonNumber, id]);

  if (erorr) {
    return <Erorr />;
  }
  if (loding) {
    return (
      <div className=" w-full lg:w-3/4  ">
        <Loding />
      </div>
    );
  }
  return (
    <div className="flex flex-col  gap-y-3">
      <div className="flex flex-col md:flex-row items-center p-4 bg-[#212529]">
        <img
          src={
            Seasons.poster_path == null
              ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
              : `https://image.tmdb.org/t/p/w500${Seasons.poster_path}`
          }
          alt={Seasons.original_title}
          className="rounded-lg shadow-lg w-20 md:w-40 mb-4"
        />
        <div className="md:ml-4 text-center md:text-left">
          <h1 className="text-2xl text-white font-bold">
            {Seasons.name}{" "}
            <span className="text-[#6C757D]">
              ({Seasons.air_date.slice(0, 4)})
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
        {Seasons.episodes.map((data, index) => (
          <div key={index} className="flex flex-col lg:w-full">
            <div className="  bg-[#212529] flex flex-col lg:w-full  lg:flex-row rounded-md">
              <div className=" lg:w-1/12  rounded-l-lg">
                <img
                  className="overflow-clip h-full"
                  src={
                    data.still_path == null
                      ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      : `https://image.tmdb.org/t/p/w500${data.still_path}`
                  }
                  alt=""
                />
              </div>

              <div className="w-full py-8 px-5 items-center flex flex-col gap-y-4">
                <div className="flex flex-col justify-center items-center gap-y-3 lg:flex-row lg:justify-between  w-full">
                  <div className=" flex flex-col lg:flex-row items-center  gap-4">
                    <h1 className="text-[#0DCAF0] text-3xl font-bold">
                      {data.episode_number}
                    </h1>
                    <div className="flex items-center justify-center h-8 bg-white text-[#212529] rounded-lg p-1 font-bold px-2">
                      <MdStar />
                      {data.vote_average}
                    </div>
                    <h1 className="text-white text-3xl font-bold">
                      {data.name}
                    </h1>
                  </div>

                  <div className="text-[#0DCAF0] text-center lg:text-start ">
                    <h1>{new Date(data.air_date).toDateString()}</h1>
                    <h1>{data.runtime}min</h1>
                  </div>
                </div>
                <h1 className="text-white text-center  lg:text-start sm:w-auto md:w-96 lg:w-full">
                  {data.overview}
                </h1>
              </div>
            </div>
            <Link
              to={`/${Subject}/${id}/${name}/cast`}
              className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4">
              Full Cast & Crew
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonDetails;
