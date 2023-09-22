import React from "react";
import { MdClear } from "react-icons/md";

const requrestData = [
  {
    id: 1,
    time: "10 july 10:30 am",
    name: "Md Tazul Islam",
    Date: "20 January 2022",
    Time: "9:00 AM to 10:30 AM",
    ServiceName: "Name of the service",
  },
  {
    id: 2,
    time: "10 july 10:30 am",
    name: "Md Tazul Islam",
    Date: "20 January 2022",
    Time: "9:00 AM to 10:30 AM",
    ServiceName: "Name of the service",
  },
];
const WaitListDrawer = (props) => {
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center bg-white rounded-md">
        <div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
          <span className="text-[#19525A] text-[16px]">
            Waitlist for Appointment
          </span>
          <MdClear
            onClick={() => props.setWaitList(false)}
            className="text-xl text-[#5B5B5BB2]"
          />
        </div>
        {requrestData.map((req, i) => (
          <div
            key={i}
            className="w-full flex flex-col justify-start items-start p-3 border-b-[2px] border-gray-300"
          >
            <span className="text-[#5B5B5BB2] text-[10px]">{req.time}</span>
            <p className="text-[#0089C9] text-[14px] mt-1">{req.name}</p>
            <span className="text-[#5B5B5B] text-[12px] mt-1">
              Date : {req.Date}
            </span>
            <span className="text-[#5B5B5B] text-[12px] mt-1">
              Time : {req.Time}
            </span>
            <span className="text-[#5B5B5B] text-[12px] mt-1">
              Serviec Name : {req.ServiceName}
            </span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default WaitListDrawer;
