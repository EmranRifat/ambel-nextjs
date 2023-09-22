import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneFilePdf, AiTwotoneSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AppointmentReportInfo } from "./AppointmentReportInfo";
import { BiDownArrow, BiSearch } from "react-icons/bi";
import { RiVideoLine } from "react-icons/ri";
import FilterAllBranch from "../FilterAllBranch";
import FilterAllCustomers from "../FilterAllCustomers";
import FilterAllAppointment from "../FilterAllAppointment/Index";
import FilterStatus from "../FilterStatus/Index";
import { IoVideocam } from "react-icons/io5";
import { TiArrowSortedUp } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";

const AppointmentTableHead = [
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
    name: "Customer Name",
  },
  {
    id: 4,
    name: "Practioner Name",
  },
  {
    id: 5,
    name: "Booking Info",
  },
  {
    id: 6,
    name: "Staus",
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

export default function AppointmentReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1">Appointment</h1>
      </div>
      <div className="rounded-md h-[560px] overflow-x-scroll">
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
                  <FilterAllBranch></FilterAllBranch>
                  <FilterAllCustomers></FilterAllCustomers>
                  <FilterAllAppointment></FilterAllAppointment>
                  <FilterStatus></FilterStatus>
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
              {AppointmentTableHead.map((tableHead) => (
                <th
                  key={tableHead.id}
                  className="p-3 text-base text-left font-normal text-[#5b5b5b]"
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
              {AppointmentReportInfo.map((info) => (
                <tr key={info.id} className="border-b-2">
                  <td className="text-sm p-3">
                    <div className="text-[#5b5b5b]">
                      <p>{info.date}</p>
                      <p>{info.time}</p>
                    </div>
                  </td>
                  <td className="text-sm text-[#5b5b5b] p-3">{info.branch}</td>
                  <td className="text-sm p-3 text-[#0089C9]">
                    {info.customerName}
                  </td>
                  <td className="text-sm p-3 text-[#0089C9]">
                    {info.practitionerName}
                  </td>
                  <td className="text-sm p-3">
                    <div className="justify-between w-full">
                      <p className="text-[#FF5C00]">{info.BookingType}</p>
                      <p className="text-[#00A455]">
                        <span className="text-[#5B5B5B]">Price :</span>
                        {info.BookingPrice}
                      </p>
                      <div className="flex">
                        <p className="text-[#0089C9]">
                          <span className="text-[#5B5B5B]">Type :</span>
                          {info.BookingMedium === "Offline" && (
                            <span className="ml-1 text-[#5b5b5b]">
                              {info.BookingMedium}
                            </span>
                          )}
                        </p>
                        {info.BookingMedium === "Online" && (
                          <>
                            <span className="ml-1 text-[#0089C9]">
                              {info.BookingMedium}
                            </span>
                            <div className="flex text-[#3300FF]">
                              <IoVideocam className="mx-1 text-[#0089C9] text-xl my-auto " />
                              {info.callDuration}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm p-3 text-[#00A455]">{info.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
