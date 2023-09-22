import React, { forwardRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import PackageReportInfo from "./PackageReportInfo";
import FeesReportInfo from "./FeesReportInfo";

const FeesTableHead = [
  {
    id: 1,
    name: "Fee Name",
  },
  {
    id: 2,
    name: "Branch",
  },
  {
    id: 3,
    name: "Number of Used",
  },
  {
    id: 4,
    name: "Total Amount",
  },
];

export default function FeesReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">Fee</h1>
      </div>
      <div className="rounded-md w-full bg-[#ffffff] relative">
        <div className="mt-11 bg-white w-full absolute h-[600px] overflow-x-scroll overflow-y-scroll">
          <div className="rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED] ">
            <div className="flex w-full">
              <div className="w-full flex">
                <div className="flex gap-3 mx-3">
                  <FilterAllBranch></FilterAllBranch>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 max  ">
            <table className="w-full">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {FeesTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3  text-base text-center font-normal text-[#5b5b5b]"
                  >
                    <div className="flex mx-auto">
                      {tableHead.name}
                      {(tableHead.name === "Branch" ||
                        tableHead.name === "Total Amount") && (
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
                {FeesReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-center text-sm p-3 w-1/4 text-[#5b5b5b] ">
                      <p>{info.feename}</p>
                    </td>
                    <td className="text-center text-sm p-3 w-[250px] py-6  text-[#5b5b5b]">
                      {info.branch}
                    </td>
                    <td className="text-center text-sm p-3 w-[250px] py-6 text-[#5b5b5b]">
                      {info.numberOfUsed}
                    </td>
                    <td className="text-center text-sm p-3 py-6 text-[#5b5b5b]">
                      {info.totalAmount}
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
