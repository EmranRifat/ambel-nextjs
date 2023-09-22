import React, { forwardRef, useEffect, useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import {
  BsChevronDown,
  BsFillShareFill,
  BsStar,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import FilterAllBranch from "../../FilterAllBranch";
import FilterAllDepartment from "../../FilterAllDepartment";
import FilterAllStuff from "../../FilterAllStuff/Index";
import FilterAlltype from "../../FilterAllType/Index";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterAllTime from "../../FilterAllTime/Index";
import icontop from "./image/icontop.png";
import { IoIosLock } from "react-icons/io";
import { IoEarth } from 'react-icons/io5';
import { FiEdit, FiUserCheck } from "react-icons/fi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import NewVideoModal from "./Modals/NewVideoModal";
import CreatePlaylistModal from "./Modals/CreatePlaylistModal";
import Modal from "../../Modal";
import { connect } from "react-redux";
import { videosUpdate, getVideos } from "../../../store/actions/videos";
import { getPlayList } from "../../../store/actions/playlist";
import SingleVideoPlayer from "./Modals/SingleVideoPlayer";
import PlayListPlayer from "./Modals/PlayListPlayer";

const CustomDateRange = () => {
  const customrange = ({ value, onClick }, ref) => {
    return (
      <div className="flex items-center ml-2">
        <div className="flex px-3 py-2 bg-white focus:ring-sky-500 rounded-xl border-2">
          <div className="text-[rgb(91,91,91)] text-[14px] font-[500] mr-3 ">
            {value}
          </div>
          <div
            ref={ref}
            onClick={onClick}
            className="cursor-pointer my-auto flex"
          >
            <Image src="/calendar.png" height={15} width={15} alt="calendar" />
          </div>
        </div>
      </div>
    );
  };
  customrange.displayName = "customrange";
  return forwardRef(customrange);
};
CustomDateRange.displayName = "CustomDateRange";
const RangeComponent = CustomDateRange();

const ChartVideo = (props) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [singleVidoPlayer, setSingleVideoPlayer] = useState(false);
  const [playListPlayer, setPlayListPlayer] = useState(false);
  const [uploadVideoActive, setUploadVideoActive] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [allPlayList, setAllPlayList] = useState([]);
  const [createPlayListOpen, setCreatePlayListOpen] = useState(false);
  const [videoId, setVideoId] = useState();
  const [playListId, setPlayListId] = useState();
  const [editVideo, setEditVideo] = useState(false);
  const [editableVideo, setEditableVideo] = useState(null);

  const [videosData, setVideosData] = useState({
    business: "",
    name: "",
    description: "",
    thumnil: "",
    video: "",
    privacy: "",
    playList: "default",
  });

  useEffect(() => {
    props.getVideos(props?.info?.business?._id);
    props.getPlayList(props?.info?.business?._id);
  }, [props?.info?.business?._id]);

  useEffect(() => {
    setAllVideos(props?.videos?.data);
    setAllPlayList(props?.playList?.data || []);
  }, [props?.videos?.data, props?.playList?.data,]);

  console.log(allVideos)

  const handleEdit = (video) => {
    setEditableVideo(video);
    setUploadVideoActive(!uploadVideoActive)
    setEditVideo(true)
  }

  return (
    <>
      {singleVidoPlayer && (
        <Modal onClick={setSingleVideoPlayer} closeOnOutsideClick={true}>
          <SingleVideoPlayer
            videoId={videoId}
            singleVidoPlayer={singleVidoPlayer}
            setSingleVideoPlayer={setSingleVideoPlayer}

          />
        </Modal>
      )}

      {playListPlayer && playListId && (
        <Modal onClick={setPlayListPlayer} closeOnOutsideClick={true}>
          <PlayListPlayer
            playListId={playListId}
            playListPlayer={playListPlayer}
            setPlayListPlayer={setPlayListPlayer}
          />
        </Modal>
      )}
      {createPlayListOpen && (
        <Modal onClick={setCreatePlayListOpen} closeOnOutsideClick={true}>
          <CreatePlaylistModal
            createPlayListOpen={createPlayListOpen}
            setCreatePlayListOpen={setCreatePlayListOpen}
          />
        </Modal>
      )}
      <div className="mt-4 mb-2 flex">
        <h2 className="text-[#5B5B5B] font-bold text-[32px] mr-auto">Videos</h2>
        <div className="my-auto">
          <button
            onClick={() => setCreatePlayListOpen(!createPlayListOpen)}
            className="rounded-lg px-4 py-1 mr-3 bg-[#19525A] text-lime-50"
          >
            Create Playlist
          </button>
          <button
            onClick={() => setUploadVideoActive(!uploadVideoActive)}
            className="rounded-lg px-4 py-1 bg-[#19525A] text-lime-50"
          >
            Upload New
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white">
        <div className="w-full  bg-[#e7ebf7] p-3 rounded-lg ">
          <div className="w-full flex pb-3  border-b-2">
            <div className="flex w-2/4  mr-auto">
              <div className="h-10 bg-white w-96 flex items-center my-auto justify-between border px-2 border-gray-200 rounded-3xl mr-5 hover:ring-1">
                <input
                  type="text"
                  placeholder="Search name..."
                  className="outline-none p-1 border-0 hover:border-0 bg-white"
                />
                <BiSearch className="text-xl opacity-70" />
              </div>
            </div>

            <div className="w-1/4 flex justify-end">
              <div className="">
                <FilterAllBranch />
              </div>
              <div className="flex">
                <BsChevronDown className="my-auto font-bold text-2xl mx-2 " />
                <BsThreeDotsVertical className="my-auto text-2xl mr-2" />
              </div>
            </div>
          </div>
          <div className="flex p-3 justify-between">
            <AiTwotoneStar className="text-3xl my-auto mr-2 text-[#FF7A00]" />
            <RiErrorWarningFill className="text-3xl my-auto mr-2  text-[#C35E00]" />
            <FilterAllDepartment></FilterAllDepartment>
            <FilterAllStuff></FilterAllStuff>
            <FilterAlltype></FilterAlltype>
            <FilterAllTime></FilterAllTime>
            <DatePicker
              selected={startDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              onCalendarClose={() => {
                if (!endDate) {
                  setDateRange([startDate, startDate]);
                }
              }}
              className="-mr-5 text-[12px]"
              // @ts-ignore
              customInput={<RangeComponent />}
              startDate={startDate}
              dateFormat="dd MMM, yyyy"
              // minDate={new Date()}
              endDate={endDate}
              selectsRange
              withPortal
            />

            <button className="rounded-lg px-4 py-0  bg-[#19525A] text-lime-50">
              Import Library
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-start p-4">
          {allVideos?.map((videos, i) => (
            <div
              key={videos._id}
              className="w-[230px] border-2 border-gray-200 rounded-lg"
            >
              <div className="flex justify-between p-3 ">
                <Image
                  src={icontop}
                  className="rounded-full my-auto"
                  alt="Icon"
                  width="25px"
                  height="25px"
                />

                {videos.privacy === 'public' ?
                  <IoEarth className="text-2xl my-auto text-[#5b5b5b]" />
                  :
                  <IoIosLock className="text-2xl my-auto text-[#5b5b5b]" />
                }
                <BsFillShareFill className="text-xl my-auto text-[#5b5b5b]" />
                <BsStar className="text-2xl my-auto text-[#FF7A00]" />
                <FiEdit
                  className="text-2xl my-auto text-[#5b5b5b] cursor-pointer"
                  onClick={() => {
                    handleEdit(videos);
                  }}
                />
              </div>
              <div className="border-t-2 border-b-2 border-gray-200">
                <Image
                  className="cursor-pointer"
                  src={videos.thumnil}
                  height={130}
                  width={230}
                  alt="image"
                  onClick={() => {
                    setSingleVideoPlayer(!singleVidoPlayer);
                    setVideoId(videos._id);
                  }}
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="mt-1 p-1">
                <span className="text-[16px]">{videos.name}</span>
                <p className="text-xs text-justify text-[#5b5b5b]">
                  {videos.description.substr(0, 70) + "...."}
                </p>
                <div className="flex p-1 justify-between">
                  <div className=" bg-white  flex items-center my-auto justify-between border px-2 border-gray-200 rounded-lg hover:ring-1">
                    <BiSearch className="text-lg opacity-70" />
                    <input
                      type="text"
                      placeholder=""
                      className="outline-none w-[80px] p-1 border-r-2  border-gray-300 mr-2 hover:border-0 bg-white"
                    />
                    <FiUserCheck className="" />
                  </div>

                  <button className=" flex px-3 text-sm py-[6px] my-auto rounded-lg border border-gray-200">
                    <MdOutlinePlaylistAdd className="text-lg my-auto " />{" "}
                    <p>Save</p>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {allPlayList.length > 0 &&
            allPlayList.map((playlist) => (
              <>
                <div
                  key={playlist._id}
                  className="w-[230px] border-2 border-gray-200 rounded-lg"
                  onClick={() => {
                    setPlayListId(playlist._id);
                    setPlayListPlayer(!playListPlayer);
                  }}
                >
                  <div className="flex justify-between p-3 ">
                    <Image
                      src={icontop}
                      className="rounded-full my-auto"
                      alt="Icon"
                      width="25px"
                      height="25px"
                    />
                    <IoIosLock className="text-2xl my-auto text-[#5b5b5b]" />
                    <BsFillShareFill className="text-xl my-auto text-[#5b5b5b]" />
                    <BsStar className="text-2xl my-auto text-[#FF7A00]" />
                    <FiEdit className="text-2xl my-auto text-[#5b5b5b]" />
                  </div>
                  <div className="border-t-2 border-b-2 border-gray-200">
                    <Image
                      src={playlist.thumnil}
                      height={100}
                      width={230}
                      alt="image"
                    />
                  </div>

                  <div className="mt-1">
                    <span className="text-[16px] ml-2">{playlist.name}</span>
                    <p className="text-xs ml-2 text-justify text-[#5b5b5b]">
                      {playlist.description}
                    </p>
                    <div className="flex p-1 justify-between">
                      <div className=" bg-white  flex items-center my-auto justify-between border px-2 border-gray-200 rounded-lg hover:ring-1">
                        <BiSearch className="text-lg opacity-70" />
                        <input
                          type="text"
                          placeholder=""
                          className="outline-none w-[80px] p-1 border-r-2  border-gray-300 mr-2 hover:border-0 bg-white"
                        />
                        <FiUserCheck className="" />
                      </div>

                      <button className=" flex px-3 text-sm py-[6px] my-auto rounded-lg border border-gray-200">
                        <MdOutlinePlaylistAdd className="text-lg my-auto " />{" "}
                        <p>Save</p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      {uploadVideoActive && (
        <Modal onClick={setUploadVideoActive} closeOnOutsideClick={true}>
          <NewVideoModal
            videosData={videosData}
            setVideosData={setVideosData}
            uploadVideoActive={uploadVideoActive}
            setUploadVideoActive={setUploadVideoActive}
            // @ts-ignore
            edit={editVideo}
            setEdit={setEditVideo}
            editablevideo={editableVideo}
          />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    videos: state?.videos?.videos,
    playList: state?.playlist?.playlist,
  };
};
export default connect(mapStateToProps, {
  videosUpdate,
  getVideos,
  getPlayList,
})(ChartVideo);
