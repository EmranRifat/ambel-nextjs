// @ts-nocheck
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { FaUserCheck } from "react-icons/fa";
import views from "../image/views.svg";
import { BiSearch } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { RiShareForwardFill } from "react-icons/ri";
import { connect } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  getSinglePlayList,
  playListUpdate,
} from "../../../../store/actions/playlist";

const VideoPlayerModal = ({
  playListPlayer,
  setPlayListPlayer,
  playListId,
  getSinglePlayList,
  singleVideo,
}) => {
  const [video, setVideo] = useState({});
  useEffect(() => {
    getSinglePlayList(playListId);
  }, []);
  // useEffect(() => {
  //   setVideo(singleVideo?.data?.videos[0].video);
  // }, []);
  console.log(video);
  return (
    <React.Fragment>
      <div className="mt-20 bg-white h-[650px]  rounded-[8px] w-[1000px] ">
        <div className="flex justify-end p-3">
          <button className="btn-light text-light ml-auto">
            <RxCross1
              onClick={() => setPlayListPlayer(!playListPlayer)}
              className="text-gray-600 text-xl "
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
              src={
                Object.keys(video).length > 0
                  ? video?.video
                  : singleVideo?.data?.videos[0]?.video
              }
            >
              {/* <source src={video} type="video/mp4" /> */}
            </video>
            <div className="flex justify-between p-3">
              <div className="1/4 flex justify-between">
                <FaUserCheck className="my-auto text-lg mr-3" />
                <p className="my-auto ml-1">0 Assigned</p>
              </div>
              <div className="1/4 flex justify-between">
                <Image
                  src={views}
                  height={"16px"}
                  width={"20px"}
                  alt="image"
                  className="my-auto mr-3"
                />
                <p className="my-auto ml-2">0 Watched</p>
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
            <h1 className="text-[20px]">{video.name}</h1>
            <p className="text-[#5b5b5b]">{video.description}</p>
          </div>
        </div>

        {singleVideo?.data?.videos.length > 0 && (
          <div className="p-2">
            <h1 className="text-base mx-4">10/20</h1>
            <div className="flex">
              <button>
                <AiOutlineLeft className="text-xl" />
              </button>
              <div className="w-[960px] h-[150px] mt-2 overflow-x-scroll flex">
                {singleVideo?.data?.videos?.map((props) => (
                  <div
                    onClick={() => {
                      setVideo(props);
                    }}
                    key={props.id}
                    className="w-[180px] h-[100px] mr-4"
                  >
                    <span className="text-[16px]">{props.name}</span>
                    <img src={props.thumnil} alt="hello" className="rounded-lg h-[100px]" />
                    {/* <video controls className="rounded-md h-[100px] w-[180px]">
                      <source src={props.video} type="video/mp4" />
                    </video> */}
                  </div>
                ))}
              </div>
              <button>
                <AiOutlineRight className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    singleVideo: state?.playlist?.singleplaylist,
  };
};
export default connect(mapStateToProps, {
  playListUpdate,
  getSinglePlayList,
})(VideoPlayerModal);
