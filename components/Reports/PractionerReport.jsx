import React, { forwardRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import { BiDownArrow } from "react-icons/bi";
import PractionerReportInfo from "./ParctionerReportInfo";
import FilterAllPractioner from "../FilterAllPractioner/Index";
import { MdPlayArrow } from "react-icons/md";

const PractionerTableHead = [
  {
    id: 1,
    name: "Name",
  },
  {
    id: 2,
    name: "Book By Hours",
  },
  {
    id: 3,
    name: "Total Appiontment",
  },
  {
    id: 4,
    name: "Total Cancel",
  },
  {
    id: 5,
    name: "Total Video Call",
  },
  {
    id: 6,
    name: "Total Audio Call",
  },
  {
    id: 7,
    name: "Most Selling Service",
  },
  {
    id: 8,
    name: "Most Valuable Service",
  },
];

export default function PractionerReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">
          Practitioner
        </h1>
      </div>
      <div className="rounded-md w-full bg-[#ffffff] relative">
        <div className="mt-11 bg-white absolute h-[600px] overflow-x-scroll overflow-y-scroll">
          <div className="rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED] ">
            <div className="flex w-full">
              <div className="w-full flex">
                <div className="flex gap-3 mx-3">
                  <FilterAllBranch></FilterAllBranch>
                  <FilterAllPractioner></FilterAllPractioner>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 max  ">
            <table className="w-[1500px]">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {PractionerTableHead.map((tableHead) => (
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
              <tbody className="w-[1500px]">
                {PractionerReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 text-[#5b5b5b] w-[170px]">
                      <p>{info.name}</p>
                    </td>
                    <td className="text-sm p-3 py-6  text-[#5b5b5b] w-[180px]">
                      {info.BookingHour}
                    </td>
                    <td className="text-sm p-3 py-6 w-[180px] text-[#5b5b5b]">
                      {info.totalappointment}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.totalcancel}
                    </td>
                    <td className="text-sm p-3 py-6 w-[180px] text-[#5b5b5b]">
                      {info.totalvideocall}
                    </td>
                    <td className="text-sm p-3 py-6 w-[180px] text-[#5b5b5b]">
                      {info.totalaudiocall}
                    </td>
                    <td className="text-sm p-3 py-6 w-[280px] text-[#0089C9]">
                      {info.mostsell}
                    </td>
                    <td className="text-sm p-3 py-6 w-[280px] text-[#0089C9]">
                      {info.mostvalue}
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
