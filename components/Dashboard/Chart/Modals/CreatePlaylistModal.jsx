import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import views from "../image/views.svg";
import closeView from "../image/Vector.svg";
import Dropdown from "../../../Dropdown";
import DropDownWithId from "../../../Dropdown/DropDownId";
import { bytesToSize } from "../../../../utils/utility";
import { uploadAFile } from "../../../../utils/fileUpload";
import { connect } from "react-redux";
import { getBusinessInfo } from "../../../../store/actions/business";
import {
  playListUpdate,
  getPlayList,
} from "../../../../store/actions/playlist";

const CreatePlaylistModal = ({
  createPlayListOpen,
  setCreatePlayListOpen,
  info,
  playListUpdate,
  playList,
  getPlayList,
}) => {
  const [createPlayList, setCreatePlayList] = useState({
    business: "",
    name: "",
    description: "",
    thumnil: "",
    privacy: "",
  });
  const [message, setMessage] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const onFileUploadOnStorage = async (event, folder) => {
    if (event.target.files.length > 0) {
      // if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
      //   return alert("Max file size limit error.");

      try {
        if (folder === "cover") {
          setUploadingCover(true);
        } else {
          setUploadingPhoto(true);
        }
        uploadAFile({
          fileName: Math.floor(Date.now() / 1000).toString(),
          folder: `${createPlayList?.name}/${folder}`,
          file: event.target.files[0],
          onProgress: (progress) => setPercentage(progress),
          onSetDownloadUrl: (url) => {
            console.log(url);
            onChangeValue({
              target: {
                name: event.target.name,
                value: url,
              },
            });
            setPercentage(0);
            if (folder === "coverPhoto") {
              setUploadingCover(false);
            } else {
              setUploadingPhoto(false);
            }
          },
        });
      } catch (error) {
        // console.log(error);
        setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    console.log();
    setCreatePlayList((prevState) => {
      const businessId = info?.business?._id;
      return { ...prevState, business: businessId };
    });
  }, []);

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setCreatePlayList({
      ...createPlayList,
      [name]: value,
    });
  };

  const createNewPlayList = () => {
    // console.log(createPlayList);
    playListUpdate(
      createPlayList,
      playList?.playlist ? playList?.playlist?._id : null
    ).then(() => {
      getPlayList();
      setCreatePlayListOpen(false);
    });
  };
  return (
    <>
      <div>
        <div className="flex mt-10">
          <button className="btn-light text-light ml-auto -mr-5 pb-2">
            <RxCross1
              onClick={() => setCreatePlayListOpen(!createPlayListOpen)}
              className="text-white text-lg "
            />
          </button>
        </div>

        <div className="bg-white  rounded-[8px] w-[700px] ">
          {/* drag and drop */}
          <h1 className="text-center pt-5 pb-3 text-[#19525A] text-[32px] font-medium">
            Create a Playlist
          </h1>

          {/* info */}
          <div className="flex justify-between p-4 border-t-2 border-b-2 border-gray-300">
            <p className="my-auto text-[#5b5b5b]">
              Name<span className="text-rose-500">*</span>
            </p>
            <div className="rounded-md border-2  border-[#1A535B] ">
              <input
                type="text"
                name="name"
                value={createPlayList.name}
                onChange={onChangeValue}
                placeholder="Write the playlist name"
                className="border-0 h-[40px] px-4 py-1 rounded-md w-[300px]"
              />
            </div>
          </div>

          <div className="flex justify-between p-4  border-b-2 border-gray-300">
            <p className="text-[#5b5b5b]">Description</p>
            <div className="rounded-md border-2  border-[#1A535B] ">
              <textarea
                name="description"
                value={createPlayList.description}
                onChange={onChangeValue}
                className="border-0 outline-none px-4 py-1 mt-0 rounded-md w-[300px] h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-between p-4  border-b-2 border-gray-300">
            <p className="my-auto text-[#5b5b5b]">
              Add Cover or Thumbnail
              <span className="text-gray-400">
                (16:9 in ratio and less the 2 MB)
              </span>
            </p>
            <label className="w-[124px] h-[36px] text-[20px] border-[1px] border-gray-400 px-3 py-2 flex flex-col items-center bg-[#19525A] rounded-lg cursor-pointer">
              <span className="text-[15px] text-white leading-normal">
                Upload
              </span>
              <input
                type="file"
                className="hidden"
                name="thumnil"
                onChange={(event) => onFileUploadOnStorage(event, "thumnil")}
              />
            </label>
          </div>

          <div className="flex justify-between p-4 ">
            <p className="my-auto text-[#5b5b5b]">Privacy</p>
            <div className="rounded-lg border-2  border-[#19525A]">
              <DropDownWithId
                items={[
                  { name: "Public", id: "public" },
                  { name: "Only me", id: "only_me" },
                ]}
                selected={createPlayList.privacy}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "privacy",
                      value: selected,
                    },
                  });
                }}
                width={"182px"}
              />
            </div>
          </div>
          <div className="flex justify-end p-4 border-t-2 border-gray-300">
            <button
              onClick={() => setCreatePlayListOpen(!createPlayListOpen)}
              className="px-9 rounded-lg mr-5 border-2 border-[#19525A] py-1"
            >
              Cancel
            </button>
            <button
              onClick={createNewPlayList}
              className="px-9 py-1 rounded-lg text-white bg-[#19525A]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state.playlist);
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    playList: state?.playlist,
  };
};
export default connect(mapStateToProps, {
  getBusinessInfo,
  playListUpdate,
  getPlayList,
})(CreatePlaylistModal);
