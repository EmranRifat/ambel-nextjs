import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import ToggleApt from "./ToggleApt";
import Image from "next/image";

const appointmentStates = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "All Schedule",
  },
  {
    id: 3,
    title: "Unarrived",
  },
  {
    id: 4,
    title: "Checked In",
  },
  {
    id: 5,
    title: "Arrived",
  },
  {
    id: 6,
    title: "No Show",
  },
  {
    id: 7,
    title: "Canceled",
  },
  {
    id: 8,
    title: "Reschedule",
  },
  {
    id: 9,
    title: "Deleted",
  },
  {
    id: 10,
    title: "Break",
  },
  {
    id: 11,
    title: "Wait List",
  },
  {
    id: 12,
    title: "Request List",
  },
];

const zooms = [
  {
    id: 1,
    parcentage: "10%",
  },
  {
    id: 2,
    parcentage: "25%",
  },
  {
    id: 3,
    parcentage: "50%",
  },
  {
    id: 4,
    parcentage: "75%",
  },
  {
    id: 5,
    parcentage: "100%",
  },
];

const appearances = [
  {
    id: 1,
    title: "Show weekend",
  },
  {
    id: 2,
    title: "Group By Discipline",
  },
  {
    id: 3,
    title: "Show Staff Photo",
  },
  {
    id: 4,
    title: "Accending order",
  },
];
const ScheduleSettings = (props) => {
  const [toggle, setToggle] = useState(false);
  const [selectZoom, setSelectZoom] = useState(null);
  const onChangeValue = (event) => {
    setToggle(!toggle);
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center bg-white rounded-md pb-8">
        <div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
          <span className="text-[#19525A] text-[16px]">Schedule Settings</span>
          <MdClear
            onClick={() => props.setOpenSettings(false)}
            className="text-xl text-[#5B5B5BB2]"
          />
        </div>

        {/* Appointment States */}
        <div className="w-full flex flex-col items-start justify-start p-2 border-b-[1px] border-gray-300">
          <span className="text-[#5B5B5B] text-[16px] px-2">
            Appointment States
          </span>
          {appointmentStates.map((aptStates) => (
            <div
              key={aptStates.id}
              className="w-full flex justify-between items-center py-2 px-3 text-[#5B5B5B] text-[14px]"
            >
              <span>{aptStates.title}</span>
              <ToggleApt
                checked={toggle}
                setChecked={(checked) => {
                  onChangeValue({
                    target: { name: "addMemberInFamiyOrg", value: checked },
                  });
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-start justify-start p-2 border-b-[1px] border-gray-300">
          <span className="text-[#5B5B5B] text-[16px] px-2">
            Set Schedule Zoom
          </span>
          {zooms.map((zoom) => (
            <div
              key={zoom.id}
              onClick={() => setSelectZoom(zoom.parcentage)}
              className={`w-full ${
                selectZoom === zoom.parcentage
                  ? "bg-[#19525A] text-white"
                  : "text-[#5B5B5B] "
              } flex justify-between items-center py-2 px-3 text-[14px] cursor-pointer rounded-md`}
            >
              <span>{zoom.parcentage}</span>
              {selectZoom === zoom.parcentage && (
                <Image src="/tick.png" height={12} width={15} alt="tick" />
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-start justify-start p-2">
          <span className="text-[#5B5B5B] text-[16px] px-2">
            Appointment States
          </span>
          {appearances.map((appear) => (
            <div
              key={appear.id}
              className="w-full flex justify-between items-center py-2 px-3 text-[#5B5B5B] text-[14px]"
            >
              <span>{appear.title}</span>
              <ToggleApt
                checked={toggle}
                setChecked={(checked) => {
                  onChangeValue({
                    target: { name: "addMemberInFamiyOrg", value: checked },
                  });
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end px-3">
          <button
            onClick={() => props.setOpenSettings(false)}
            className="text-[14px] h-[24px] w-[72px] bg-[#D9D9D9] rounded-lg text-black"
          >
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleSettings;
