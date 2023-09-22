import Image from "next/image";
import React from "react";
import { useState } from "react";
import { MdClear } from "react-icons/md";
import ToggleApt from "./ToggleApt";

const ScheduleRejectModal = (props) => {
  const [toggle, setToggle] = useState(false);
  const onChangeValue = (event) => {
    setToggle(!toggle);
  };
  return (
    <React.Fragment>
      <div className="w-[490px] z-50 bg-white my-[5%] py-2 shadow m-auto rounded-md">
        <div className="w-full flex flex-col items-center bg-white rounded-md">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-end items-center px-2">
              <MdClear
                onClick={() => props.setRejectList(false)}
                className="text-xl text-[#5B5B5BB2] cursor-pointer"
              />
            </div>
            <span className="text-[16px] text-[#5B5B5B]">
              Do you want to reject this Appointment request?
            </span>
          </div>
          <div className="w-full flex flex-col justify-start items-start px-4 mt-2">
            <span className="text-[12px] text-[#5B5B5BB2]">Leave a note </span>
            <input
              type="text"
              className="w-full h-[60px] outline-none border-[1px] border-[#19525A80] mt-2 rounded-md"
            />
          </div>
          <div className="w-full flex justify-between ">
            <div className="flex items-center justify-start px-4 mt-2">
              <span className="text-[14px] text-[#5B5B5BB2] mr-3">
                Give another appointment time
              </span>
              <ToggleApt
                checked={toggle}
                setChecked={(checked) => {
                  onChangeValue({
                    target: { name: "addMemberInFamiyOrg", value: checked },
                  });
                }}
              />
            </div>
            <div className="flex justify-start items-center mr-4">
              <div className="flex items-center mr-2">
                <Image
                  src="/message.png"
                  height={14}
                  width={16}
                  alt="message"
                  className="cursor-pointer"
                />
              </div>
              <ToggleApt
                checked={toggle}
                setChecked={(checked) => {
                  onChangeValue({
                    target: { name: "addMemberInFamiyOrg", value: checked },
                  });
                }}
              />
            </div>
          </div>
          <div
            className={`w-full flex ${
              toggle ? "justify-between" : "justify-end"
            } items-center py-2 px-3 mt-2`}
          >
            {toggle && (
              <div className="w-full flex items-center">
                <div className=" w-[136px] flex flex-col">
                  <span className="text-[16px] text-[#5B5B5B]">Date*</span>
                  <div className="w-full flex justify-between items-center h-[28px] text-[12px] border-[1px] border-gray-300 px-2 rounded-md">
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
                <div className="flex flex-col w-[136px] ml-2">
                  <span className="text-[16px] text-[#5B5B5B]">Time*</span>
                  <input
                    type="text"
                    placeholder="00:00 AM-00:00 AM"
                    className="h-[28px] w-full outline-none text-[12px] border-[1px] border-gray-300 px-2 rounded-md"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center mt-6">
              <button
                onClick={() => props.setRejectList(false)}
                className="h-[24px] w-[72px] rounded-lg bg-[#D9D9D9] text-black text-[14px] mr-1"
              >
                Cancel
              </button>
              <button className="h-[24px] w-[72px] rounded-lg bg-[#FF0000] text-[14px] text-white">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleRejectModal;
