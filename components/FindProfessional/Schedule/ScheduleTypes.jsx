import React from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Dropdown from "../../Dropdown";
import DaySchedule from "./DaySchedule";
import { useState } from "react";

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

const conflicts = [
  {
    id: 1,
    date: "Wednesday Dec 20, 2022",
  },
  {
    id: 2,
    date: "Wednesday Dec 20, 2022",
  },
  {
    id: 3,
    date: "Wednesday Dec 20, 2022",
  },
];

const ScheduleTypes = ({ scheduleTypes, setConflict, setOpenCreate }) => {
  const [fix, setFix] = useState(false);
  return (
    <React.Fragment>
      {scheduleTypes === "Day schedule" && <DaySchedule />}
      {scheduleTypes !== "Break" && (
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
      )}
      {scheduleTypes === "Dedicated appointment" && (
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
      )}

      {(scheduleTypes === "Dedicated appointment" ||
        scheduleTypes === "Class schedule" ||
        scheduleTypes === "Open for slot" ||
        scheduleTypes === "Break") && (
        <div className="w-full flex justify-between items-center mt-3 px-2">
          <div className=" w-[138px] flex flex-col">
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
          <div className="flex flex-col w-[138px]">
            <span className="text-[16px] text-[#5B5B5B]">Time*</span>
            <input
              type="text"
              placeholder="00:00 AM-00:00 AM"
              className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
            />
          </div>
        </div>
      )}
      {scheduleTypes === "Open for slot" && (
        <div className="w-full flex justify-between items-center mt-3 px-2">
          <div className=" w-[138px] flex flex-col">
            <span className="text-[16px] text-[#5B5B5B]">Number of slot*</span>
            <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
              <input
                type="text"
                placeholder="Enter a number"
                className="outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-[138px]">
            <span className="text-[16px] text-[#5B5B5B]">Time per slot*</span>
            <input
              type="text"
              placeholder="15 min"
              className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
            />
          </div>
        </div>
      )}
      {scheduleTypes === "Class schedule" && (
        <div className=" w-[280px] flex flex-col mt-3">
          <span className="text-[16px] text-[#5B5B5B]">
            Number of participante*
          </span>
          <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
            <input
              type="text"
              placeholder="Enter a number"
              className="outline-none w-full"
            />
          </div>
        </div>
      )}
      {scheduleTypes !== "Break" && (
        <div className="flex flex-col items-start w-full mt-3">
          <span className="text-[16px] text-[#5B5B5B] mb-2">
            Package and Membership
          </span>
          <Dropdown
            width={"280px"}
            items={["Package 1", "Package 2"]}
            selected={"Select a package"}
            onSelected={(selected) => {
              // onChangeValue({
              //   target: { name: "location", value: selected },
              // });
            }}
          />
        </div>
      )}
      {scheduleTypes !== "Break" && (
        <div className="w-full flex justify-start items-center mt-3 px-1">
          <div className=" w-[135px] flex flex-col">
            <span className="text-[16px] text-[#5B5B5B]">Discount</span>
            <div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
              <input
                type="text"
                placeholder="$00.00"
                className="outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-[135px] ml-2">
            <span className="text-[16px] text-[#5B5B5B]">Price</span>
            <input
              type="text"
              placeholder="$00.00"
              className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
            />
          </div>
        </div>
      )}
      {scheduleTypes !== "Break" && (
        <div className="flex flex-col items-start w-full mt-3">
          <span className="text-[16px] text-[#5B5B5B] mb-2">Payment type</span>
          <Dropdown
            width={"280px"}
            items={[
              "Pre-paid ",
              "Post-paid ",
              "Partial payment",
              "Free booking",
            ]}
            selected={"Select payment type"}
            onSelected={(selected) => {
              // onChangeValue({
              //   target: { name: "location", value: selected },
              // });
            }}
          />
        </div>
      )}
      {scheduleTypes !== "Break" && (
        <div className="flex flex-col items-start w-full mt-3">
          <span className="text-[16px] text-[#5B5B5B] mb-2">
            Appointment type
          </span>
          <Dropdown
            width={"280px"}
            items={["Online meeting", "Offline meeting", "Patient choice"]}
            selected={"Select repeated day"}
            onSelected={(selected) => {
              // onChangeValue({
              //   target: { name: "location", value: selected },
              // });
            }}
          />
        </div>
      )}
      {scheduleTypes === "Break" && (
        <div className="flex flex-col items-start w-full mt-3">
          <span className="text-[16px] text-[#5B5B5B] mb-2">
            Repeat schedule
          </span>
          <Dropdown
            width={"280px"}
            items={["1 day", "2 day", "3 day"]}
            selected={"Select appointment type"}
            onSelected={(selected) => {
              // onChangeValue({
              //   target: { name: "location", value: selected },
              // });
            }}
          />
        </div>
      )}
      {scheduleTypes === "Break" && (
        <>
          <div className="w-full flex justify-between items-center mt-3 px-2">
            <div className=" w-[138px] flex flex-col">
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
            <div className=" w-[138px] flex flex-col">
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
                  day.id === 2 || day.id == 3 || day.id === 5 || day.id === 6
                    ? "bg-[#19525A] text-white"
                    : "none"
                } h-[25.5px] w-[25.5px] rounded-full flex justify-center items-center border-[1px] border-[#19525A] text-[10px]`}
              >
                {day.day}
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center mt-2">
            <p className="text-[10px] text-[#5B5B5B]">
              1 Schedule is <span className="text-[#FF0000]">conflict</span>. 2
              schedule is
              <span className="text-[#FF0000]">Staff unavailable!!</span>
              <span
                onClick={() => setFix(!fix)}
                className="cursor-pointer text-[#0089C9] ml-1"
              >
                Fix This
              </span>
            </p>
          </div>

          {/* fix this problems... */}
          {fix && (
            <div className="w-full flex flex-col justify-start items-start mt-2 p-1">
              {conflicts.map((conflict) => (
                <div key={conflict.id} className="mt-2 p-1">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-start">
                      <Image
                        src="/conflict.png"
                        height={20}
                        width={20}
                        alt="conflict"
                      />
                      <span className="ml-1 text-[#5B5B5B] text-[16px]">
                        {conflict.date}
                      </span>
                    </div>
                    <Image
                      src="/overwrite.png"
                      height={16}
                      width={16}
                      alt="overwrite"
                    />
                  </div>
                  <span className="text-[#5B5B5B] text-[12px]">
                    Service Name with Practitioner name
                  </span>
                  <input
                    type="text"
                    value={"Conflict 00:00 AM to 00:00 PM"}
                    className="outline-none border-[1px] border-[#19525A80] text-[#5B5B5B] text-[12px] rounded-md p-1"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="flex flex-col w-[280px] mt-3">
        <span className="text-[16px] text-[#5B5B5B]">Note</span>
        <input
          type="text"
          placeholder=""
          className="h-[44px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
        />
      </div>

      <div className="flex flex-col mt-3">
        <button
          onClick={() => {
            setConflict(true);
            setOpenCreate(false);
          }}
          className="h-[32px] w-[280px] rounded-md text-white shadow-lg text-center text-[16px] bg-[#19525A]"
        >
          Book an appointment
        </button>
        <button className="h-[32px] w-[280px] rounded-md text-white shadow-lg text-center text-[16px] bg-[#CD3434] mt-2">
          Remove appointment
        </button>
      </div>
    </React.Fragment>
  );
};

export default ScheduleTypes;
