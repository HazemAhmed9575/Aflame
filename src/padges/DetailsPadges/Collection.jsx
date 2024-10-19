import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollection } from "../../redex/slices/detailsSlices/collection";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../compont/Loding";
function Collection() {
  // ___________________________________________________________
  const { collectionid } = useParams();
  const { dataCollection, collectionLoading } = useSelector(
    (state) => state.collection
  );
  const { moveDetails } = useSelector((state) => state.details);
  const { cast, crew } = useSelector((state) => state.cradit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ___________________________________________________________
  // Ensure moveDetails and its properties exist before dispatching the action
  useEffect(() => {
    dispatch(getCollection(collectionid));
  }, [collectionid]);
  // ___________________________________________________________
  // Safe handling of background image
  let background = {
    backgroundImage: dataCollection?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/w500${dataCollection.backdrop_path}")`
      : "none",
  };
  console.log(dataCollection.poster_path);

  // ___________________________________________________________
  if (collectionLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loding />{" "}
      </div>
    );
  }

  return (
    <div className="  flex flex-col w-full ">
      {/* background & Collection Details */}
      <div
        style={background}
        className="bg-no-repeat bg-center bg-cover w-full  h-[85vh] flex gap-7">
        {/* Poster Image */}
        <div className="flex justify-end items-center w-1/4">
          <div className="w-4/5">
            <img
              src={
                dataCollection.poster_path == null
                  ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  : `https://image.tmdb.org/t/p/w500${dataCollection.poster_path}`
              }
              alt="Poster"
            />
          </div>
        </div>

        {/* Collection Details */}
        <div className="text-white font-medium flex flex-col justify-center gap-5">
          <h1 className="text-3xl">
            {dataCollection.name || "Unknown Collection"}
          </h1>

          {/* Genres */}
          <p>
            {moveDetails.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}, </span>
            )) || `There is no Genres for this ${dataCollection.name}`}
          </p>

          {/* Overview */}
          <div>
            <h1 className="text-[#0DCAF0] text-2xl">Overview :-</h1>
            <p>{dataCollection.overview || "No overview available"}</p>
          </div>

          {/* Number of Movies */}
          <h1 className="text-[#0DCAF0] text-2xl">
            Number of Movies:{" "}
            <span className="text-white">
              {dataCollection.parts?.length || 0}
            </span>
          </h1>

          {/* Revenue */}
          <h1 className="text-[#0DCAF0] text-2xl">
            Revenue:{" "}
            <span className="text-white">
              {moveDetails.revenue
                ? `$${Intl.NumberFormat().format(moveDetails.revenue)}`
                : "-"}
            </span>
          </h1>
        </div>
      </div>

      {/* Featured Cast */}
      <div className=" lg:w-4/5 w-full flex flex-col gap-7 p-12">
        <h1 className="text-[#0DCAF0] text-3xl font-bold">Featured Cast</h1>
        <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1  gap-6 w-full  ">
          {cast.map(
            (data, index) =>
              index < 15 && (
                <div
                  key={index}
                  className="bg-[#212529]  rounded-lg flex items-center gap-x-2">
                  <div className="w-1/6 h-full ">
                    <img
                      src={
                        data.profile_path == null
                          ? "https://ionicframework.com/docs/img/demos/avatar.svg"
                          : `https://image.tmdb.org/t/p/w500${data.profile_path}`
                      }
                      className="w-full h-full rounded-l-lg"
                      alt=""
                    />
                  </div>

                  <div className="w-full text-white">
                    <h1 className="font-bold hover:text-gray-300">
                      {data.name}
                    </h1>
                    <p className="font-medium">{data.character}</p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {/* Featured Crew  */}
      <div className=" lg:w-4/5 w-full flex flex-col gap-7 p-12">
        <h1 className="text-[#0DCAF0] text-3xl font-bold">Featured Crew</h1>
        <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1  gap-6 w-full  ">
          {crew.map(
            (data, index) =>
              index < 13 && (
                <div
                  key={index}
                  className="bg-[#212529]  rounded-lg flex items-center gap-x-2">
                  <div className="w-1/6 h-full ">
                    <img
                      src={
                        data.profile_path == null
                          ? "https://ionicframework.com/docs/img/demos/avatar.svg"
                          : `https://image.tmdb.org/t/p/w500${data.profile_path}`
                      }
                      className="w-full h-full rounded-l-lg"
                      alt=""
                    />
                  </div>

                  <div className="w-full text-white">
                    <h1 className="font-bold hover:text-gray-300">
                      {data.name}
                    </h1>
                    <p className="font-medium">{data.department}</p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {/*movies  */}
      <div className=" w-full flex flex-col gap-7 p-12">
        <h1 className="text-[#0DCAF0] text-3xl font-bold">
          {dataCollection.parts?.length || 0} movies
        </h1>
        <div className="grid lg:sm:grid-cols-1 md:grid-cols-2  gap-4 w-full  ">
          {dataCollection.parts?.map((data, index) => (
            <div
              key={index}
              className="bg-[#212529] lg:md:p-1 rounded-lg flex lg:flex-row items-center flex-col  lg:gap-x-2">
              <div
                onClick={() => navigate(`/movie/${data.id}/${data.title}`)}
                className="lg:w-1/12 h-full  ">
                <img
                  src={
                    data.poster_path == null
                      ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                  }
                  className="w-full h-full rounded-lg lg:rounded-l-lg"
                  alt=""
                />
              </div>

              <div className="w-full flex flex-col lg:items-start  md:items-center md:p-3  items-center text-white ">
                <button
                  onClick={() => navigate(`/movie/${data.id}/${data.title}`)}
                  className="font-bold hover:text-gray-300">
                  {data.original_title}
                </button>
                <p className="font-medium text-[#65757D]">
                  {data.release_date}
                </p>
                <p className="font-medium text-center lg:text-start">
                  {data.overview.length > 170
                    ? data.overview.slice(0, 170)
                    : data.overview}
                  {data.overview.length > 200 && "..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
