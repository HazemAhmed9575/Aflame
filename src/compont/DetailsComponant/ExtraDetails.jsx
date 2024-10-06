import React from "react";
import { AiFillPlaySquare, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
function ExtraDetails() {
  const { Subject, id, name } = useParams();
  const { detais } = useSelector((state) => state.DetailsHome);

  console.log(detais);

  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const sries = (
    <div className=" lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 flex flex-col gap-y-6 text-white text-xl font-medium">
      <div className="flex gap-x-4 text-[#0DCAF0] text-2xl ">
        <Link
          to={`https://www.themoviedb.org/tv/${id}-${name}/watch?locale=ES`}>
          <AiFillPlaySquare className="hover:text-[#0839EF]" />
        </Link>

        <Link to={detais.homepage}>
          <AiOutlineHome className="hover:text-[#0839EF]" />
        </Link>
      </div>
      {/* original Name */}
      <div>
        <h1>original Name</h1>
        <h5 className="text-[#0DCAF0]  ">{detais.original_name}</h5>
      </div>

      {/* Status */}
      <div>
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]">{detais.status}</h5>
      </div>
      {/* Network */}
      <div>
        <h1>Network</h1>
        {detais.networks?.map((data) => (
          <Avatar
            src={`https://image.tmdb.org/t/p/w500${data.logo_path}`}
            alt="avatar"
          />
        ))}
      </div>
      {/* Type */}
      <div>
        <h1>Type</h1>
        <h5 className="text-[#0DCAF0]">{detais.type}</h5>
      </div>
      {/* Original Language */}
      <div>
        <h1>Original Language</h1>
        <h5 className="text-[#0DCAF0]">
          {Object.values(detais.spoken_languages[0])}
        </h5>
      </div>
      {/* Keywords */}
      <div>
        <h1>Keywords</h1>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))
  const move = (
    <div className="lg:w-1/4 lg:absolute lg:right-0 lg:h-auto p-10 flex flex-col gap-y-6 text-white text-xl font-medium">
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
      <div>
        <h1>Status</h1>
        <h5 className="text-[#0DCAF0]  ">{detais.status}</h5>
      </div>

      {/* Original Language */}
      <div>
        <h1>Original Language</h1>
        <h5 className="text-[#0DCAF0]">
          {detais.original_language.toUpperCase()}
        </h5>
      </div>
      {/* Budget */}
      <div>
        <h1>Budget</h1>
        <h5 className="text-[#0DCAF0]">${detais.budget}</h5>
      </div>
      {/* Revenue */}
      <div>
        <h1>Revenue</h1>
        <h5 className="text-[#0DCAF0]">
          {detais.revenue == 0 ? "-" : detais.revenue}
        </h5>
      </div>

      {/* Keywords */}
      <div>
        <h1>Keywords</h1>
      </div>
    </div>
  );
  // (((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))

  return Subject == "movie" ? move : sries;
}

export default ExtraDetails;
