/* eslint-disable @next/next/no-img-element */
import React from "react";
import _ from "lodash";
import { BiCopy } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Dropdown from "../../Dropdown";
import DropDownWithId from "../../Dropdown/DropDownId";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";
import MultiSelectDropDownId from "../../Dropdown/MultiCheckDropDownId";
import { PulseLoader } from "react-spinners";

const StaffComissionModal = ({
  comissionName,
  setComissionName,
  branches,
  applicableOn,
  showModal,
  setShowModal,
  selectedBranch,
  setSelectedBranch,
  selectedServices,
  setSelectedServices,
  status,
  setStatus,
  comissionType,
  setComissionType,
  defaultComissionRate,
  setDefaultComissionRate,
  defaultRefferalComissionRate,
  setDefaultRefferalComissionRate,
  createStaffComission,
  practioners,
  selectedPractitioners,
  setSelectedPractitioners,
  loading,
  setLoading,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-[440px] lg:min-w-[440px] h-[710px] flex flex-col items-center bg-white py-2 rounded-md">
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
                <span className="text-[20px] text-[#19525A]">
                  Add a new Commission
                </span>
              </div>
              <div className="w-full flex flex-col justify-center items-center p-3">
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Name of the commission
                  </span>
                  <input
                    type="text"
                    value={comissionName}
                    onChange={(e) => {
                      setComissionName(e.target.value);
                    }}
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Commission type
                  </span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={[
                        "Practitioner Percenteage",
                        "Percentage Discount",
                      ]}
                      selected={comissionType}
                      width={"410px"}
                      onSelected={(selected) => {
                        setComissionType(selected);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Default commission rate (%)
                  </span>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      onChange={(e) => setDefaultComissionRate(e.target.value)}
                      value={defaultComissionRate}
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Default referral commission rate (%)
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    onChange={(e) =>
                      setDefaultRefferalComissionRate(e.target.value)
                    }
                    value={defaultRefferalComissionRate}
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                  />
                </div>
                <div className="flex flex-col mt-2 w-[100%]">
                  <span className="text-[16px] text-[#5B5B5B]">Branches</span>
                  <div className="w-full flex justify-center w-[100%]">
                    <MultiSelectDropdown
                      items={branches}
                      selectedList={selectedBranch}
                      onSelectedItem={(itemId) => {
                        setSelectedBranch((prev) => {
                          let newState = [...prev];
                          let idx = newState.indexOf(itemId);
                          if (itemId == "all") {
                            if (newState.length == branches.length) {
                              newState = [];
                              return newState;
                            } else {
                              newState = branches.map((e) => e.id);
                              return newState;
                            }
                          } else {
                            if (idx == -1) newState.push(itemId);
                            else newState.splice(idx);
                            return newState;
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2 w-[100%]">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Application on
                  </span>
                  <div className="w-full flex justify-center">
                    <MultiSelectDropdown
                      items={applicableOn}
                      selectedList={selectedServices}
                      onSelectedItem={(itemId) => {
                        setSelectedServices((prev) => {
                          let newState = [...prev];
                          let idx = newState.indexOf(itemId);
                          if (itemId == 0) {
                            if (newState.length == applicableOn.length) {
                              newState = [];
                              return newState;
                            } else {
                              newState = applicableOn.map((e) => e.id);
                              return newState;
                            }
                          } else {
                            if (idx == -1) newState.push(itemId);
                            else newState.splice(idx);
                            return newState;
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2 w-[100%]">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Practitioners
                  </span>
                  <div className="w-full flex justify-center">
                    <MultiSelectDropdown
                      items={practioners}
                      selectedList={selectedPractitioners}
                      onSelectedItem={(itemId) => {
                        setSelectedPractitioners((prev) => {
                          let newState = [...prev];
                          let idx = newState.indexOf(itemId);
                          if (itemId == "all") {
                            if (newState.length == practioners.length) {
                              newState = [];
                              return newState;
                            } else {
                              newState = practioners.map((e) => e.id);
                              return newState;
                            }
                          } else {
                            if (idx == -1) newState.push(itemId);
                            else newState.splice(idx);
                            return newState;
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2 w-full">
                  <span className="text-[16px] text-[#5B5B5B]">Status</span>
                  <Dropdown
                    items={["active", "inactive"]}
                    onSelected={(selected) => {
                      setStatus(selected);
                    }}
                    selected={status}
                  />
                </div>
                <div className="w-full flex justify-end items-end px-3 py-5">
                  <button
                    className="h-[32px] w-[112px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <PulseLoader />
                  ) : (
                    <button
                      className="h-[32px] w-[112px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
                      onClick={() => {
                        createStaffComission();
                      }}
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default StaffComissionModal;
