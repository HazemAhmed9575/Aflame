import React, { useEffect } from "react";
import Pagination from "../compont/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getMoveData, setPagin } from "../redex/slices/moviesSlice";
import ReactStars from "react-stars";
import Loding from "../compont/Loding";
import Erorr from "../compont/Erorr";
import { useNavigate } from "react-router-dom";

function Move() {
  const { pageNumber, moveData, loading, error } = useSelector((state) => state.moves);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // Fetch movie data when component mounts or when pageNumber changes
  useEffect(() => {
    dispatch(getMoveData());
    dispatch(setPagin(true))
  }, [dispatch, pageNumber]);
  if(error){
    return <Erorr/>
  }

  return (
    
    <div className="flex flex-col justify-center items-center w-full px-4">

  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-2">Move</h1>
  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-2">
  <span className="block sm:inline">PAGE NUMBER</span>
  <span className="block text-[#0DCAF0] text-info text-2xl sm:text-3xl md:text-4xl font-bold p-2 sm:inline">
    {pageNumber}
  </span>
  <span className="block sm:inline">FROM</span>
  <span className="block text-[#0DCAF0] text-info text-2xl sm:text-3xl md:text-4xl font-bold p-2 sm:inline">
    500
  </span>
</h1>


{loading&& <Loding/>}

      {/* Loading or Error handling */}
      
      

      {/* Display Movie Data */}
      <div className="flex flex-wrap justify-center gap-6 p-6 w-full">
        {moveData.length === 1 ? (
          // When only one movie is displayed
          <div
            key={moveData[0].id}
            className="flex flex-col max-w-sm sm:max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white w-full sm:w-auto"
          >
            <img
              className="w-full"
              src={`https://image.tmdb.org/t/p/w500${moveData[0].poster_path}`}
              alt={moveData[0].title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">TITLE: {moveData[0].title}</div>
              <div className="flex items-center justify-between">
              <p className="text-gray-400 text-base">RATING: {moveData[0].vote_average}</p>
                <ReactStars
                  count={5}
                  value={moveData[0].vote_average / 2} // Assuming the rating is out of 10
                  size={24}
                  color2={"#ffd700"} // Star color
                  edit={false} // Disable editing, display only
                />
              </div>
            </div>
            <div className="px-6 py-4 text-center">
              <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                DETAILS
              </button>
            </div>
          </div>
        ) : (
          // When multiple movies are displayed
          moveData.map((move) => (
            <div
              key={move.id}
              className="flex flex-col max-w-sm sm:max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white w-full sm:w-auto"
            >
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${move.poster_path}`}
                alt={move.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">TITLE: {move.title}</div>
                <p className="text-gray-400 text-base"> OVERVIEW: {move.overview.slice(0,10)} </p>
                <div className="flex items-center justify-between">
                <p className="text-gray-400 text-base">RATING: {move.vote_average}</p>
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
                <button onClick={()=>navigate(`/movie/${move.id}/${move.title}`)} className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  DETAILS
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Component */}
      <Pagination />
    </div>
  );
}

export default Move;
