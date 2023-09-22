import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import DropDownCase from "./DropDownFile/DropDownCase";
import DropDownFileType from "./DropDownFile/DropDownFileType";
import FileTableTabInfo from "./FileTableTabInfo";
import { AiTwotoneFilePdf } from "react-icons/ai";
import { RiVideoLine } from "react-icons/ri";

const CustomDateRange = () => {
  const customrange = ({ value, onClick }, ref) => {
    return (
      <div className="flex items-center ml-4">
        <div className="flex h-[32px] bg-white rounded-[8px] px-[10px] border-[0.5px]  border-[#19525A80] ">
          <div className="text-[rgb(91,91,91)] text-[14px] font-[500] mr-3 my-auto ">
            {value}
          </div>
          <div
            ref={ref}
            onClick={onClick}
            className="cursor-pointer my-auto flex"
          >
            <Image className="my-auto" src="/calendar.png" height={15} width={15} alt="calendar" />
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

export default function FileInfo() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="h-[600px] mt-2">
      <div className="rounded-md bg-[#efefef]">
        <div className=" pt-2">
          <div className="w-full rounded-t-[4px] hidden md:flex justify-between pb-2 border-b-[0.5px] border-[#5b5b5b73]">
            <div className="flex w-full">
              <div className="w-full m-0 flex">
                <div className="z-10">
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
                    className="-mr-5 text-sm"
                    // @ts-ignore
                    customInput={<RangeComponent />}
                    startDate={startDate}
                    dateFormat="dd MMM, yyyy"
                    // minDate={new Date()}
                    endDate={endDate}
                    selectsRange
                    withPortal
                  />
                </div>
                <div className="flex my-auto">
                  <DropDownCase></DropDownCase>
                  <DropDownFileType></DropDownFileType>
                </div>
              </div>
              <div className="flex w-2/4 justify-end ">
                <div className="h-[32px] overflow-hidden bg-white flex items-center my-auto justify-between px-2  border-[0.5px] border-[#19525A80] rounded-[8px] mr-5 hover:ring-1">
                  <input
                    type="text"
                    placeholder="Search file name..."
                    className="outline-none p-1 border-0 hover:border-0 bg-white"
                  />
                  <BiSearch className="text-base opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap p-3  justify-center h-[520px] overflow-y-scroll">
          {FileTableTabInfo.map((info) => (
            <div key={info.id} className="h-[150px] w-[126px] rounded-[4px]  border-[0.5px]  border-[#19525A80]">
              <div className="h-[117px] p-3 flex border-1 bg-[#D9D9D9] rounded-t-[4px]">
                <AiTwotoneFilePdf className="text-3xl my-auto mx-auto" />
              </div>
              <div className="flex mt-auto h-[32px] w-full bg-white p-1 border-t-[0.5px]  border-[#19525A80] rounded-b-[4px]">
                <RiVideoLine className="my-auto ml-1 w-[16px] h-[16px]" />
                <p className="text-xs ml-2 my-auto text-[#5b5b5b]">{info.fileName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
