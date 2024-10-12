import React, { useEffect } from "react";
import { getDetalis } from "../../redex/slices/detailsSlices/detalis";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { gitSocial, toggleReview } from "../../redex/slices/detailsSlices/Social";
import { FaStar } from "react-icons/fa";

const ReviewsPage = () => {
  const { moveDetails } = useSelector((state) => state.details);
  const { review, expandedReviews } = useSelector((state) => state.reviews);
  const { Subject, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetalis({ Subject, id }));
    dispatch(gitSocial({ id }));
  }, [dispatch, id, Subject]);

  const releaseYear = moveDetails?.release_date
    ? moveDetails.release_date.slice(0, 4)
    : "N/A";

  const handleToggleReview = (index) => {
    dispatch(toggleReview(index)); // Dispatch action to toggle visibility
  };

  return (
    <div className="text-white w-full min-h-screen bg-[#121212]">
      {/* Movie Details Header */}
      <div className="flex flex-col md:flex-row items-center p-4 bg-[#212529] shadow-md ">
        <img
          src={`https://image.tmdb.org/t/p/w500${moveDetails?.poster_path}`}
          alt={moveDetails?.original_title}
          className="rounded-lg shadow-lg w-24 md:w-36 m-4"
        />
        <div className="md:ml-4 text-center md:text-left">
          <h1 className="text-3xl font-bold">
            {Subject === "movie" ? moveDetails?.title : moveDetails?.name}{" "}
            <span className="text-[#6C757D] text-xl">({releaseYear})</span>
          </h1>
          <p
            className="flex items-center text-gray-400 mt-2 cursor-pointer hover:text-[#C7BAA1]"
            onClick={() => window.history.go(-1)}
          >
            <HiMiniArrowSmallLeft className="mr-2" /> Back to main
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="p-6 space-y-8">
        {review.map(
          (
            { author, formattedDate, content, author_details: { rating } },
            index
          ) => (
            <div
              key={index}
              className="bg-[#1f1f1f] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:max-w-3xl mx-auto"
            >
              {/* Review Author Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-lg font-bold text-gray-100 mr-4">
                  {author.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">
                    A review by{" "}
                    <span className=" text-[#00BFFF]">{author}</span>
                  </h1>
                  <p>
                    Written on{" "}
                    <span className=" text-[#00BFFF]">{formattedDate}</span>
                  </p>
                </div>
                {rating && (
                  <div className="ml-auto flex items-center bg-[#333] p-2 rounded-md text-yellow-400">
                    <FaStar className="mr-1" /> {rating}
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div>
                <h2 className="text-md font-semibold text-[#0F68F6] mb-2">
                  Content:
                </h2>
                <p className="text-gray-300 text-sm">
                  {content.length > 150 && !expandedReviews[index]
                    ? `${content.slice(0, 150)}...`
                    : content}
                </p>
                {content.length > 150 && (
                  <button
                    className="text-[#00BFFF] mt-2 hover:underline"
                    onClick={() => handleToggleReview(index)}
                  >
                    {expandedReviews[index] ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
