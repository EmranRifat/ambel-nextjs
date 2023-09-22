import Image from "next/image";
import React from "react";
import Dropdown from "../../Dropdown";
import { BiSearch } from "react-icons/bi";

const days = [
  {
    id: 1,
    day: "S",
  },
  {
    id: 2,
    day: "M",
  },
  {
    id: 3,
    day: "T",
  },
  {
    id: 4,
    day: "W",
  },
  {
    id: 5,
    day: "T",
  },
  {
    id: 6,
    day: "F",
  },
  {
    id: 7,
    day: "S",
  },
];
const DaySchedule = () => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-start items-center mt-3 px-2">
        <div className=" w-[135px] flex flex-col">
          <span className="text-[16px] text-[#5B5B5B]">Date*</span>
          <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
            <input
              type="text"
              placeholder="DD/MM"
              className="outline-none w-[100px]"
            />
            <Image
              src="/calendar.png"
              height={16}
              width={16}
              alt="clendar"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col w-[135px] ml-2">
          <span className="text-[16px] text-[#5B5B5B]">Working hour*</span>
          <input
            type="text"
            placeholder="00:00 AM-00:00 AM"
            className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
          />
        </div>
      </div>
      <div className=" w-[280px] flex flex-col mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Name of the schedule</span>
        <Dropdown
          width={"280px"}
          items={["name-1", "name-2"]}
          selected={"Put a schedule name"}
          onSelected={(selected) => {
            // onChangeValue({
            //   target: { name: "location", value: selected },
            // });
          }}
        />
      </div>
      <div className=" w-[280px] flex flex-col mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Repeat schedule</span>
        <Dropdown
          width={"280px"}
          items={["No repeat", "Everyday", "Same day in every week", "Custom"]}
          selected={"Select repeat schedule"}
          onSelected={(selected) => {
            // onChangeValue({
            //   target: { name: "location", value: selected },
            // });
          }}
        />
      </div>
      <div className="w-full flex justify-start items-center mt-3 px-2">
        <div className=" w-[135px] flex flex-col">
          <span className="text-[16px] text-[#5B5B5B]">From*</span>
          <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
            <input
              type="text"
              placeholder="DD/MM"
              className="outline-none w-[100px]"
            />
            <Image
              src="/calendar.png"
              height={16}
              width={16}
              alt="clendar"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className=" w-[135px] flex flex-col ml-2">
          <span className="text-[16px] text-[#5B5B5B]">To*</span>
          <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
            <input
              type="text"
              placeholder="DD/MM"
              className="outline-none w-[100px]"
            />
            <Image
              src="/calendar.png"
              height={16}
              width={16}
              alt="clendar"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-2 mt-3">
        {days.map((day, i) => (
          <div
            key={i}
            className={`${
              day.id === 2 ? "bg-[#19525A] text-white" : "none"
            } h-[25.5px] w-[25.5px] rounded-full flex justify-center items-center border-[1px] border-[#19525A] text-[10px]`}
          >
            {day.day}
          </div>
        ))}
      </div>
      <div className=" w-[280px] flex flex-col mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Choose an action</span>
        <Dropdown
          width={"280px"}
          items={["Action-1", "Action-2"]}
          selected={"Choose an action"}
          onSelected={(selected) => {
            // onChangeValue({
            //   target: { name: "location", value: selected },
            // });
          }}
        />
      </div>
      <div className="flex flex-col items-start w-full mt-3">
        <span className="text-[16px] text-[#5B5B5B] mb-2">Service</span>
        <Dropdown
          width={"280px"}
          items={["Service 1", "Service 2", "Service 3"]}
          selected={"Select a service"}
          onSelected={(selected) => {
            // onChangeValue({
            //   target: { name: "location", value: selected },
            // });
          }}
        />
      </div>
      <div className="flex flex-col mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Patient Name</span>
        <div className="w-[280px] h-[40px] flex justify-between items-center px-2 border-[1px] border-gray-300  mt-1 rounded-md">
          <input
            type="text"
            placeholder="Enter or search patient name"
            className=" border-none text-[16px] px-2 outline-none "
          />
          <BiSearch className="text-lg opacity-30" />
        </div>
      </div>
      <div className=" w-[280px] flex flex-col mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Time*</span>
        <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
          <input
            type="text"
            placeholder="00:00 AM-00:00 AM"
            className="outline-none w-full"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DaySchedule;
