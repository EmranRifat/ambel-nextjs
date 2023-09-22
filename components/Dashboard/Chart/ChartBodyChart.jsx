import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDotsVertical, BsImages } from "react-icons/bs";
import Modal from "../../Modal";
import GalleryModal from "./GalleryModal";

const ChartBodyChart = ({ setChartItem, chartItem, index }) => {
  const [gallery, setGallery] = useState(false);
  return (
    <React.Fragment>
      {gallery && (
        <Modal onClick={setGallery} closeOnOutsideClick={true}>
          <GalleryModal setGallery={setGallery} />
        </Modal>
      )}
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Body Chart</span>
          <Image
            src="/circlecross.png"
            height={20}
            width={20}
            alt="crosscircle"
            className="cursor-pointer"
            onClick={() => {
              setChartItem((prevState) => {
                const newEntries = chartItem.entries.filter(
                  (item, idx) => index != idx
                );
                return {
                  ...chartItem,
                  entries: newEntries,
                };
              });
            }}
          />
        </div>

        {/* smart options deails.... */}
        <div className="w-[973px] h-[464px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Name</h3>
            <input
              type="text"
              placeholder="Enter name"
              className="h-[24px] w-[948px] px-5 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>

          <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
            <span className="text-white text-[14px] font-bold">
              Settings of Body Chart
            </span>

            <div className="flex items-center">
              <span
                onClick={() => setGallery(!gallery)}
                className="text-white text-[14px] font-bold mr-3 cursor-pointer"
              >
                Gallery
              </span>
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[24px] rounded-md flex justify-start items-center border-[.5px] border-gray-300 relative top-72 mt-9">
            <label className="w-[105px] h-[20px] text-[10px] border-[1px] border-gray-400 px-3 py-1 flex justify-between items-center bg-white rounded-lg cursor-pointer hover:bg-[#458296] hover:text-white">
              <BsImages className="text-[#00B012]" />
              <span className="text-[10px] text-base leading-normal">
                Upload image
              </span>
              <input
                type="file"
                className="hidden"
                // name={name}
                // onChange={(event) => {
                //   onFileUpload(event, folder);
                // }}
              />
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartBodyChart;
