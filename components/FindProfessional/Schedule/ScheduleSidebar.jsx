import Image from "next/image";
import React from "react";
import styles from "../Pyaments/payment.module.css";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

const users = [
  {
    id: 1,
    name: "Tazul Islam",
  },
  {
    id: 2,
    name: "Delwar Hossain",
  },
  {
    id: 3,
    name: "Rahat Mia",
  },
  {
    id: 4,
    name: "Moksedur Rahman",
  },
  {
    id: 5,
    name: "Muhit Mahmud",
  },
];
const ScheduleSidebar = ({ show, setShow, scrollToTop }) => {
  return (
    <React.Fragment>
      <div
        className={`${styles.scrollbar} h-[68vh] overflow-y-scroll  hidden md:block bg-[#F2F2F2] pb-2`}
      >
        <div className=" bg-white w-[259px] shadow-md shadow-slate-600 border-[#19525a49] rounded-[9px] border-[1px] mr-3">
          <div className="w-full flex flex-col items-center p-1 border-b-2 border-b-gray-300">
            <div className="w-[250px] h-[30px] bg-[#F9F9F9] flex justify-between items-center border-2 border-[#19525] border-opacity-[.7] px-2 rounded-md">
              <input
                type="text"
                placeholder="Find the practitioner schedule"
                className="outline-none border-none text-[#5B5B5BB2] text-[12px] bg-[#F9F9F9]"
              />
              <Image
                src={"/search.png"}
                height={12}
                width={12}
                alt="searchIcon"
              />
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <div className="flex justify-center items-center border-b-2 cursor-pointer border-gray-300 p-2">
              <span className="text-[14px] text-[#5B5B5BB2] mr-3">
                Location
              </span>
              <Image
                src="/downarrow.png"
                height={8}
                width={10}
                alt="downarrow"
              />
            </div>
            <div className="flex justify-center items-center border-b-2 cursor-pointer border-b-gray-300 p-2">
              <span className="text-[14px] text-[#5B5B5BB2] mr-3">
                All Staffs
              </span>
              <Image
                src="/downarrow.png"
                height={8}
                width={10}
                alt="downarrow"
              />
            </div>
          </div>
          <div>
            {users.map((user, idx) => (
              <div key={idx}>
                {idx !== 0 && show + 1 !== user.id && (
                  <div className="border-t-2 border-gray-300 mx-2"></div>
                )}
                <div
                  key={user.id}
                  onClick={() => {
                    setShow(user.id);
                    scrollToTop();
                  }}
                  className={
                    show === user.id
                      ? `bg-[#003F48E5] text-white px-2 mx-[1px] rounded-lg shadow-md shadow-slate-500 flex items-center justify-between `
                      : `hover:bg-[#929ea333] text-[#5B5B5B] px-2 rounded-lg`
                  }
                >
                  <div className="h-[75px] inline-flex items-center relative">
                    <Image
                      src="/schpro.png"
                      height={36}
                      width={33}
                      alt="icons"
                    />
                    <div className="items-center px-1 text-left font-normal text-[16px] cursor-pointer ml-2">
                      <span>{user.name}</span>
                    </div>
                  </div>
                  {show === user.id && (
                    <div className="flex">
                      <FaChevronDown className="text-md mr-2 cursor-pointer" />
                      <FaUserAlt className="text-md mr-2 cursor-pointer" />
                      <HiPlus className="text-lg mr-2 cursor-pointer" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleSidebar;
