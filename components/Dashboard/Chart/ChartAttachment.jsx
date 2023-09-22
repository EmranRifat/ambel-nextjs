import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChartAttachment = ({ setChartItem, chartItem, index }) => {
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">File Upload</span>
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

        {/* . */}
        <div className="w-[973px] h-[184px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Description</h3>
            <textarea
              placeholder="Write the file description"
              className="h-[64px] w-[948px] px-2 py-1 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>

          <label className="w-[948px] text-[20px] border-[1px] border-gray-400 px-3 py-1 mt-4 flex flex-col items-center bg-white rounded-lg cursor-pointer hover:bg-[#458296] hover:text-white">
            <span className="text-[15px] text-base leading-normal">
              Upload files
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
    </React.Fragment>
  );
};

export default ChartAttachment;
