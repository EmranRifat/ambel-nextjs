import React, { useState } from "react";
import { BsCalendarCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import PaymnetTableTabInfo from "./PaymentTableTabInfo";
import Image from 'next/image'
import m1 from './Images/m1.svg'
import m2 from './Images/m2.svg'
import m3 from './Images/m3.svg'
import appointmentIcon from './Images/appointment.svg'
import { SlPrinter } from "react-icons/sl";

const paymentTableTabHead = [
  {
    id: "1",
    name: "Invoice",
  },
  {
    id: "2",
    name: "Date",
  },
  {
    id: "3",
    name: "Service",
  },
  {
    id: "4",
    name: "Staff",
  },
  {
    id: "5",
    name: "Status",
  },
  {
    id: "6",
    name: "Amount",
  },
];

export default function PaymentInfo() {
  const [paymetDrop, setPaymentDrop] = useState(false);

  return (
    <>
      <div className="h-[600px]">
        {/* Upcomming appointment */}
        <div className="bg-[#efefef] rounded-[4px] mt-2">
          <div className="bg-[#efefef] rounded-[4px] mt-2">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex">
              <div className="pl-[9px] pr-[6px] mt-4">
                <Image src={appointmentIcon} alt="this is an icon" className="my-auto w-[28px] h-[24px] text-[#19525A]" />
              </div>
              <h1 className="text-[20px] my-[10px] font-medium text-[#5b5b5b]">Upcoming Payment</h1>
            </div>
          </div>
          <div className="w-full bg-[#efefef] rounded-[4px] h-[210px] overflow-y-scroll">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {paymentTableTabHead.map((tableHead) => (
                  <th key={tableHead.id} className="px-3 py-1 text-base text-left font-medium text-[#5b5b5b]">
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody className="">
                {PaymnetTableTabInfo.map((info) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.invoice}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.service}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm px-1 py-[10px]  flex">
                      {
                        (info.status === "Unpaid") && <p className="text-rose-600 bg-rose-200 px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Processing") && <p className="text-[#FF8A00] bg-[#ffe4c7] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Pending") && <p className="text-rose-800 bg-[#e9d5dc] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Paid") && <p className="text-[#00A455] bg-[#cdebdd] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                    </td>
                    <td className="text-sm p-3  text-[#5b5b5b]">
                      <div className="flex justify-between w-full">
                        <div className="flex">{info.amount}</div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Appointment */}
        <div className="bg-[#efefef] rounded-[4px] mt-3">
          <div className="bg-[#efefef] rounded-[4px] ">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex">
              <div className="pl-[9px] pr-[6px] mt-4">
                <Image src={appointmentIcon} alt="this is an icon" className="my-auto w-[28px] h-[24px] text-[#19525A]" />
              </div>
              <h1 className="text-[20px] font-medium my-3 text-[#5b5b5b]">All Payment</h1>

              <BsThreeDotsVertical
                onClick={() => {
                  setPaymentDrop((event) => {
                    return !event;
                  });
                }}
                className="text-2xl ml-auto my-auto mr-[30px]"
              />
              <div className="relative">
                {paymetDrop === true && (
                  <div
                    id="dropdownDots"
                    className="z-10  absolute -right-[20px] top-7 rounded-[4px] w-[140px] h-[140px]"
                  >
                    <div className="flex w-full ml-[73px]">
                      <div
                        className="w-0 h-0 
                      border-l-[5px] border-l-transparent
                      border-b-[10px] border-b-white
                      border-r-[5px] border-r-transparent shadow-left shadow-right"
                      >
                      </div>
                    </div>
                    <div className=" bg-white shadow rounded-[4px]">
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <SlPrinter className="text-[14px] text-black my-auto" /> <p className="text-[14px] my-auto text-[#5b5b5b] ml-[6px]">Print</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m1} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px] text-[#5b5b5b] my-auto ml-[6px]">Export As PDF</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m3} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p><p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As CSV</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <p className="my-auto"> <Image src={m2} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As XLS</p></button>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full bg-[#efefef] rounded h-[255px] overflow-y-scroll">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {paymentTableTabHead.map((tableHead) => (
                  <th key={tableHead.id} className="px-3 py-1 text-base text-left font-medium  text-[#5b5b5b]">
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody className="">
                {PaymnetTableTabInfo.map((info) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.invoice}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.service}</td>
                    <td className="text-sm p-3  text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm px-1 py-[10px]  flex">
                      {
                        (info.status === "Unpaid") && <p className="text-rose-600 bg-rose-200 px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Processing") && <p className="text-[#FF8A00] bg-[#ffe4c7] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Pending") && <p className="text-rose-800 bg-[#e9d5dc] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                      {
                        (info.status === "Paid") && <p className="text-[#00A455] bg-[#cdebdd] px-2 py-[2px] rounded-[4px]">{info.status}</p>
                      }
                    </td>
                    <td className="text-sm p-3  text-[#5b5b5b]">
                      <div className="flex justify-between w-full text-[#5b5b5b]">
                        <div className="flex">{info.amount}</div>

                      </div>
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
