import React, { forwardRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import ProductReportInfo from "./ProductReportInfo";

const ProductTableHead = [
  {
    id: 1,
    name: "Product Name",
  },
  {
    id: 2,
    name: "Branch",
  },
  {
    id: 3,
    name: "Price",
  },
  {
    id: 4,
    name: "Total Sell",
  },
  {
    id: 5,
    name: "Most Buying Customer",
  },
  {
    id: 6,
    name: "Most Selling Practitioner",
  },
];

export default function ProductReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">
          Product
        </h1>
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
                {ProductTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                  >
                    <div className="flex">
                      {tableHead.name}
                      {(tableHead.name === "Branch" ||
                        tableHead.name === "Total Sell") && (
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
                {ProductReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 text-[#5b5b5b] w-[200px]">
                      <p>{info.productname}</p>
                    </td>
                    <td className="text-sm p-3 py-6  text-[#5b5b5b] w-[150px]">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 py-6 w-[100px] text-[#5b5b5b]">
                      {info.price}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.totalsell}
                    </td>
                    <td className="text-sm p-3 py-6 w-[250px] text-[#5b5b5b]">
                      {info.mostbuyingcustomer[0]} ({info.mostbuyingcustomer[1]}
                      )
                    </td>
                    <td className="text-sm p-3 py-6 w-[250px] text-[#5b5b5b]">
                      {info.mostsellingpractitioner[0]} (
                      {info.mostsellingpractitioner[1]})
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
