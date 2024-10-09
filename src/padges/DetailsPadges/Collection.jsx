import React from "react";
import { useSelector } from "react-redux";

function Collection() {
  const { dataCollection } = useSelector((state) => state.collectiones);
  const { moveDetails } = useSelector((state) => state.details);
  let background = {
    backgroundImage: dataCollection?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/w500${dataCollection.backdrop_path}")`
      : "none",
  };
  return (
    <div className=" h-[85vh] w-full ">
      <div
        style={background}
        className="bg-no-repeat bg-center bg-cover w-full h-full flex gap-7 ">
        <div className="flex justify-end items-center   w-1/4">
          <div className="w-4/5">
            <img
              src={`https://image.tmdb.org/t/p/w500${dataCollection.poster_path}`}
              alt=""
            />
          </div>
        </div>
        <div className=" text-white  font-medium  flex flex-col justify-center   gap-5 ">
          <h1 className="text-3xl">{dataCollection.name}</h1>
          <p>
            {moveDetails.genres?.map((genres) => (
              <span key={genres.id}>{genres.name},</span>
            ))}
          </p>
          <div>
            <h1 className="text-[#0DCAF0] text-2xl">Overview :-</h1>
            <p className="">{dataCollection.overview}</p>
          </div>
          <h1 className="text-[#0DCAF0] text-2xl">
            Number of Movies :{" "}
            <span className="text-white">{dataCollection.parts.length}</span>
          </h1>
          <h1 className="text-[#0DCAF0] text-2xl">
            Revenue :{" "}
            <span className="text-white">
              {moveDetails.revenue === 0
                ? "-"
                : `$${Intl.NumberFormat().format(moveDetails.revenue)}`}
            </span>
          </h1>
        </div>
      </div>

    </div>
  );
}

export default Collection;
