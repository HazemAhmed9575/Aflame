import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Erorr from "../Erorr";
import Loding from "../Loding";

const Cast = () => {
  const { cast,craditErorr,craditLoding } = useSelector((state) => state.cradit);
  const { Subject, id, name } = useParams();
  if (craditErorr){
    return <Erorr/>
  }
  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-4 max-h-screen p-4">
      {craditLoding&&<Loding/>}
      <div>
        <h1 className="text-[#0DCAF0] font-semibold text-2xl p-4">
          Top Billed Cast
        </h1>
      </div>

      <div className="relative overflow-x-auto whitespace-nowrap flex items-start p-4">
        {cast.slice(0, 10).map((member, index) => (
          <Link
            key={index}
            className="gapx-3 inline-flex px-2 rounded flex-col h-96 w-56"
          >
            <div className="h-4/6 w-full overflow-hidden rounded-t-md">
              {" "}
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                }
                className="w-full h-full object-cover"
                alt={member.name}
              />
            </div>

            <div className="h-2/6 p-5 text-start bg-[#212529] rounded-b-xl">
              {" "}
              <div className="text-white font-semibold text-base">
                {member.name}
              </div>
              <p className="text-gray-400 text-sm leading-tight text-balance">
                {member.character}
              </p>
            </div>
          </Link>
        ))}
        <Link
          to={`/${Subject}/${id}/${name}/cast`}
          className="h-96  bg-[#212529] rounded gap-4 text-white p-4 flex justify-center items-center rounded-b-xl hover:text-[#CAC1A2] "
        >
          Show more <FaArrowRightLong />
        </Link>
      </div>
      <Link
        to={`/${Subject}/${id}/${name}/cast`}
        className="text-[#0DCAD1] hover:text-[#CAC1A2] p-4"
      >
        Full Cast & Crew
      </Link>
    </div>
  );
};

export default Cast;
