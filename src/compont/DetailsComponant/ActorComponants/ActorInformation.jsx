import React from "react";
import { useSelector } from "react-redux";

const ActorInformation = () => {
  const { actor } = useSelector((state) => state.actorDetails);

  return (
    <div className="flex flex-col items-start w-full lg:w-2/3 px-4 py-8 ">
      {/* Actor Name */}
      <div className="mb-6">
        <h1 className="text-white text-4xl font-bold">{actor.name}</h1>
      </div>

      {/* Biography Section */}
      <div className="w-full">
        <h2 className="text-[#0DCAF0] text-2xl font-semibold mb-4">
          Biography
        </h2>
        <p className="text-white text-base leading-relaxed">
          {actor.biography ? (
            actor.biography
          ) : (
            <span>
              We don't have a biography for{" "}
              <span className="text-[#0DCAF0]">{actor.name}</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ActorInformation;
