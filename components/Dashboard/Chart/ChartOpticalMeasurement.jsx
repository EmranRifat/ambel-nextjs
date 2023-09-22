import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const opticalMeasure = [
  {
    id: 1,
    heading: "Sphere",
  },
  {
    id: 2,
    heading: "Cyl",
  },
  {
    id: 3,
    heading: "Axis",
  },
  {
    id: 4,
    heading: "Add",
  },
  {
    id: 5,
    heading: "H. Prism",
  },
  {
    id: 6,
    heading: "V.Prism",
  },
  {
    id: 7,
    heading: "Visual Acuity",
  },
];
const ChartOpticalMeasurement = ({ setChartItem, chartItem, index }) => {
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Optical Measurement</span>
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

        {/* optical measurement deails.... */}
        <div className="w-[973px] h-[270px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          {/* description... */}
          <div className="w-[948px] flex flex-col mt-2 py-2">
            <h3 className="text-[16px]">Description</h3>
            <textarea
              placeholder="Write down the description"
              className="h-[88px] w-[948px] p-2 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>

          {/* settings of optical measurements.... */}
          <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-2">
            <span className="text-white text-[14px] font-bold">
              Settings of Optical Measurement
            </span>
            <BsThreeDotsVertical className="text-xl text-white cursor-pointer mr-3" />
          </div>

          <div className="w-[948px] flex justify-between items-center mt-2">
            <div className="w-[81px] flex flex-col items-start">
              <span className="text-[16px] font-bold">Eye Name</span>
              <div className="w-[81px] flex justify-center items-center border-[.2px] border-[#19525A80] rounded-sm mt-1">
                <Image
                  src="/eyename.png"
                  height={15}
                  width={22}
                  alt="eyename"
                />
                <span className="ml-1">OD</span>
              </div>
              <div className="w-[81px] flex justify-center items-center border-[.2px] border-[#19525A80] rounded-sm mt-1">
                <Image
                  src="/eyename.png"
                  height={15}
                  width={22}
                  alt="eyename"
                />
                <span className="ml-1">OS</span>
              </div>
            </div>

            {/* remaining elements... */}
            {opticalMeasure.map((optical) => (
              <div
                key={optical.id}
                className="w-[110px] flex flex-col items-start"
              >
                <span className="text-[16px] font-bold">{optical.heading}</span>
                <input
                  type="text"
                  className="w-[110px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm"
                />
                <input
                  type="text"
                  className="w-[110px] h-[24px] px-2 outline-none border-[.2px] border-[#19525A80] rounded-sm mt-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartOpticalMeasurement;
