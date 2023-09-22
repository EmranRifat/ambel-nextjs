import React, { useState } from "react";

const GlobalPractice = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <div className="w-full">
        <span className="text-[#5B5B5B] text-[32px] font-[700]">
          Global Practice
        </span>
        <div className="bg-white flex flex-col mt-5 shadow-md">
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Do you allow global practice
            </span>
            <div
              className={`w-[80px] h-8 flex items-center justify-between p-2 ${
                toggle ? "flex-row-reverse" : "none"
              } bg-[#A0D9B4] rounded-full cursor-pointer`}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <span className="m-2">{toggle ? "Yes" : "No"}</span>
              {/* Switch */}
              <div
                className={`bg-[#195947] h-6 w-6 rounded-full shadow-md transform duration-300 ease-in-out" +
                      ${toggle ? null : "translate-x-1"}
                    `}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Do you want to colaborate with other country practitioners
            </span>
            <div
              className={`w-[80px] h-8 flex items-center justify-between p-2 ${
                toggle ? "flex-row-reverse" : "none"
              } bg-[#A0D9B4] rounded-full cursor-pointer`}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <span className="m-2">{toggle ? "Yes" : "No"}</span>
              {/* Switch */}
              <div
                className={`bg-[#195947] h-6 w-6 rounded-full shadow-md transform duration-300 ease-in-out" +
                      ${toggle ? null : "translate-x-1"}
                    `}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Select specific country to practice
            </span>
            <select className="outline-none w-[240px] h-[40px] px-3 py-2 rounded-[8px] border-2 border-gray-300">
              <option>Canada</option>
              <option>Bangladesh</option>
            </select>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Practitioner that you allow for global practies
            </span>
            <select className="outline-none px-3 py-2 rounded-[8px] w-[240px] h-[40px] border-2 border-gray-300">
              <option>Tazul</option>
              <option>Dewar</option>
            </select>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Services that you allow for global practies
            </span>
            <select className="outline-none px-3 py-2 rounded-[8px] w-[240px] h-[40px] border-2 border-gray-300">
              <option className="mt-5">Physiotherapy</option>
              <option>General consultation</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalPractice;
