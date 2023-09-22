/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Dropdown from "../../Dropdown";
const AddBankModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [click, setClick] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center rounded-md text-white bg-[#0F4556] h-[36px] w-[132px]"
      >
        <span className="text-[30px] mr-3">+</span>
        <span className="text-[16px]">Add New</span>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-[440px] lg:min-w-[440px] absolute top-5 flex flex-col items-center bg-white py-2 rounded-md">
              <div className="w-full flex justify-end items-start">
                <span
                  onClick={() => setShowModal(false)}
                  className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
                >
                  ✖
                </span>
              </div>
              {/* all fields... */}
              <div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-3">
                <span>Add a new Bank</span>
              </div>
              <div className="w-full flex flex-col justify-center items-center p-3">
                <div className="w-full flex justify-start items-center text-[#5B5B5B]">
                  <BiChevronDown className="text-2xl" />
                  <span className="text-[16px] font-[700]">
                    Enter Bank Details
                  </span>
                </div>
                {/* <div className="flex flex-col mt-3">
                  <span className="text-[16px] text-[#5B5B5B]">Role Name</span>
                  <input
                    type="text"
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                  />
                </div> */}
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Accoutn type
                  </span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={["Personal", "Organization", "Group"]}
                      selected={"Personal"}
                      width={"410px"}
                      onSelected={(selected) => {
                        // setSelectedTitle(selected);
                        // setSelectedFormat(
                        //   emailFormats.find((item) => item.name === selected)
                        // );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Bank Country
                  </span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={["Bangladesh", "India", "USA"]}
                      selected={"Bangladesh"}
                      width={"410px"}
                      onSelected={(selected) => {
                        // setSelectedTitle(selected);
                        // setSelectedFormat(
                        //   emailFormats.find((item) => item.name === selected)
                        // );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Bank Currency
                  </span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={["BDT", "RP", "USD"]}
                      selected={"BDT"}
                      width={"410px"}
                      onSelected={(selected) => {
                        // setSelectedTitle(selected);
                        // setSelectedFormat(
                        //   emailFormats.find((item) => item.name === selected)
                        // );
                      }}
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="w-full flex flex-col justify-center items-center p-3">
                <div className="w-full flex justify-start items-center text-[#5B5B5B]">
                  <BiChevronDown className="text-2xl" />
                  <span className="text-[16px] font-[700]">
                    Account Details
                  </span>
                </div>
                {/* <div className="flex flex-col mt-3">
                  <span className="text-[16px] text-[#5B5B5B]">Role Name</span>
                  <input
                    type="text"
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                  />
                </div> */}
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">Bank Name</span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={[
                        "Dutch Bangla Bank",
                        "Southest bank",
                        "Sonli Bank",
                      ]}
                      selected={"Dutch Bangla Bank"}
                      width={"410px"}
                      onSelected={(selected) => {
                        // setSelectedTitle(selected);
                        // setSelectedFormat(
                        //   emailFormats.find((item) => item.name === selected)
                        // );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">SWIFT Code</span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Rounting Number
                  </span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Branch Name
                  </span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Account Holder Name
                  </span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Account Number
                  </span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-start items-center mt-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 ml-2 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="text-[12px] text-[#5B5B5B] ml-3">
                    I confirm the bank details above and
                    <span className="text-[#008BDA]"> terms</span> and
                    <span className="text-[#008BDA]"> conditions</span>.
                  </p>
                </div>
              </div>
              <button className="h-[32px] w-[310px] bg-[#19525A] rounded-md text-white">
                Next
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddBankModal;
