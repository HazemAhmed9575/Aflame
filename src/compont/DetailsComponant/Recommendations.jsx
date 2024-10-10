import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecommendations } from "../../redex/slices/detailsSlices/Recommendations";
import Loding from "../Loding";
import Erorr from "../Erorr";

function Recommendations() {
  const { error, loading, recommend } = useSelector(
    (state) => state.Recommendations
  );
  const { Subject, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendations({ Subject, id }));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loding />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Erorr />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-2 max-h-screen">
      <div>
        <h1 className="text-[#0DCAF0] font-semibold text-2xl">Recommendations</h1>
      </div>

      <div className="relative overflow-x-auto overflow-y-hidden whitespace-nowrap">
        {recommend
          .filter((data) => data.poster_path) 
          .map((data, index) => (
            <Link
              to={`/${Subject}/${data.id}/${data.title}`}
              key={index}
              className="w-80 gap-3 inline-flex p-3 m-2 rounded flex-col bg-[#212529]"
            >
              <div className="lg:h-1/2 w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  className="w-full h-full"
                  alt={data.title || data.name}
                />
              </div>

              <div className="flex justify-between items-center">
                <h4 className="text-white">
                  {Subject === "movie" ? data.title : data.name}
                </h4>
                <h4 className="text-[#0dcaf0]">
                  {Math.trunc(data.vote_average * 10)}%
                </h4>
              </div>
            </Link>
          ))}

        
      </div>
    </div>
  );
}

export default Recommendations;
