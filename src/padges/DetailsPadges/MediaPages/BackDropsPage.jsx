import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMedia } from "../../../redex/slices/detailsSlices/media";
import { getDetalis } from "../../../redex/slices/detailsSlices/detalis";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BackDropsPage = () => {
  const { backdropsMidiaArranged } = useSelector((state) => state.media);
  const { Subject, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMedia({ Subject, id }));
    dispatch(getDetalis({ Subject, id }));
  }, [id]);
  const { moveDetails } = useSelector((state) => state.details);
  const releaseYear =
    Subject === "movie"
      ? moveDetails?.release_date?.slice(0, 4)
      : moveDetails?.first_air_date?.slice(0, 4);
  const backdropsCategories = Object.keys(backdropsMidiaArranged);
  const initialCategory = backdropsCategories[0] || "No Language";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const container = useRef(null);

  const scroll = (scrollOffset) => {
    container.current.scrollLeft += scrollOffset;
  };
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
      <div className="p-4">
        {/* Social Section */}
        <div className="text-[#0DCAF0] text-3xl p-8">Social</div>
        <div className="flex space-x-8 mb-4">
          <button onClick={() => scroll(-200)} className="text-2xl text-white">
            <FaAngleLeft />
          </button>
          <div
            ref={container}
            className="inline-flex gap-x-8 overflow-x-auto whitespace-nowrap w-full scrollbar-hide scroll-smooth"
            // Enable touch-based horizontal scrolling
          >
            {backdropsCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xl flex justify-evenly ${
                  selectedCategory === category
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-300"
                }`}
              >
                {category} ({backdropsMidiaArranged[category].length})
              </button>
            ))}
          </div>
          <button
            onClick={() => scroll(200)}
            className="text-2xl text-white float-right"
          >
            <FaAngleRight />
          </button>
        </div>
        {/* Posters Grid */}
        <div className="flex flex-wrap justify-evenly items-center gap-4 p-8 py-4 bg-[#212529] rounded-lg">
          {backdropsMidiaArranged[selectedCategory]?.map((backdrops, index) => (
            <div key={index} className=" rounded-lg  p-4 ">
              {/* Image Section */}
              <div className="relative mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrops.file_path}`}
                  alt={`${backdrops.width}X${backdrops.height}`}
                  className=" rounded-lg w-52 "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackDropsPage;
