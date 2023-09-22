import { ref } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { SlPrinter } from "react-icons/sl";
import Image from 'next/image'
import m1 from './Images/m1.svg'
import m2 from './Images/m2.svg'
import m3 from './Images/m3.svg'

import AppointmentTableTabInfo from "./AppointmentTableTabInfo.js";

const appointmentTableTabHead = [
  {
    id: "1",
    name: "Date",
  },
  {
    id: "2",
    name: "Time",
  },
  {
    id: "3",
    name: "Service name",
  },
  {
    id: "4",
    name: "Staff",
  },
  {
    id: "5",
    name: "Type",
  },
  {
    id: "6",
    name: "Payment",
  },
];

export default function AppoinmentInfo() {
  const [threedot, setThreedot] = useState(false);
  const [id, setId] = useState(-1);
  const [appointment, setAppointment] = useState(false);

  const threeDotRef = useRef(null);
  const appointmentRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (threeDotRef.current && event.target) {
        if (threeDotRef.current.contains(event.target) == false) {
          // setOpenPrimary(false);
          setThreedot(false);
        }
      }
      if (appointmentRef.current && event.target) {
        if (appointmentRef.current.contains(event.target) == false) {
          setAppointment(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);
  return (
    <>
      <div className="h-[600px]">
        {/* Upcomming Appointment */}
        <div className="bg-[#efefef] rounded mt-2">
          <div className="bg-[#efefef] rounded">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex">
              <FaCalendarAlt className="my-auto ml-3 mr-2 text-2xl text-[#19525A]" />
              <h1 className="text-[20px] font-medium my-[10px] text-[#5b5b5b]">
                Upcoming Appointment
              </h1>
            </div>
          </div>
          <div className="w-full bg-[#efefef] rounded-[4px] h-[210px] overflow-y-scroll">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {appointmentTableTabHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="px-3 py-1 text-base font-medium text-left text-[#5b5b5b]"
                  >
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody>
                {AppointmentTableTabInfo.map((info, index) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.time}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">
                      {info.service}
                    </td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.type}</td>
                    <td className="text-sm w-[170px] pl-3 pr-3 py-1 text-[#5b5b5b]">
                      <div className="flex justify-between w-full">
                        <div className="flex text-[#5b5b5b]">
                          {info.payment}
                        </div>
                        <BsThreeDotsVertical
                          onClick={() => {
                            setId(index)
                            setThreedot((event) => {
                              return !event;
                            });
                          }}
                          className="text-2xl ml-auto mr-[18px]"
                        />
                        <div className="relative">
                          {(threedot === true && id === index) && (
                            <div
                              id="dropdownDots"
                              className="z-20  absolute -right-[10px] top-4 rounded-[4px] w-[86px] h-[94px]"
                            >
                              <div className="flex w-full ml-[41px]">
                                <div
                                  className="w-0 h-0 
                               border-l-[5px] border-l-transparent
                               border-b-[10px] border-b-white
                               border-r-[5px] border-r-transparent shadow-left shadow-right"
                                >
                                </div>
                              </div>
                              <div className=" bg-white shadow rounded">
                                <button className="px-3 py-2 text-[14px] hover:bg-gray-200 text-[#5b5b5b] w-full text-left">Edit</button>
                                <button className="px-3 py-2 text-[14px] hover:bg-gray-200 text-[#5b5b5b] w-full text-left">Cancel</button>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Appointment */}
        <div className="bg-[#efefef] rounded mt-2">
          <div className="bg-[#efefef] rounded mt-3">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex" ref={appointmentRef}>
              <FaCalendarAlt className="my-auto ml-3 mr-2 text-2xl text-[#19525A]" />
              <h1 className="text-[20px] my-[10px] font-medium text-[#5b5b5b]">
                All Appointment
              </h1>

              <BsThreeDotsVertical
                onClick={() => {
                  setAppointment((event) => {
                    return !event;
                  });
                }}
                className="text-2xl ml-auto my-auto mr-[30px]"
              />
              <div className="relative">
                {appointment === true && (
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
          <div className="w-full bg-[#efefef] rounded-[4px] h-[255px] overflow-y-scroll">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {appointmentTableTabHead.map((tableHead) => (
                  <th
                    key={tableHead.id}
                    className="px-3 py-1 text-base text-left font-medium text-[#5b5b5b]"
                  >
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody>
                {AppointmentTableTabInfo.map((info, index) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.time}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">
                      {info.service}
                    </td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.type}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">
                      <div className="flex w-full justify-between text-[#5b5b5b] relative">
                        <div className="flex">{info.payment}</div>

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
