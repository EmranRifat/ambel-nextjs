import React from "react";
import { MdApps } from "react-icons/md";

const NewIntakeQuestinaries = (props) => {
  return (
    <>
      <div>
        <div className="w-full bg-white flex flex-col rounded-md shadow-md mt-2">
          <div className="p-4">
            <span className="text-[#5B5B5B] text-[28px] font-[500]">
              Intake questionaries
            </span>
            <p className="text-left mt-5 text-[16px] text-[#5B5B5B]">
              To make a new questioner please set up your intake questioneries
              that you want from your customers. There is several class you can
              select from our library.
            </p>
          </div>
          {/* items */}
          <div className="flex flex-col items-center p-10">
            <span className="text-[#5B5B5B]">
              Intake questionarie is currently empty. Upload now.
            </span>
          </div>

          {/* add items */}
          <div className="px-4">
            <button className="flex items-center bg-[#C4DBCC] py-2 px-4 rounded-md shadow-sm">
              <MdApps className="text-3xl text-[#195947]" />
              <span className="text-[20px] ml-1 text-[#01261C]">Add items</span>
            </button>
          </div>
          {/* button */}
          <div className="w-full flex justify-end items-end px-3 py-5">
            <button className="w-[122px] h-[49px] text-[20px] text-[#5B5B5B] border-2 border-gray-500 bg-white rounded-[8px] mr-4">
              Cancel
            </button>
            <button className="w-[194px] h-[49px] text-[20px] bg-[#1A535B] rounded-[8px] text-white"
            onClick={() =>
              // save data to local storage
              props.handleNext("Questionaries") }
            >
            Save and Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewIntakeQuestinaries;
