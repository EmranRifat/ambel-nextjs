import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChartRange = ({ setChartItem, chartItem, index }) => {
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Smart Option & Narratives</span>
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
        <div className="w-[973px] h-[264px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Name</h3>
            <input
              type="text"
              placeholder="Enter name"
              className="h-[24px] w-[948px] px-5 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>
          <div className="w-[948px] flex flex-col items-start p-2">
            <span className="">Checkbox Layout</span>
            <div className="w-[948px] flex justify-start items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-[10px] w-[10px] checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
                  name="All appointment"
                />
                <span className="text-[14px] text-[#5B5B5B] ml-2">
                  Horizontal
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-[10px] w-[10px] checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
                  name="All appointment"
                />
                <span className="text-[14px] text-[#5B5B5B] ml-2">
                  Vertical
                </span>
              </div>
            </div>
          </div>
          <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
            <span className="text-white text-[14px] font-bold">
              Settings of Range
            </span>
            <div className="flex items-center">
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
            </div>
          </div>
          <div className="w-[948px] mt-4">
            <div className="h-[25px] w-[5px] bg-[#8A8A8A] flex flex-col justify-end relative left-10 top-5">
              <span className="relative right-2 top-5 text-[#5B5B5B] text-[12px]">
                Ok
              </span>
            </div>

            <input
              type="range"
              className="w-[948px] text-gray-500 bg-orange-400"
            />
            <div className="h-[25px] w-[5px] bg-[#8A8A8A] flex flex-col justify-end relative bottom-7 left-[50%]">
              <span className="relative right-2 top-5 text-[#5B5B5B] text-[12px]">
                Fine
              </span>
            </div>
            <div className="h-[25px] w-[5px] bg-[#8A8A8A] flex flex-col justify-end relative bottom-14 mt-1 left-[95%]">
              <span className="relative right-2 top-5 text-[#5B5B5B] text-[12px] ">
                Good
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartRange;
