import React from "react";
import { AiFillPlaySquare, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
function RightDetails() {
  const { Subject, id, name } = useParams();
  const { detais } = useSelector((state) => state.DetailsHome);
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const sries = (
    <div className=" lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 lg:flex lg:flex-col lg:items-start gap-y-6 flex flex-col items-center  w-full text-white text-xl font-medium">
      <div className="flex justify-center gap-x-4 text-[#0DCAF0] text-2xl ">
        <Link
          to={`https://www.themoviedb.org/tv/${id}-${name}/watch?locale=ES`}>
          <AiFillPlaySquare className="hover:text-[#0839EF]" />
        </Link>

        <Link to={detais.homepage}>
          <AiOutlineHome className="hover:text-[#0839EF]" />
        </Link>
      </div>
      {/* original Name */}
      <div  className="flex flex-col items-center lg:flex lg:flex-col lg:items-start ">
        <h1>original Name</h1>
        <h5 className="text-[#0DCAF0]  ">{detais.original_name}</h5>
      </div>

      {/* Status */}
      <div  className="flex flex-col items-center lg:flex-col lg:items-start ">
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]">{detais.status}</h5>
      </div>
      {/* Network */}
      <div  className="flex flex-col items-center lg:flex-col lg:items-start ">
        <h1>Network</h1>
        <div className=" w-20 ">
{detais.networks[0]?
        <img src={`https://image.tmdb.org/t/p/w500${detais.networks[0].logo_path}`} alt="" />:"no networks"
}
        </div>
      </div>
      {/* Type */}
      <div  className="flex flex-col items-center lg:flex-col lg:items-start ">
        <h1>Type</h1>
        <h5 className="text-[#0DCAF0]">{detais.type}</h5>
      </div>
      {/* Original Language */}
      <div>
        <h1  className="flex flex-col items-center lg:flex-col lg:items-start ">Original Language</h1>
        <h5 className="text-[#0DCAF0]">
          {detais.spoken_languages[0]?Object.values(detais.spoken_languages[0]):""}
        </h5>
      </div>
      {/* Keywords */}
      <div className="flex flex-col items-start w-full">
        <h1 className="text-[#0DCAF0]">Keywords</h1>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const move = (
    <div className="lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 lg:flex lg:flex-col gap-y-6 flex flex-col items-center  text-white text-xl font-medium">
      <div className="flex gap-x-4 text-[#0DCAF0] text-2xl ">
        <Link
          to={`https://www.facebook.com/${name}`}
          className="hover:text-[#0839EF]">
          <FaFacebook />
        </Link>
        <Link to={`https://x.com/${name}`} className="hover:text-[#0839EF]">
          <FaTwitter />
        </Link>
        <Link
          to={`https://www.instagram.com/${name}`}
          className="hover:text-[#0839EF]">
          <FaInstagram />
        </Link>
        <Link to={detais.homepage} className="hover:text-[#0839EF]">
          <AiOutlineHome />
        </Link>
      </div>
      {/* Status */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]  ">{detais.status}</h5>
      </div>

      {/* Original Language */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Original Language</h1>
        <h5 className="text-[#0DCAF0]">
          {detais.original_language.toUpperCase()}
        </h5>
      </div>
      {/* Budget */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Budget</h1>
        <h5 className="text-[#0DCAF0]">${detais.budget}</h5>
      </div>
      {/* Revenue */}
      <div className="flex flex-col items-center lg:flex-col lg:items-start">
        <h1>Revenue</h1>
        <h5 className="text-[#0DCAF0]">
          {detais.revenue == 0 ? "-" : detais.revenue}
        </h5>
      </div>

      {/* Keywords */}
      <div className="flex flex-col items-start w-full">
        <h1 className="text-[#0DCAF0]">Keywords</h1>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))

  return Subject == "movie" ? move : sries;
}

export default RightDetails;
