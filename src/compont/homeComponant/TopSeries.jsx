import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars"; // Import react-stars component
import { getTopSeriesData } from "../../redex/slices/homeSlices/topSeries";
import Erorr from "../Erorr";
import Loding from "../Loding";
import { useNavigate } from "react-router-dom";

const TopSeries = () => {
  const dispatch = useDispatch();
  const { seriesData, loding, erorr } = useSelector(
    (state) => state.seriesData
  );
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getTopSeriesData());
  }, [dispatch]);

  if (erorr) {
    return <Erorr />;
  }
 
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {loding && <Loding />}

      {seriesData?.map((series) => (
        <div
          key={series.id}
          className="max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white"
        >
          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.title}
          />
          <div className="px-6 py-4">
            <div className="font-medium text-xl mb-2">TITLE: {series.name}</div>
            <div className="flex items-center justify-between">
            <p className="text-gray-400 text-base">
              RATING: {series.vote_average}
            </p>
              <ReactStars
                count={5}
                value={series.vote_average / 2} // Assuming the rating is out of 10
                size={24}
                color2={"#ffd700"} // Star color
                edit={false} // Disable editing, display only
              />
            </div>
          </div>
          <div className="px-6 py-4 text-center">
            <button onClick={()=>navigate(`/tv/${series.id}/${series.name}`)} className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              DETAILS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSeries;
