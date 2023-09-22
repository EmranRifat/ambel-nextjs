import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import dp from "./Images/dp.jpg";
import Image from "next/image";
import { FaBirthdayCake, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { IoCall, IoHome } from "react-icons/io5";
import { HiMail } from "react-icons/hi";
import { BsBellFill } from "react-icons/bs";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import BasicInfo from "./BasicInfo";
import AppoinmentInfo from "./AppoinmentInfo";
import PaymentInfo from "./PaymentInfo";
import CaseInfo from "./CaseInfo";
import HistoryInfo from "./HistoryInfo";
import FileInfo from "./FileInfo";


export default function CustomerModal({ visible, onClose }) {
  const [show, setShow] = useState("basicid");


  const HandleOnClose = (e) => {
    if (e.target.id === "customerModal") onClose();
  };
  if (!visible) return null;

  const customerDetaitlsTab = [
    {
      id: "basicid",
      name: "Basic Info",
    },
    {
      id: "appointmentid",
      name: "Appointment",
    },
    {
      id: "paymentid",
      name: "Payment",
    },
    {
      id: "casesid",
      name: "Cases",
    },
    {
      id: "fileid",
      name: "File",
    },
    {
      id: "historyid",
      name: "History",
    },
  ];
  const selectedStyle = "px-4 py-1 rounded-[4px] bg-[#19525A] text-white text-[20px]";
  const unSelectdStyle = "px-4 py-1 rounded-[4px] bg-[#FFFFFF] text-[#5b5b5b] text-[20px]";

  return (
    <>
      <div
        id="customerModal"
        onClick={HandleOnClose}
        className="flex inset-0 fixed tz-40 bg-[#000]/40  backdrop-blur-lg  overflow-y-scroll justify-center py-4 items-center"
      >
        <div>
          <div className="flex">
            <button
              onClick={onClose}
              className="btn-light text-light ml-auto -mr-5 pb-2"
            >
              <RxCross1 className="text-white text-lg " />
            </button>
          </div>
          <div className="bg-white p-[26px] rounded-[8px] w-[900px] h-[800px]">
            {/* name and dp */}
            <div className="text-center">
              <div className="-mt-[55px]">
                <Image
                  src={dp}
                  alt="Picture of the author"
                  width={80}
                  height={80}
                  className="rounded-full "
                />
              </div>
              <div>
                <h1 className="text-2xl text-[#5b5b5b]">Abdul Kader Akash</h1>
                <p className="text-base text-[#5B5B5B]">Patient no # 112</p>
              </div>
            </div>
            <div
              id="tabBar"
              className="flex justify-start border-b-[1px] pb-2 gap-5 pt-6"
            >
              {customerDetaitlsTab.map((tabitem) => (
                <button
                  key={tabitem.id}
                  onClick={() => setShow(tabitem.id)}
                  className={
                    tabitem.id == show ? selectedStyle : unSelectdStyle
                  }
                >
                  {tabitem.name}
                </button>
              ))}
            </div>

            {/* basic info */}
            {/* list view */}
            {show == "basicid" && <BasicInfo></BasicInfo>}
            {show == "appointmentid" && <AppoinmentInfo></AppoinmentInfo>}
            {show == "paymentid" && <PaymentInfo></PaymentInfo>}
            {show == "casesid" && <CaseInfo></CaseInfo>}
            {show == "fileid" && <FileInfo></FileInfo>}
            {show == "historyid" && <HistoryInfo></HistoryInfo>}

            {/* Appointment */}
          </div>
        </div>
      </div>
    </>
  );
}
