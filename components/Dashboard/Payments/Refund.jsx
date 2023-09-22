import Image from "next/image";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from "../../Dropdown";

const staffs = [
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Delwar",
    amount: "1000",
    status: "processesing",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Rahat",
    amount: "2000",
    status: "Completed",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Delwar",
    amount: "1000",
    status: "processesing",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Rahat",
    amount: "2000",
    status: "Completed",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Delwar",
    amount: "1000",
    status: "processesing",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Sohan",
    amount: "2000",
    status: "Completed",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Mijan",
    amount: "1000",
    status: "processesing",
  },
  {
    date: "03/09/22",
    time: "10 AM",
    invoiceNo: "1234",
    branch: "Sylhet",
    description: "Withdrawal, Duch bangl bank.",
    payer: "Tazul Islam",
    amount: "2000",
    status: "Completed",
  },
];
const Refund = () => {
  return (
    <>
      <div className=" h-screen">
        <div className="w-full flex justify-between">
          <span className="text-[32px] font-[700] text-[#5B5B5B]">Refund</span>
          <div className="flex items-center">
            <Image
              src="/icons/request.png"
              height="21px"
              width="18px"
              alt="request"
            />
            <span className="text-[16px] text-[#5B5B5B] ml-3">Request</span>
          </div>
        </div>
        <div className="w-full flex justify-between bg-[#E4E7ED] shadow-xl p-3 mt-3 rounded-md">
          <div className="flex justify-between ">
            <div className="w-full flex justify-center ml-5">
              <Dropdown
                items={["All branch", ""]}
                selected={"All branch"}
                width={"146px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
            <div className="w-full flex justify-center ml-5">
              <Dropdown
                items={["All staff"]}
                selected={"All staff"}
                width={"146px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
            <div className="w-full flex justify-center ml-5">
              <Dropdown
                items={["Status"]}
                selected={"Status"}
                width={"146px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
            <div className="w-full flex justify-center ml-5">
              <Dropdown
                items={["Date of payment"]}
                selected={"Date of payment"}
                width={"150px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
          </div>
        </div>
        <div className="bg-white shadow-md mb-4 px-4 py-1 h-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-600 border-b-2 border-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Invoice no
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Branch
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Payer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[#5B5B5B] text-[16px]"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  return (
                    <tr
                      className={`bg-white  border-b hover:bg-gray-50`}
                      key={index}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 flex flex-col font-normal text-gray-700 whitespace-nowrap"
                      >
                        <span>{staff.date}</span>
                        <span>{staff.time}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        #{staff.invoiceNo}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 flex flex-col font-normal text-gray-700 whitespace-nowrap"
                      >
                        {staff.branch}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        {staff.description}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        {staff.payer}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        {staff.amount}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        {staff.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
          <button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
            Show all
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Refund;
