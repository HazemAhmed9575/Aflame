import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCredits } from "../../redex/slices/detailsSlices/cradits";
import { getDetalis } from "../../redex/slices/detailsSlices/detalis";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import Erorr from "./../../compont/Erorr";
import Loding from "./../../compont/Loding";

const CastPage = () => {
  const {
    cast,
    crew,
    Art,
    Camera,
    MakeUp,
    Writing,
    Directing,
    Editing,
    Lighting,
    Sound,
    VisualEffects,
    supCrew,
    craditLoding,
    craditErorr,
  } = useSelector((state) => state.cradit);
  const { moveDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.details
  );
  console.log(crew);

  const { Subject, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCredits({ Subject, id }));
    dispatch(getDetalis({ Subject, id }));
  }, [dispatch, id, Subject]);

  const releaseYear =
    Subject === "movie"
      ? moveDetails?.release_date?.slice(0, 4)
      : moveDetails?.first_air_date?.slice(0, 4);
  if (craditErorr || detailsError) {
    return <Erorr />;
  }
  return (
    <div className="min-h-screen text-white flax flex-col justify-center items-center">
      {craditLoding || (detailsLoading && <Loding />)}
      {/* First Div: Movie Title and Back Button */}
      <div className="flex flex-col md:flex-row items-center p-4 bg-[#212529]">
        <img
          src={`https://image.tmdb.org/t/p/w500${moveDetails?.poster_path}`}
          alt={moveDetails?.original_title}
          className="rounded-lg shadow-lg w-20 md:w-40 mb-4"
        />
        <div className="md:ml-4 text-center md:text-left">
          <h1 className="text-2xl font-bold">
            {Subject == "movie" ? moveDetails?.title : moveDetails?.name}{" "}
            <span className="text-[#6C757D]">({releaseYear})</span>
          </h1>
          <p
            className="flex items-center text-gray-400 mt-2 cursor-pointer hover:text-[#C7BAA1]"
            onClick={() => window.history.go(-1)}
          >
            <HiMiniArrowSmallLeft className="mr-2" /> Back to main
          </p>
        </div>
      </div>

      {/* Second Div: Cast and Crew Sections */}
      <div className="flex flex-col justify-center items-center lg:flex-row  gap-4 m-4 lg:justify-evenly lg:items-start">
        {/* Cast Section */}
        <div className="flex flex-col p-4 gap-4 w-full md:w-1/2">
          <h1 className="text-4xl mb-4">
            Cast <span className="text-[#0DBDBB]">{cast.length}</span>
          </h1>
          <div className="rounded-lg p-4">
            {cast.map(({ name, profile_path, character, id }, index) => (
              <Link
              to={`/person/${id}/hisname/${name}`}
                key={index}
                className="flex flex-col md:flex-row bg-[#212529] items-center mb-4 w-full md:w-96 cursor-pointer"
              >
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                  }
                  alt={name}
                  className="w-24 md:w-1/2 mr-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p className="text-gray-400">{character}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Crew Section */}
        <div className="flex flex-col p-4 gap-4 w-full md:w-1/2">
          <h1 className="text-4xl mb-4">
            crew <span className="text-[#0DBDBB]">{crew.length}</span>
          </h1>
          {[
            { label: "Art", data: Art },
            { label: "Camera", data: Camera },
            { label: "Costume & Make-Up", data: MakeUp },
            { label: "Writing", data: Writing },
            { label: "Crew", data: supCrew },
            { label: "Directing", data: Directing },
            { label: "Editing", data: Editing },
            { label: "Lighting", data: Lighting },
            { label: "Sound", data: Sound },
            { label: "Visual Effects", data: VisualEffects },
          ]
            .filter(({ data }) => data.length > 0) // Filter out empty arrays
            .map(({ label, data }) => (
              <div key={label} className="mb-6">
                <h2 className="text-4xl mb-4 text-[#0DBDBB]">{label}</h2>
                {data.map(({ name, profile_path, job,id }, index) => (
                  <Link
                  to={`/person/${id}/hisname/${name}`}
                    key={index}
                    className="flex bg-[#212529] items-center mb-4 w-full md:w-96"
                  >
                    <img
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w500${profile_path}`
                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                      }
                      alt={name}
                      className="w-24 md:w-1/2 mr-4"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">{name}</h2>
                      <p className="text-gray-400">{job}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="text-center ">
        <button
          onClick={() => window.history.go(-1)}
          className="py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black"
        >
          Back a step
        </button>
      </div>
    </div>
  );
};

export default CastPage;
