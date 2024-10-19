import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMedia } from "../../../redex/slices/detailsSlices/media";
import { getDetalis } from "../../../redex/slices/detailsSlices/detalis";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { FaAngleLeft, FaAngleRight, FaLock } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const Posters = () => {
  const { postersMidiaArranged } = useSelector((state) => state.media);
  const { moveDetails } = useSelector((state) => state.details);
  const { Subject, id } = useParams();
  const dispatch = useDispatch();
  const releaseYear =
    Subject === "movie"
      ? moveDetails?.release_date?.slice(0, 4)
      : moveDetails?.first_air_date?.slice(0, 4);

  useEffect(() => {
    dispatch(getMedia({ Subject, id }));
    dispatch(getDetalis({ Subject, id }));
  }, [id]);
  const postersCategories = Object.keys(postersMidiaArranged);
  const initialCategory = postersCategories[0] || "No Language";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // Initial state should be empty or first category

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
            {postersCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xl flex justify-evenly ${
                  selectedCategory === category
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-300"
                }`}
              >
                {category} ({postersMidiaArranged[category].length})
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
          {postersMidiaArranged[selectedCategory]?.map((poster, index) => (
            <div
              key={index}
              className="bg-gray-900 text-white rounded-lg shadow-lg p-4 w-52"
            >
              {/* Image Section */}
              <div className="relative mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                  alt={`${poster.width}X${poster.height}`}
                  className="w-full border-2 border-white rounded-lg"
                />
                <div className="absolute top-0 right-0 bg-gray-800 p-1 rounded-bl-lg">
                  <h1 className="text-white">info</h1>
                </div>
              </div>

              {/* Lock Icon Section */}
              <div className="flex justify-between items-center px-4 py-2 border-2 border-white rounded-lg mb-4">
                <h1 className="text-white">info</h1>
                <FaLock className="text-white" />
              </div>

              {/* Details Section */}
              <div className="space-y-2">
                {/* Primary Section */}
                <div className="flex justify-between items-center">
                  <h1 className="text-white">Primary?</h1>
                  <FaWindowClose className="text-white cursor-pointer" />
                </div>

                {/* Size Section */}
                <div className="flex justify-between">
                  <h1 className="text-white">Size</h1>
                  <h1 className="text-blue-400">{`${poster.width}X${poster.height}`}</h1>
                </div>

                {/* Static Language Section */}
                <div className="flex justify-between flex-col">
                  <h1 className="text-white">Language</h1>
                  <h1 className="text-blue-400">{selectedCategory}</h1>{" "}
                  {/* Static display instead of dropdown */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posters;
