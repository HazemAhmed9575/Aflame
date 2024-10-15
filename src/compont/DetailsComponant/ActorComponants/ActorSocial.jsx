import React from "react";
import { useSelector } from "react-redux";
import {
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaHome,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ActorSocial = () => {
  const { actor } = useSelector((state) => state.actorDetails);
  const { socialLinks } = useSelector((state) => state.socalLinksReducer);

  return (
    <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 px-4">
      {/* Image Section */}
      <div className="flex justify-center md:justify-start h-full">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
          }
          alt={actor.name}
          className="h-auto w-full sm:w-96 rounded-md object-cover"
        />
      </div>

      {/* Social Links and Personal Info */}
      <div className="flex flex-col py-4 gap-y-4 text-base">
        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-4 text-[#0DCAF0] text-xl md:text-3xl mt-6">
          <Link
            to={`https://www.facebook.com/${socialLinks.facebook_id}`}
            className="hover:text-[#0839EF]"
          >
            <FaFacebook />
          </Link>
          <Link
            to={`https://x.com/${socialLinks.twitter_id}`}
            className="hover:text-[#0839EF]"
          >
            <FaTwitter />
          </Link>
          <Link
            to={`https://www.instagram.com/${socialLinks.instagram_id}`}
            className="hover:text-[#0839EF]"
          >
            <FaInstagram />
          </Link>
          <Link
            to={`https://www.tiktok.com/${socialLinks.tiktok_id}`}
            className="hover:text-[#0839EF]"
          >
            <FaTiktok />
          </Link>
          <Link
            to={`https://www.youtube.com/${socialLinks.youtube_id}`}
            className="hover:text-[#0839EF]"
          >
            <FaYoutube />
          </Link>
          <Link to="/" className="hover:text-[#0839EF]">
            <FaHome />
          </Link>
        </div>

        {/* Personal Info Section */}
        <div className="flex flex-col py-4 gap-y-4">
          <h1 className="text-white text-2xl">Personal Info</h1>

          <div className="gap-4">
            <h1 className="text-white text-xl">Known For</h1>
            <p className="text-[#0DCAF0]">{actor.known_for_department}</p>
          </div>

          <div className="gap-4">
            <h1 className="text-white text-xl">Known Credits</h1>
            {/* <p className="text-[#0DCAF0]">{Credit}</p> */}
          </div>

          <div className="gap-4">
            <h1 className="text-white text-xl">Gender</h1>
            <p className="text-[#0DCAF0]">
              {actor.gender === 2 ? "Male" : "Female"}
            </p>
          </div>

          <div className="gap-4">
            <h1 className="text-white text-xl">Birthday</h1>
            <p className="text-[#0DCAF0]">
              {actor.birthday ? actor.birthday : "Sorry, there is no birthday"}
            </p>
          </div>

          <div className="gap-4">
            <h1 className="text-white text-xl">Place of Birth</h1>
            <p className="text-[#0DCAF0]">
              {actor.place_of_birth
                ? actor.place_of_birth
                : "Sorry, there is no place of birth"}
            </p>
          </div>

          <div className="gap-4">
            <h1 className="text-white text-xl">Also Known As</h1>
            {actor?.also_known_as && actor.also_known_as.length > 0 ? (
              actor.also_known_as.map((word, index) => (
                <p key={index} className="text-[#0DCAF0]">
                  {word}
                </p>
              ))
            ) : (
              <p className="text-[#0DCAF0]">Sorry, there is no known </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorSocial;
