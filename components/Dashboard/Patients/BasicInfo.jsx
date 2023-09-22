import React from "react";
import { BsBellFill } from "react-icons/bs";
import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoCall, IoHome } from "react-icons/io5";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { items } from "../Chart/AddChartItems";
import Image from "next/image";
import BasicInfoItems from "./BasicInfoItem";
import file from './Images/file.svg'

export default function BasicInfo() {
  return (
    <>
      <div className="w-full">
        <div className="flex">
          <div className="w-1/2 h-[379px] bg-[#efefef] mt-2 mr-1 p-3 rounded-[4px]">
            <div className="flex my-auto p-2">
              <FaUserAlt className="text-base my-auto mr-2 text-[#19535A]" />
              <p className="text-base text-[#5b5b5b]">Abdul Kader Akash</p>
            </div>
            <div className="flex my-auto p-2">
              <HiMail className="text-xl my-auto mr-2 -m-[2px] text-[#19535A]" />
              <p className="text-base  text-[#5b5b5b]">ttazulislam96@gmail.com </p>
            </div>
            <div className="flex my-auto p-2 ">
              <IoCall className="text-base my-auto mr-2 text-[#19535A]" />
              <p className="text-base  text-[#5b5b5b]">+8801687771913</p>
            </div>
            <div className="flex my-auto p-2">
              <IoHome className="text-2xl mr-2 text-[#19525A]" />
              <p className="text-base  text-[#5b5b5b]">
                13 Jomider Bari, Nibas Modina market, Sylhet Sadar Sylhet,
                Bangladesh
              </p>
            </div>
            <div className="flex my-auto p-2">
              <FaBirthdayCake className="text-base my-auto mr-2 text-[#19535A]" />
              <p className="text-base  text-[#5b5b5b]">02 July 1996</p>
            </div>
          </div>
          <div className="w-1/2 h-[379px] bg-[#efefef] mt-2 ml-1 p-3 rounded-[4px]">
            <div className="flex my-auto p-2">
              <BsBellFill className="text-lg my-auto mr-3 ml-1 text-[#19525A]" />
              <p className="text-base  text-[#5b5b5b]">Reminders</p>
            </div>

            <div className="flex p-2">
              <div className="">
                <h6 className="rounded-full px-[10px] py-1 mr-2 text-sm  text-[#19525A] bg-[#C4DBCC]">
                  1
                </h6>
              </div>
              <div>
                <div className="w-full flex">
                  <div className="w-3/4 mr-auto">
                    <p className="text-sm text-[#19525A]">Before Appointment</p>
                  </div>
                  <div className="flex">
                    <MdModeEditOutline className=" text-[#19525A]" />
                    <MdDelete className="text-[#FF0000]" />
                  </div>
                </div>

                <p className="text-xs  text-[#5b5b5b]">
                  Send reminder before 2 days of the appointment System: Email-
                  akashsust44@gmail.com
                </p>
              </div>
            </div>
            <div className="flex p-2">
              <div className="">
                <h6 className="rounded-full px-[10px] py-1 mr-2 text-sm  text-[#19525A] bg-[#C4DBCC]">
                  2
                </h6>
              </div>
              <div>
                <div className="w-full flex">
                  <div className="w-3/4 mr-auto">
                    <p className="text-sm text-[#19525A]">Before Appointment</p>
                  </div>
                  <div className="flex">
                    <MdModeEditOutline className=" text-[#19525A]" />
                    <MdDelete className="text-[#FF0000]" />
                  </div>
                </div>

                <p className="text-xs  text-[#5b5b5b]">
                  Send reminder before 2 days of the appointment System: Email-
                  akashsust44@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 rounded-[4px] justify-center bg-[#efefef] p-[22px] gap-4 h-[195px] overflow-y-scroll">
          {
            BasicInfoItems.map((item) => (
              <div key={item.id} className="w-[143px] h-[140px] rounded-[4px] bg-white border-[0.5px] border-[#19525A80] flex">
                <div className="flex w-full h-[28px] mt-auto bg-[#efefef] border-t-[0.5px] border-[#19525A80] rounded-b-[4px]">
                  <div className="mx-2 my-auto">
                    <Image src={file} className="w-[10px] h-[12px] my-auto" alt="This is an Image" />
                  </div>
                  <p className="text-[#5b5b5b] my-auto">
                    {
                      item.fileName
                    }
                  </p>
                </div>
              </div>))
          }
        </div>
      </div>
    </>
  );
}
