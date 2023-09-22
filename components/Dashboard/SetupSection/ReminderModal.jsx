import React from "react";
import { useState } from "react";

const ReminderModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <button
        className="h-[49px] w-[172px] text-[20px] bg-[#19525A] text-white rounded-[10px]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add reminder
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-full flex justify-end items-start px-3">
              <span
                onClick={() => setShowModal(false)}
                className="text-2xl text-[#5B5B5B] cursor-pointer"
              >
                ✖
              </span>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ReminderModal;
