import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneFilePdf, AiTwotoneSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllSender from "../FilterAllSender/Index";
import EmailReportInfo from "./EmailReportInfo";
import { BiDownArrow } from "react-icons/bi";
import { TiArrowSortedUp } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";

const EmailTableHead = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "Sender",
  },
  {
    id: 3,
    name: "Receiver",
  },
  {
    id: 4,
    name: "Subject",
  },
  {
    id: 5,
    name: "Details",
  },
];

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

export default function EmailReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1">Email</h1>
      </div>
      <div className="rounded-md h-[560x] overflow-y-scroll">
        <div className="mt-2">
          <div className="w-full rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED]">
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
                    className="-mr-5 text-sm "
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
                <div className="flex gap-3 ml-3">
                  <FilterAllSender></FilterAllSender>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 bg-white">
          <table className="w-full">
            <thead className="border-b-2">
              {/* <tr className="border-b "> */}
              {EmailTableHead.map((tableHead) => (
                <th
                  key={tableHead.id}
                  className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                >
                  <div className="flex">
                    {tableHead.name}
                    {tableHead.name === "Date" && (
                      <div className="ml-1">
                        <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                        <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {/* </tr> */}
            </thead>
            <tbody className="">
              {EmailReportInfo.map((info) => (
                <tr key={info.id} className="border-b-2">
                  <td className="text-sm p-3">
                    <div className="text-[#5b5b5b]">
                      <p>{info.date}</p>
                      <p>{info.time}</p>
                    </div>
                  </td>
                  <td className="text-sm text-[#5b5b5b] p-3">{info.sender}</td>
                  <td className="text-sm p-3 text-[#5b5b5b]">
                    {info.receiver}
                  </td>
                  <td className="text-sm p-3 text-[#5b5b5b]">{info.subject}</td>
                  <td className="text-sm w-2/6 p-3 text-[#5b5b5b]">
                    {info.details.substring(0, 90)}...
                    <a href="#" className=" no-underline ml-14 text-[#0089C9]">
                      Read More
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
