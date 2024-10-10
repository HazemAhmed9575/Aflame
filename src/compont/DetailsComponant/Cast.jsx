import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cast = () => {
  const { cast } = useSelector((state) => state.cradit);
  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-4 max-h-screen p-4">
      <div>
        <h1 className="text-[#0DCAF0] font-semibold text-2xl p-4">
          Top Billed Cast
        </h1>
      </div>

      <div className="relative overflow-x-auto whitespace-nowrap flex items-start p-4">
        {/*//<div className="relative overflow-x-auto flex items-start gap-4 px-4 scrollbar-hide"> */}
        {cast.slice(0, 10).map((member, index) => (
          <Link
            key={index}
            className="gapx-3 inline-flex px-2 rounded flex-col h-96 w-56" // Set fixed height for card
            //className="gapx-3 inline-flex px-2 rounded flex-col h-96 w-56 bg-[#212529] shadow-md"
          >
            <div className="h-4/6 w-full overflow-hidden rounded-t-md">
              {" "}
              {/* Use 4/6 height for the image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                className="w-full h-full object-cover"
                alt={member.name}
              />
            </div>

            <div className="h-2/6 p-5 text-start bg-[#212529] rounded-b-xl">
              {" "}
              {/* Use 2/6 height for the content */}
              <div className="text-white font-semibold text-base">
                {member.name}
              </div>
              <p className="text-gray-400 text-sm leading-tight text-balance">
                {member.character}
              </p>
            </div>
          </Link>
        ))}
        <Link className="h-96  bg-[#212529] rounded gap-4 text-white p-4 flex justify-center items-center rounded-b-xl hover:text-[#CAC1A2] ">
          Show more <FaArrowRightLong />
        </Link>

      </div>
      <Link className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4">Full Cast & Crew</Link>
    </div>
  );
};

export default Cast;
