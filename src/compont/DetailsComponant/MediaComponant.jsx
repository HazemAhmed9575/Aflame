import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loding from "../Loding";
import { FaArrowRightLong } from "react-icons/fa6";

import Erorr from "../Erorr";

function MediaComponant() {
  const { Subject, id, name } = useParams();

  const { video,  } = useSelector((state) => state.videos);

  const {
    postersMidia,
    backdropsMidia,
    mediaLoding,
    mediaErorr,
  } = useSelector((state) => state.media);
  const [selectedCategory, setSelectedCategory] = useState("videoes");

  const dispatch = useDispatch();
  if (mediaErorr) {
    <div className="flex justify-center items-center w-full lg:w-3/4 ">
      <Erorr />
    </div>;
  }
  return (
    <div className="text-white w-full lg:w-3/4  flex flex-col gap-y-7 max-h-screen">
      <h1 className="text-[#0DCAF0] text-3xl font-bold">Media</h1>

      <div>
        {mediaLoding && <Loding />}
        <Tabs value="videoes">
          <TabsHeader
            className="bg-transparent  w-auto lg:w-1/2  "
            indicatorProps={{
              className:
                "bg-gray-900/10  rounded-none border-b-4 border-[#9C27B0]  ",
            }}
          >
            {/* textVideo */}
            <Tab
              onClick={() => {
                setSelectedCategory("videoes");
              }}
              value={"videoes"}
              className={`text-sm ${
                selectedCategory == "videoes"
                  ? "text-purple-400 "
                  : "text-gray-300"
              }`}
            >
              VIDEOS {`(${video.length})`}
            </Tab>
            {/* end textVideo */}
            {/* textBackdrob */}
            <Tab
              onClick={() => {
                setSelectedCategory("backdrops");
              }}
              value={"backdrops"}
              className={`text-sm ${
                selectedCategory == "backdrops"
                  ? "text-purple-400 "
                  : "text-gray-300"
              }`}
            >
              BACKDROPS {`(${backdropsMidia.length})`}
            </Tab>
            {/* end textBackdrob */}
            {/* textPosters */}
            <Tab
              onClick={() => {
                setSelectedCategory("posters");
              }}
              value={"posters"}
              className={`text-sm ${
                selectedCategory == "posters"
                  ? "text-purple-400 "
                  : "text-gray-300"
              }`}
            >
              POSTERS {`(${postersMidia.length})`}
            </Tab>
            {/* textPosters */}
          </TabsHeader>
          <TabsBody className="    bg-[#212529] ">
            {/* video  */}
            {video.length == 0 ? (
              <TabPanel className="gap-x-4 inline-flex" value={"videoes"}>
                <h1>No video have been added.</h1>
              </TabPanel>
            ) : (
              <TabPanel
                className="gap-x-4 inline-flex overflow-x-auto overflow-y-hidden whitespace-nowrap "
                value={"videoes"}
              >
                {" "}
                {video.map(
                  (data, index) =>
                    index < 6 && (
                      <iframe
                        key={index}
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${data.key}?si=dFaN3MJ_NpFtMKqY`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>
                    )
                )}
                {video.length > 6 && (
                  <Link
                    to={`/${Subject}/${id}/titel/${name}/videos`}
                    ///:Subject/:id/titel/:name/videos
                    className="  text-white p-4 flex justify-center items-center gap-2 hover:text-[#CAC1A2] "
                  >
                    Show more <FaArrowRightLong />
                  </Link>
                )}
              </TabPanel>
            )}
            {/* end video  */}
            {/* backdrops */}
            {backdropsMidia?.length == 0 ? (
              <TabPanel className="gap-x-4 inline-flex  " value={"backdrops"}>
                <h1>No Backdrops have been added.</h1>
              </TabPanel>
            ) : (
              <TabPanel
                className="gap-x-4 inline-flex overflow-x-auto overflow-y-hidden whitespace-nowrap "
                value={"backdrops"}
              >
                {backdropsMidia?.map(
                  (data, index) =>
                    index < 6 && (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${data.file_path}`}
                      />
                    )
                )}
                {backdropsMidia.length > 6 && (
                  <Link
                    to={`/${Subject}/${id}/titel/${name}/images/backdrops`}
                    //:Subject/:id/titel/:name/images/backdrops
                    className="  text-white p-4 flex justify-center items-center gap-2 hover:text-[#CAC1A2] "
                  >
                    Show more <FaArrowRightLong />
                  </Link>
                )}
              </TabPanel>
            )}
            {/* end backdrops */}
            {/* posters */}
            {postersMidia.length == 0 ? (
              <TabPanel className="gap-x-4 inline-flex w-1/3" value={"posters"}>
                <h1>No Posters have been added.</h1>
              </TabPanel>
            ) : (
              <TabPanel
                className="gap-x-4 inline-flex  overflow-x-auto overflow-y-hidden whitespace-nowrap"
                value={"posters"}
              >
                {postersMidia.map(
                  (data, index) =>
                    index < 6 && (
                      <img
                        className="w-1/3"
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${data.file_path}`}
                      />
                    )
                )}
                {postersMidia.length > 6 && (
                  <Link
                    to={`/${Subject}/${id}/titel/${name}/images/posters`}
                    //:Subject/:id/titel/:name/images/posters
                    className="  text-white p-4 flex justify-center items-center gap-2 hover:text-[#CAC1A2] "
                  >
                    Show more <FaArrowRightLong />
                  </Link>
                )}
              </TabPanel>
            )}

            {/* posters */}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default MediaComponant;
