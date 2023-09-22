import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import FilterStatus from "../FilterStatus/Index";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import FilterAllAction from "../FilterAllAction";
import SupportReportInfo from "./SupportReportInfo";
import ActivityReportInfo from "./ActivityReportInfo";

const ActivityTableHead = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "Branch",
  },
  {
    id: 3,
    name: "Activity Name",
  },
  {
    id: 4,
    name: "Done By",
  },
  {
    id: 5,
    name: "Action",
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

export default function ActivityReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">
          Activity
        </h1>
      </div>
      <div className="rounded-md bg-[#ffffff] relative">
        <div className="mt-11 w-full bg-white absolute rounded h-[600px] overflow-x-scroll overflow-y-scroll">
          <div className="rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED] ">
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
                  <FilterAllBranch></FilterAllBranch>
                  <FilterAllAction></FilterAllAction>
                  <FilterStatus></FilterStatus>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <table className="w-full">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {ActivityTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                  >
                    <div className="flex">
                      {tableHead.name}
                      {(tableHead.name === "Date" ||
                        tableHead.name === "Rating" ||
                        tableHead.name === "Branch") && (
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
              <tbody className="w-full">
                {ActivityReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 py-[16px] text-[#5b5b5b] w-[180px]">
                      <div>
                        <p>{info.date}</p>
                        <p>{info.time}</p>
                      </div>
                    </td>
                    <td className="text-sm p-3 py-[14px] w-[140px] text-[#5b5b5b]">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 py-[14px] w-[180px] text-[#5b5b5b]">
                      {info.activityname}
                    </td>
                    <td className="text-sm p-3 py-[14px] w-[200px] text-[#5b5b5b]">
                      {info.doneby}
                    </td>
                    <td className="text-sm p-3 py-[14px]  w-[330px] text-[#5b5b5b]">
                      <p>{info.action[0]}</p>
                      <p className="text-[#0093E5]">{info.action[1]}</p>
                      <p className="text-xs">{info.action[2]}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
