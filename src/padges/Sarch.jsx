import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Erorr from "../compont/Erorr";
import ReactStars from "react-stars";
import Loding from "../compont/Loding";
import { gitSearchPadgData } from "../redex/slices/sarchpadges";
function Sarch() {
  const { search, searchCategore } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.searchpadges);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(gitSearchPadgData({ search, searchCategore }));
  }, [search, searchCategore]);

  if (error) {
    return (
      <div className="w-full max-h-screen flex items-center justify-center">
        <Erorr />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full px-4">
      {loading && <Loding />}

      <h1 className="text-[#0DCAF0] text-2xl sm:text-3xl md:text-4xl font-bold p-2">
        Search in {searchCategore == "movie" ? "movie" : "Series"}
      </h1>

      <div className="flex flex-wrap justify-center gap-6 p-6 w-full">
        {data?.map((data) => (
          <div
            key={data.id}
            className="flex flex-col max-w-sm sm:max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white w-full sm:w-auto">
            <img
              className="w-full"
              src={
                data.poster_path == null
                  ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  : `https://image.tmdb.org/t/p/w500${data.poster_path}`
              }
              alt={data.name}
            />
            <div className="px-6 py-4">
              <p className="font-bold text-xl mb-2">
                TITLE: {searchCategore == "movie" ? data.title : data.name}
              </p>
              <div className="flex items-center justify-between">
                <p>RATE :{data.vote_average}</p>
                <ReactStars
                  count={5}
                  value={data.vote_average / 2} // Assuming the rating is out of 10
                  size={24}
                  color2={"#ffd700"} // Star color
                  edit={false} // Disable editing, display only
                />
              </div>
            </div>
            <div className="px-6 py-4 text-center">
              <button
                onClick={() =>
                  navigate(
                    `/${searchCategore == "movie" ? "movie" : "tv"}/${
                      data.id
                    }/${searchCategore == "movie" ? data.title : data.name}`
                  )
                }
                className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sarch;
