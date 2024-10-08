import React from "react";
import { AiFillPlaySquare, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Erorr from "../Erorr";

function RightDetails() {
  const { Subject, id, name } = useParams();
  const { moveDetails } = useSelector((state) => state.details);
  const { moveWords } = useSelector((state) => state.moveWordes);
  const { sriesWord } = useSelector((state) => state.seriesWords);
  const words = sriesWord || []; // Set to an empty array if undefined

  console.log(moveDetails);

  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const sries = (
    <div className="lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 lg:flex lg:flex-col lg:items-start gap-y-6 flex flex-col items-center w-full text-white text-xl font-medium">
      <div className="flex justify-center gap-x-4 text-[#0DCAF0] text-2xl">
        <Link
          to={`https://www.themoviedb.org/tv/${id}-${name}/watch?locale=ES`}
        >
          <AiFillPlaySquare className="hover:text-[#0839EF]" />
        </Link>

        <Link to={moveDetails.homepage}>
          <AiOutlineHome className="hover:text-[#0839EF]" />
        </Link>
      </div>

      {/* Original Name */}
      <div className="flex flex-col items-center lg:flex lg:flex-col lg:items-start">
        <h1>Original Name</h1>
        <h5 className="text-[#0DCAF0]">{moveDetails.original_name}</h5>
      </div>

      {/* Status */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]">{moveDetails.status}</h5>
      </div>

      {/* Network */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Network</h1>
        <div className="w-20">
          {moveDetails?.networks ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${moveDetails.networks[0].logo_path}`}
              alt=""
            />
          ) : (
            "no networks"
          )}
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Type</h1>
        <h5 className="text-[#0DCAF0]">{moveDetails.type}</h5>
      </div>

      {/* Original Language */}
      <div>
        <h1 className="flex flex-col items-center lg:flex-col lg:items-start">
          Original Language
        </h1>
        <h5 className="text-[#0DCAF0]">
          {moveDetails.spoken_languages &&
          moveDetails.spoken_languages.length > 0
            ? Object.values(moveDetails.spoken_languages[0]).join(":") // Join values if more than one
            : ""}
        </h5>
      </div>

      {/* Keywords */}
      <div className="flex flex-col items-start w-full">
        <h1 className="text-[#0DCAF0]">Keywords</h1>
        <div className="flex flex-wrap gap-2">
          {/* Wrap keywords */}
          {words.map(({ name }, index) => (
            <button
              key={index}
              className="bg-white text-black rounded-md p-1 text-sm border border-gray-600 transition duration-300 ease-in-out transform hover:bg-[#3F3E3E] hover:text-[#0DCAF0] hover:text-xl hover:scale-105"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const move = (
    <div className="lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 lg:flex lg:flex-col gap-y-6 flex flex-col items-start  text-white text-xl font-medium">
      <div className="flex gap-x-4 text-[#0DCAF0] text-2xl ">
        <Link
          to={`https://www.facebook.com/${name}`}
          className="hover:text-[#0839EF]"
        >
          <FaFacebook />
        </Link>
        <Link to={`https://x.com/${name}`} className="hover:text-[#0839EF]">
          <FaTwitter />
        </Link>
        <Link
          to={`https://www.instagram.com/${name}`}
          className="hover:text-[#0839EF]"
        >
          <FaInstagram />
        </Link>
        <Link to={moveDetails.homepage} className="hover:text-[#0839EF]">
          <AiOutlineHome />
        </Link>
      </div>
      {/* Status */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]  ">{moveDetails.status}</h5>
      </div>

      {/* Original Language */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Original Language</h1>
        <h5 className="text-[#0DCAF0] text-center">
          {moveDetails.original_language?.toUpperCase() || "N/A"}
        </h5>
      </div>
      {/* Budget */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Budget</h1>
        <h5 className="text-[#0DCAF0]">
          {moveDetails.budget
            ? `$${Intl.NumberFormat().format(moveDetails.budget)}`
            : "-"}
        </h5>
      </div>
      {/* Revenue */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Revenue</h1>
        <h5 className="text-[#0DCAF0]">
          {moveDetails.revenue === 0
            ? "-"
            : `$${Intl.NumberFormat().format(moveDetails.revenue)}`}
        </h5>
      </div>

      {/* Keywords */}
      <div className="flex flex-col items-start w-full">
        <h1 className="text-[#0DCAF0] text-2xl mb-4">Keywords</h1>
        <div className="flex flex-wrap gap-2">
          {" "}
          {/* Wrap keywords */}
          {moveWords?.map(({ name }, index) => (
            <button
              key={index}
              className="bg-white text-black rounded-md p-1 text-sm border border-gray-600 transition duration-300 ease-in-out transform hover:bg-[#3F3E3E] hover:text-[#0DCAF0] hover:text-xl hover:scale-105"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))

  return Subject == "movie" ? move : sries;
}

export default RightDetails;
