import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Erorr from "./../Erorr";
import Loding from "./../Loding";
import { Link, useParams } from "react-router-dom";
import { toggleReview } from "../../redex/slices/detailsSlices/Social";

const Social = () => {
  const { review, reviewError, reviewLoading, expandedReviews } = useSelector(
    (state) => state.reviews
  );
  const dispatch = useDispatch();
  const { Subject, id, name } = useParams();
  const handleToggleContent = (reviewId) => {
    dispatch(toggleReview(reviewId)); // Dispatch the toggle action
  };
  if (reviewError) {
    return <Erorr />;
  }
  return (
    <div className="flex flex-col p-4 lg:w-3/4">
      {reviewLoading && <Loding />}
      <div>
        <h1 className="text-[#0DCAF0] font-semibold text-2xl p-4">Social</h1>
      </div>
      <div className="p-0.5">
        <div>
          <button className="relative text-purple-500 text-lg uppercase tracking-widest bg-black py-2 px-4">
            {`REVIEWS ${review?.length}`}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500"></span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-[#2c2c2c] rounded-lg p-4 mb-4 shadow-lg text-white">
          {review.length > 0 ? (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-lg font-semibold">
                  {review[0]?.author.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-[#0DCAF0] font-bold">
                    <span className="text-white">A review by</span>{" "}
                    {review[0]?.author}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Written by{" "}
                    <span className="text-[#0DCAF0]">{review[0]?.author}</span>{" "}
                    on
                    <span className="text-[#0DCAF0]">
                      {review[0].formattedDate}
                    </span>
                    <span className="text-[#0DCAF0]"></span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-[#0D63C7] font-bold mb-2">Content :-</h2>
                <p>
                  {expandedReviews[review[0].id]
                    ? review[0].content // Show full content
                    : review[0].content.length > 150
                    ? `${review[0].content.slice(0, 150)}...`
                    : review[0].content}
                </p>
                {review[0].content.length > 150 && (
                  <button
                    className="text-[#0DCAF0] mt-2"
                    onClick={() => handleToggleContent(review[0].id)}
                  >
                    {expandedReviews[review[0].id] ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <h1>
              We don't have any reviews for{" "}
              <span className="text-[#0DCAF0]">{name}</span>
            </h1>
          )}
        </div>

        {review.length > 0 ? (
          <Link
            to={`/${Subject}/${id}/${name}/reviews`}
            className="text-[#0DCAF0] hover:underline mt-2 block"
          >
            Read All Reviews
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Social;
