import React, { forwardRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import StuffReportInfo from "./StuffReportInfo";
import FilterAllStuff from "../FilterAllStuff/Index";

const StuffTableHead = [
  {
    id: 1,
    name: "Name",
  },
  {
    id: 2,
    name: "Branch",
  },
  {
    id: 3,
    name: "Employed",
  },
  {
    id: 4,
    name: "Total Active Time",
  },
  {
    id: 5,
    name: "Task Complete",
  },
  {
    id: 6,
    name: "Task Failed",
  },
];

export default function StuffReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">Stuff</h1>
      </div>
      <div className="rounded-md w-full bg-[#ffffff] relative">
        <div className="mt-11 w-full bg-white absolute h-[600px] overflow-x-scroll overflow-y-scroll">
          <div className="rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED] ">
            <div className="flex w-full">
              <div className="w-full flex">
                <div className="flex gap-3 mx-3">
                  <FilterAllBranch></FilterAllBranch>
                  <FilterAllStuff></FilterAllStuff>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2  ">
            <table className="w-full">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {StuffTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                  >
                    <div className="flex">
                      {tableHead.name}
                      {tableHead.name !== "Name" && (
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
                {StuffReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 text-[#5b5b5b] w-[200px]">
                      <p>{info.name}</p>
                    </td>
                    <td className="text-sm p-3 py-6  text-[#5b5b5b] w-[120px]">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 py-6 w-[140px] text-[#5b5b5b]">
                      {info.Employed}
                    </td>
                    <td className="text-sm p-3 text-center py-6 w-[170px] text-[#5b5b5b]">
                      {info.totalactivetime}
                    </td>
                    <td className="text-sm p-3 text-center py-6 w-[160px] text-[#5b5b5b]">
                      {info.taskcomlete}
                    </td>
                    <td className="text-sm p-3 text-center py-6 w-[140px] text-[#5b5b5b]">
                      {info.taskfailed}
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
