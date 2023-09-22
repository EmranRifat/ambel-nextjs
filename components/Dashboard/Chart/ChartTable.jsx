import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChartTable = ({ setChartItem, chartItem, index }) => {
  const [row, setRow] = useState(3);
  const [column, setColumn] = useState(3);
  const numOfRow = [];
  const mumOfCol = [];
  for (var i = 1; i <= row; i++) {
    numOfRow[i] = i;
  }
  for (var j = 1; j <= column; j++) {
    mumOfCol[j] = j;
  }
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Table</span>
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

        <div className="w-[973px] h-[364px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Name</h3>
            <input
              type="text"
              placeholder="Enter name"
              className="h-[24px] w-[948px] px-5 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Table layout</h3>
            <div className="flex justify-start items-center gap-5 mt-3">
              <div className="flex justify-start items-center gap-2">
                <span>Row</span>
                <input
                  type="text"
                  className="w-[74px] h-[24px] outline-none border-[.2px] border-[#5B5B5BB2] px-2 rounded-sm"
                />
              </div>
              <div className="flex justify-start items-center gap-2">
                <span>Column</span>
                <input
                  type="text"
                  className="w-[74px] h-[24px] outline-none border-[.2px] border-[#5B5B5BB2] px-2 rounded-sm"
                />
              </div>
            </div>
            <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
              <span className="text-white text-[14px] font-bold">
                Settings of Table
              </span>
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer mr-3" />
            </div>
            {/* table */}
            <div className="w-[948px] flex justify-center items-center mt-3">
              {numOfRow.map((newRow) => (
                <div key={newRow} className={`flex flex-col`}>
                  {mumOfCol.map((newCol) => (
                    <div key={newCol} className={``}>
                      <input
                        type="text"
                        className="w-[316px] h-[30px] px-2 outline-none border-[1px] border-[#5B5B5BCC]"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartTable;
