import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { FaUserCheck } from "react-icons/fa";
import views from "../image/views.svg";
import { BiSearch } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { RiShareForwardFill } from "react-icons/ri";
import { videosUpdate, getSingleVideo } from "../../../../store/actions/videos";

import { connect } from "react-redux";

const VideoPlayerModal = ({
  videoId,
  setSingleVideoPlayer,
  singleVidoPlayer,
  singleVideo,
  getSingleVideo,
}) => {
  useEffect(() => {
    getSingleVideo(videoId);
  }, []);
  return (
    <>
      <div className="mt-44 bg-white h-[460px]  rounded-[8px] w-[1000px] ">
        <div className="flex justify-end p-3">
          <button className="btn-light text-light ml-auto">
            <RxCross1
              onClick={() => setSingleVideoPlayer(!singleVidoPlayer)}
              className="text-gray-600 text-xl font-bold "
            />
          </button>
        </div>

        {/* video pkayer */}
        <div className="flex">
          <div className="w-4/6 ml-5 mr-2 rounded-lg  ">
            <video
              controls
              autoPlay
              className="rounded-lg h-[340px] w-full"
              src={singleVideo?.data.video}
            ></video>
            <div className="flex justify-between p-3">
              <div className="1/4 flex justify-between">
                <FaUserCheck className="my-auto text-lg mr-3" />
                <p className="my-auto">0 Assigned</p>
              </div>
              <div className="1/4 flex justify-between">
                <Image
                  src={views}
                  height={"16px"}
                  width={"20px"}
                  alt="image"
                  className="my-auto mr-3"
                />
                <p className="my-auto ml-1"> 0 Watched</p>
              </div>

              <div className="w-2/4 flex justify-between">
                <div className=" bg-white  flex items-center my-auto justify-between border px-2 border-gray-200 rounded-lg hover:ring-1">
                  <BiSearch className="text-lg opacity-70" />
                  <input
                    type="text"
                    placeholder=""
                    className="outline-none w-[150px] p-1 border-r-2  border-gray-300 mr-2 hover:border-0 bg-white"
                  />
                  <FiUserCheck className="" />
                </div>

                <button className=" flex px-3 text-sm py-[6px] my-auto rounded-lg border border-gray-200">
                  <RiShareForwardFill className="text-lg my-auto mr-2" />
                  <p>Share</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/6 p-3 border-2 border-[#19525A] rounded-lg mr-4 ml-3 h-[340px]">
            <h1 className="text-[20px]">{singleVideo?.data.name}</h1>
            <p className="text-[#5b5b5b]">{singleVideo?.data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  //   console.log(state);
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    // videos: state?.videos?.videos,
    singleVideo: state?.videos?.singleVideo,
  };
};
export default connect(mapStateToProps, {
  videosUpdate,
  //   getVideos,
  getSingleVideo,
})(VideoPlayerModal);
