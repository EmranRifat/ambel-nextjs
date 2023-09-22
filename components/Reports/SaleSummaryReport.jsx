import React, { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneFilePdf, AiTwotoneSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AppointmentReportInfo } from "./AppointmentReportInfo";
import { BiSearch } from "react-icons/bi";
import { RiVideoLine } from "react-icons/ri";
import FilterAllBranch from "../FilterAllBranch";
import FilterAllCustomers from "../FilterAllCustomers";
import FilterAllAppointment from "../FilterAllAppointment/Index";
import FilterStatus from "../FilterStatus/Index";
import { IoVideocam } from "react-icons/io5";
import FilterAllPractioner from "../FilterAllPractioner/Index";

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

export default function SaleSummaryReport() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div>
        <h1 className="text-3xl text-[#5B5B5B] font-bold ml-1">Sale Summary</h1>
      </div>
      <div className="rounded-md h-[600px] overflow-y-scroll overflow-x-scroll">
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
                  <FilterAllPractioner></FilterAllPractioner>
                </div>
                <BsThreeDotsVertical className="text-2xl ml-auto my-auto mr-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-[28px] mt-2 mb-5">Balance Sheet</h3>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Total Sales</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Collected Amount</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Due Amount</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Tax collection</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Discount Given</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Refunded Amount</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] border-b-2 pt-2 pb-5 text-[#5B5B5B] flex justify-between">
            <p>Shipping Cost Collection</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[24px] py-2 text-[#007E23] flex justify-between">
            <p>Grand Total</p>
            <p>$100000000.00</p>
          </div>

          <h3 className="text-[28px] mt-8">Transaction Medium</h3>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>E-Transfer</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Cash</p>
            <p>$100000.00</p>
          </div>

          <h3 className="text-[28px] mt-8">Wallet Transation</h3>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Add Balance</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Send Money</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Withdrawal Amount</p>
            <p>$100000.00</p>
          </div>

          <h3 className="text-[28px] mt-8">Performance</h3>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Service</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Product</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 text-[#5B5B5B] flex justify-between">
            <p>Package</p>
            <p>$100000.00</p>
          </div>
          <div className="text-[20px] py-2 mb-10 text-[#5B5B5B] flex justify-between">
            <p>Membership</p>
            <p>$100000.00</p>
          </div>
        </div>
      </div>
    </>
  );
}
