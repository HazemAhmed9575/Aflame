import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopMoveData } from "../../redex/slices/homeSlices/topMove";
import ReactStars from "react-stars"; // Import react-stars component
import Loding from "../Loding";
import Erorr from "../Erorr";
import { useNavigate } from "react-router-dom";

const TopMoves = () => {
  const dispatch = useDispatch();
  const { movesData, loding, erorr } = useSelector((state) => state.moveData);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTopMoveData());
  }, [dispatch]);

  // Filter movies where the rating is greater than 7
  if (erorr) {
    return <Erorr />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {loding && <Loding />}
      {movesData?.map((move) => (
        <div
          key={move.id}
          className="max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white">
          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/w500${move.poster_path}`}
            alt={move.title}
          />
          <div className="px-6 py-4">
            <div className="font-medium text-xl mb-2"> TITLE: {move.title}</div>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-base">
                RATING: {move.vote_average}
              </p>
              <ReactStars
                count={5}
                value={move.vote_average / 2} // Assuming the rating is out of 10
                size={24}
                color2={"#ffd700"} // Star color
                edit={false} // Disable editing, display only
              />
            </div>
          </div>
          <div className="px-6 py-4 text-center">
            <button
              onClick={() => navigate(`/movie/${move.id}/${move.title}`)}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              DETAILS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopMoves;
