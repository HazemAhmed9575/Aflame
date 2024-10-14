import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { gitActorDetails } from "../../redex/slices/detailsSlices/actorSlice";

const ActorPage = () => {
  const { actorId } = useParams();
  const { actor } = useSelector((state) => state.actorDetails);

  const dispatch = useDispatch();
console.log(actorId);
console.log(actor);

  useEffect(() => {
    dispatch(gitActorDetails(actorId));
  }, [actorId, dispatch]);

  // Construct the full image URL
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
    : "https://via.placeholder.com/500x750"; // Fallback image if no profile picture

  return (
    <div className=" text-white min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Actor Image */}
          <div className="md:w-1/3 w-full flex ">
            <img
              src={imageUrl}
              alt={actor.name}
              className="rounded-lg shadow-lg w-full max-w-xs md:max-w-full"
            />
          </div>

          {/* Actor Details */}
          <div className="md:w-2/3 w-full mt-6 md:mt-0 md:ml-10">
            <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>
            <h2 className="text-2xl text-teal-400 mb-4">Biography</h2>
            <p className=" leading-relaxed">
              {actor.biography ? actor.biography : "Biography not available."}
            </p>

            {/* Actor Birthday and Place of Birth */}
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                <strong>Born: </strong>
                {actor.birthday ? actor.birthday : "N/A"}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Place of Birth: </strong>
                {actor.place_of_birth ? actor.place_of_birth : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
