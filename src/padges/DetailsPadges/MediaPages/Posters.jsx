import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMedia } from "../../../redex/slices/detailsSlices/media";
import { getDetalis } from "../../../redex/slices/detailsSlices/detalis";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";

const Posters = () => {
  const { postersMidiaArranged } = useSelector((state) => state.media);
  const { moveDetails } = useSelector((state) => state.details);
  const { Subject, id } = useParams();
  const dispatch = useDispatch();
  console.log(postersMidiaArranged);
  const releaseYear =
    Subject === "movie"
      ? moveDetails?.release_date?.slice(0, 4)
      : moveDetails?.first_air_date?.slice(0, 4);
  useEffect(() => {
    dispatch(getMedia({ Subject, id }));
    dispatch(getDetalis({ Subject, id }));
  }, [id]);

  const [selectedCategory, setSelectedCategory] = useState("No LANGUAGE");
  const postersCategories = Object.keys(postersMidiaArranged);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center p-4 bg-[#212529] text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${moveDetails?.poster_path}`}
          alt={moveDetails?.original_title}
          className="rounded-lg shadow-lg w-20 md:w-20 mx-8"
        />
        <div className="md:ml-4 text-center md:text-left">
          <h1 className="text-2xl font-bold">
            {Subject === "movie" ? moveDetails?.title : moveDetails?.name}{" "}
            <span className="text-[#6C757D]">({releaseYear})</span>
          </h1>
          <p
            className="flex items-center text-gray-400 mt-2 cursor-pointer hover:text-[#C7BAA1]"
            onClick={() => window.history.go(-1)}
          >
            <HiMiniArrowSmallLeft className="mr-2" /> Back to main
          </p>
        </div>
      </div>
      <div className=" p-4 ">
        {" "}
        {/* Social Section */}
        <div className="text-[#0DCAF0] text-3xl p-8">Social</div>
        <div className="flex justify-center space-x-8 mb-4 ">
          {postersCategories.map((category) => (
            <button
              key={category}
              className={`text-xl   flex justify-evenly ${
                selectedCategory === category
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({postersMidiaArranged[category].length})
            </button>
          ))}
        </div>
        {/* Video Grid */}
        <div className="flex flex-col w-full gap-4 p-8 py-4 bg-[#212529] rounded-lg ">
          {postersMidiaArranged[selectedCategory]?.map((Poster, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posters;
