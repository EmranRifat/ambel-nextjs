import React, { useState } from "react";
import Dropdown from "../../Dropdown";
import ScheduleTypes from "./ScheduleTypes";
import { MdClear } from "react-icons/md";

const CreateSchedule = (props) => {
  const [scheduleTypes, setScheduleType] = useState("Dedicated appointment");

  const onChangeValue = (e) => {
    setScheduleType(e.target.value);
    // console.log(e.target.value)
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col mb-10 p-1">
        <div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
          <span className="text-[#19525A] text-[16px]">
            Create new schedule
          </span>
          <MdClear
            onClick={() => props.setOpenCreate(false)}
            className="text-xl text-[#5B5B5BB2]"
          />
        </div>
        <div className="w-full px-2 mt-3">
          <div className="flex flex-col items-start w-full">
            <span className="text-[16px] text-[#5B5B5B] mb-2">
              Schedule type
            </span>
            <Dropdown
              width={"280px"}
              items={[
                "Dedicated appointment",
                "Open for slot",
                "Day schedule",
                "Range schedule",
                "Class schedule",
                "Break"
              ]}
              selected={"Select schedule type"}
              onSelected={(selected) => {
                onChangeValue({
                  target: { name: "scheduleType", value: selected },
                });
              }}
            />
          </div>
          <ScheduleTypes
            scheduleTypes={scheduleTypes}
            setOpenCreate={props.setOpenCreate}
            setConflict={props.setConflict}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateSchedule;
