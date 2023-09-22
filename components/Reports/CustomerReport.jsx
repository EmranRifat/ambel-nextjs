import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomerReportInfo from "./CustomerReportInfo";
import FilterAllBranch from "../FilterAllBranch";
import FilterStatus from "../FilterStatus/Index";
import { TiArrowSortedUp } from "react-icons/ti";
import { BiDownArrow } from "react-icons/bi";

const CustomerTableHead = [
  {
    id: 1,
    name: "No",
  },
  {
    id: 2,
    name: "Name",
  },
  {
    id: 3,
    name: "Branch",
  },
  {
    id: 4,
    name: "Gender",
  },
  {
    id: 5,
    name: "Date of Birth",
  },
  {
    id: 6,
    name: "Address",
  },
  {
    id: 7,
    name: "City",
  },
  {
    id: 8,
    name: "Zip Code",
  },
  {
    id: 9,
    name: "Email",
  },
  {
    id: 10,
    name: "Phone Number",
  },
  {
    id: 11,
    name: "Fax Number",
  },
  {
    id: 12,
    name: "Referral",
  },
  {
    id: 13,
    name: "First Visit",
  },
  {
    id: 14,
    name: "Last Visit",
  },
  {
    id: 15,
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

export default function CustomerReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1 fixed">
          Customer
        </h1>
      </div>
      <div className="rounded-md w-full bg-[#ffffff] relative">
        <div className="mt-11 bg-white absolute h-[600px] overflow-x-scroll overflow-y-scroll">
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
            <table className="w-[2100px]">
              <thead className="border-b-2">
                {/* <tr className="border-b "> */}
                {CustomerTableHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="p-3 text-base font-normal text-left  text-[#5b5b5b]"
                  >
                    <div className="flex">
                      {tableHead.name}
                      {tableHead.name === "Date" && (
                        <div className="ml-1">
                          <TiArrowSortedUp className="my-0  w-[15px] h-[16px]" />
                          <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody className="w-[2100px]">
                {CustomerReportInfo.map((info) => (
                  <tr key={info.id} className="border-b-2">
                    <td className="text-sm p-3 text-[#5b5b5b] w-[70px]">
                      <p>{info.id}</p>
                    </td>
                    <td className="text-sm p-3 py-6  text-[#5b5b5b] w-[200px]">
                      {info.name}
                    </td>
                    <td className="text-sm p-3 py-6 w-[100px] text-[#5b5b5b]">
                      {info.branch}
                    </td>
                    <td className="text-sm p-3 py-6 w-[100px] text-[#5b5b5b]">
                      {info.gender}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.dateOfBirth}
                    </td>
                    <td className="text-sm p-3 py-6 w-[250px] text-[#5b5b5b]">
                      {info.address}
                    </td>
                    <td className="text-sm p-3 py-6 w-[120px] text-[#5b5b5b]">
                      {info.city}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.zipcode}
                    </td>
                    <td className="text-sm p-3 py-6 w-[220px] text-[#5b5b5b]">
                      {info.email}
                    </td>
                    <td className="text-sm p-3 py-6 w-[200px] text-[#5b5b5b]">
                      {info.phonenumber}
                    </td>
                    <td className="text-sm p-3 py-6 w-[200px] text-[#5b5b5b]">
                      {info.faxnumber}
                    </td>
                    <td className="text-sm p-3 py-6 w-[200px] text-[#5b5b5b]">
                      {info.referral}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.firstvisit}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-[#5b5b5b]">
                      {info.lastvisit}
                    </td>
                    <td className="text-sm p-3 py-6 w-[150px] text-lime-700">
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
