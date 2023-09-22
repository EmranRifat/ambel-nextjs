import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const subjectAndShortlevel = [1, 2, 3];
const optionShortlevel = [1, 2, 3];
const ChartSmartOptions = ({ setChartItem, chartItem, index }) => {
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
        <div className="w-[973px] h-[384px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
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
              Settings of smart option & Narratives
            </span>
            <div className="flex items-center">
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
            </div>
          </div>
          <div className="w-[948px] flex flex-col items-start mt-2">
            <div className="w-[948px] flex justify-between items-center">
              <div className="w-[450px] flex justify-start items-center">
                Subject
              </div>
              <div className="w-[450px] flex justify-start items-center">
                Short Label (Optional)
              </div>
            </div>
            {subjectAndShortlevel.map((subshort) => (
              <div
                key={subshort}
                className="w-[948px] flex justify-between items-center mt-2"
              >
                <input
                  type="text"
                  className="w-[450px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm"
                />

                <div className="w-[450px] flex justify-start gap-2 items-center">
                  <input
                    type="text"
                    className="w-[450px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm"
                  />
                  <Image
                    src="/circlecross.png"
                    height={20}
                    width={20}
                    alt="crosscircle"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-[948px] flex flex-col items-start mt-2">
            <div className="w-[948px] flex justify-between items-center">
              <div className="w-[450px] flex justify-start items-center">
                Options
              </div>
              <div className="w-[450px] flex justify-start items-center">
                Short Label (Optional)
              </div>
            </div>
            {subjectAndShortlevel.map((subshort) => (
              <div
                key={subshort}
                className="w-[948px] flex justify-between items-center mt-2"
              >
                <input
                  type="text"
                  className="w-[450px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm"
                />

                <div className="w-[450px] flex justify-start gap-2 items-center">
                  <input
                    type="text"
                    className="w-[450px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm"
                  />
                  <Image
                    src="/circlecross.png"
                    height={20}
                    width={20}
                    alt="crosscircle"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartSmartOptions;
