import Checkbox from "antd/lib/checkbox";
import React from "react";
import { BiCaretDown, BiDownArrow, BiPlusCircle } from "react-icons/bi";
import ReminderModal from "./ReminderModal";
import Toggle from "../../Toggle";
import { useState } from "react";

const rem = [1, 2, 3];
const notifydata = [
  {
    id: 1,
    name: "Send notification when appointment book ",
  },
  {
    id: 2,
    name: "Send notification when appointment cancelled  ",
  },
  {
    id: 3,
    name: "Send notification when appointment change  ",
  },
  {
    id: 4,
    name: "Send notification when create invoice ",
  },
  {
    id: 5,
    name: "Send notification when someone purchase a product  ",
  },
  {
    id: 6,
    name: "Send notification when someone message",
  },
  {
    id: 7,
    name: "Send notification when someone message in group",
  },
  {
    id: 8,
    name: "Send notification when someone message in support ",
  },
  {
    id: 9,
    name: "Send notification when someone add  or join",
  },
  {
    id: 10,
    name: "Send notification when someone  make a payment",
  },
  {
    id: 11,
    name: "Send notification when withdraw Payment  ",
  },
];

const marketingData = [
  {
    id: 1,
    name: "Important Updates of  AMBEL",
  },
  {
    id: 2,
    name: "Marketing Campaign",
  },
  {
    id: 3,
    name: "AMBEL Events",
  },
  {
    id: 4,
    name: "Offers and  Gifts",
  },
  {
    id: 5,
    name: "Important suggestions",
  },
  {
    id: 6,
    name: "Community Updates",
  },
];
const Reminder = () => {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between mt-3">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Reminder
          </span>
          <ReminderModal />
        </div>
        <div className="bg-white rounded-md shadow-md">
          {rem.map((re, i) => (
            <div
              key={i}
              className="flex justify-between border-b-[2px] border-gray-400 px-5 mt-3"
            >
              <div className="flex p-5">
                <span className="p-2 bg-[#C4DBCC] text-center h-[53px] w-[53px] rounded-full text-lg font-bold ">
                  {re}
                </span>
                <div className="flex flex-col ml-5 mt-3">
                  <span className="text-[20px] text-[#195947]">
                    Before Appointment
                  </span>
                  <span className="mt-3">
                    Send reminder before 2 days of the appointment
                  </span>
                  <span>System: Email</span>
                  <p>
                    Status : <span className="text-[#00A811]">Active</span>
                  </p>
                </div>
              </div>
              <div className="mt-16">
                <button className="w-[77.13px] h-[28px] text-[12px] bg-[#19525A] text-white rounded-[8px] mr-4">
                  View
                </button>
                <button className="w-[77.13px] h-[28px] text-[12px] bg-[#19525A] text-white rounded-[8px]">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2nd div */}
        <div className="flex flex-col mt-10 rounded-md shadow-md">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Notification
          </span>
          <div className="w-full bg-white rounded-md mt-5">
            <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
              <span className="text-[14px] text-[#5B5B5B] ">
                Allow email notification for all activities of your organization
              </span>

              <Toggle checked={checked} setChecked={setChecked} />
            </div>
          </div>
          <div className="w-full bg-white rounded-md">
            <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
              <span className="text-[14px] text-[#5B5B5B]  ">
                Enable desktop notification
              </span>

              <Toggle checked={checked} setChecked={setChecked} />
            </div>
            <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
              <span className="text-[14px] text-[#5B5B5B] ">Play sound</span>
              <Toggle checked={checked} setChecked={setChecked} />
            </div>
            {notifydata.map((notify) => (
              <div
                key={notify.id}
                className={`flex ${
                  notify.id === 6 ? "justify-between" : "justify-start"
                } items-center px-8 py-4`}
              >
                <div>
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-[14px] ml-3 text-[#5B5B5B] ">
                    {notify.name}
                  </span>
                </div>
                {notify.id === 6 && (
                  <select className="outline-none px-3 py-2 rounded-[8px] w-44 border-2 border-gray-300">
                    <option>All Time</option>
                    <option>When Offline</option>
                    <option>When Idle</option>
                    <option>When Online</option>
                    <option>Both Offline and Idle</option>
                  </select>
                )}
              </div>
            ))}
            <div className="flex flex-col items-start px-8 py-4 border-t-[2px] border-gray-300">
              <span className="text-[16px] text-[#5B5B5B]">
                Marketing Promotion
              </span>

              {marketingData.map((notify) => (
                <div
                  key={notify.id}
                  className="flex justify-start items-center py-4"
                >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-[14px] ml-3 text-[#5B5B5B] ">
                    {notify.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reminder;
