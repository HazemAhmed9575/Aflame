import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCollection } from "../../redex/slices/detailsSlices/collection";

function PartofCollection() {
  const { moveDetails } = useSelector((state) => state.details);
  const navigate = useNavigate();
  const { dataCollection } = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(getCollection(moveDetails.belongs_to_collection.id));
  }, [dispatch]);

  let background = {
    backgroundImage: dataCollection?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/w500${dataCollection.backdrop_path}")`
      : "none",
  };

  return (
    <div
      style={background}
      className=" lg:w-3/4  flex flex-col gap-2  w-full  bg-no-repeat bg-center bg-cover rounded p-5 "
    >
      <div className="w-full text-center">
        <h1 className="text-white text-3xl">Part of {dataCollection?.name}</h1>
      </div>
      <div className="w-full flex flex-col gap-3 items-center font-bold">
        <h1 className="text-[#0DCAF0]">Includes :</h1>
        {dataCollection?.parts?.map((data, index) => (
          <li key={index} className="text-white">
            {data.title}
          </li>
        ))}

        <button
          onClick={() => navigate(`/collection/${moveDetails.belongs_to_collection.id}`)}
          className="py-1.5 px-10 text-base rounded-full text-[#0dcaf0] border-2  border-white hover:bg-white"
        >
          VIEW THE COLLECTION
        </button>
      </div>
    </div>
  );
}

export default PartofCollection;
