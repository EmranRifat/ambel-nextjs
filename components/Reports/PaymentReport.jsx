import React, { forwardRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FilterAllBranch from "../FilterAllBranch";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterAllStuff from "../FilterAllStuff/Index";
import PaymentReportInfo from "./PaymentReportInfo";

const PaymentTableHead = [
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
    name: "Staff Name",
  },
  {
    id: 4,
    name: "Type",
  },
  {
    id: 5,
    name: "Amount",
  },
  {
    id: 6,
    name: "Received",
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

export default function PaymentReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">
          Payment
        </h1>
      </div>
      <div className="rounded-md w-full bg-[#ffffff] relative">
        <div className="mt-11 w-full bg-white absolute h-[600px] overflow-x-scroll overflow-y-scroll">
          <div className="rounded hidden md:flex justify-between py-2 border-b-2 bg-[#E4E7ED] ">
            <div className="flex w-full">
              <div className="w-full flex">
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
                    <FilterAllStuff></FilterAllStuff>
                  </div>
                  <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <table className="w-full">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {PaymentTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                  >
                    <div className="flex">
                      {tableHead.name}
                      {tableHead.name !== "Date" && (
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
                {PaymentReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 w-[160px] text-[#5b5b5b]">
                      <p>{info.date}</p>
                    </td>
                    <td className="text-sm w-[150px] p-3 py-6  text-[#5b5b5b] ">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 w-[250px] py-6 text-[#5b5b5b]">
                      {info.stuffname}
                    </td>
                    <td className="text-sm p-3 w-[180px] py-6 text-[#5b5b5b]">
                      {info.type}
                    </td>
                    <td className="text-sm p-3   py-6 text-[#5b5b5b]">
                      {info.amount}
                    </td>
                    <td className="text-sm p-3 py-6 text-[#5b5b5b]">
                      {info.received}
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
