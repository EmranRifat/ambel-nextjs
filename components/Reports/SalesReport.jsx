import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import FilterStatus from "../FilterStatus/Index";
import SalesReportInfo from "./SalesReportInfo";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";

const SalesTableHead = [
  {
    id: 1,
    name: "Invoice No",
  },
  {
    id: 2,
    name: "Date",
  },
  {
    id: 3,
    name: "Branch",
  },
  {
    id: 4,
    name: "Item Name",
  },
  {
    id: 5,
    name: "Quantity",
  },
  {
    id: 6,
    name: "Customer Name",
  },
  {
    id: 7,
    name: "Staff Name",
  },
  {
    id: 8,
    name: "Price",
  },
  {
    id: 9,
    name: "Ambel Fee",
  },
  {
    id: 10,
    name: "Discount",
  },
  {
    id: 11,
    name: "Shipping",
  },
  {
    id: 12,
    name: "Tax",
  },
  {
    id: 13,
    name: "Total",
  },
  {
    id: 14,
    name: "Status",
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

export default function SalesReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">Sales</h1>
      </div>
      <div className="rounded-md bg-[#ffffff] relative">
        <div className="mt-11 bg-white absolute rounded h-[600px] overflow-x-scroll overflow-y-scroll">
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
                  <FilterStatus></FilterStatus>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 max  overflow-y-scroll">
            <table className="w-[2300px]">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {SalesTableHead.map((tableHead) => (
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
              <tbody className="w-[2300px]">
                {SalesReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 text-[#5b5b5b] w-[100px]">
                      <p>{info.invoiceno}</p>
                    </td>
                    <td className="text-sm p-3 text-[#5b5b5b] w-[120px]">
                      <div>
                        <p>{info.date}</p>
                        <p>{info.time}</p>
                      </div>
                    </td>
                    <td className="text-sm p-3  w-[100px] text-[#5b5b5b]">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.itemname}
                    </td>
                    <td className="text-sm p-3  w-[100px] text-[#5b5b5b]">
                      {info.quantity}
                    </td>
                    <td className="text-sm p-3 w-[160px] text-[#5b5b5b]">
                      {info.customername}
                    </td>
                    <td className="text-sm p-3 w-[180px] text-[#5b5b5b]">
                      {info.staff}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.price}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.ambelfee}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.discount}
                    </td>
                    <td className="text-sm p-3 w-[120px] text-[#5b5b5b]">
                      {info.shipping}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.tax}
                    </td>
                    <td className="text-sm p-3 w-[100px] text-[#5b5b5b]">
                      {info.total}
                    </td>

                    <td className="text-sm p-3 w-[120px] text-lime-700">
                      {info.status}
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
