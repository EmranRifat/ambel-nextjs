/* eslint-disable @next/next/no-img-element */
import React from "react";
import { connect } from "react-redux";
import Dropdown from "../../Dropdown";
import { useState } from "react";
import { updateFines, getFines } from "../../../store/actions/fines";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";

const FeeModal = (props) => {
  const { showModal, setShowModal, fee } = props;
  console.log(fee);
  const [fines, setFines] = useState({
    name: fee.name,
    adjustmentType: fee.adjustmentType,
    fineType: fee.fineType,
    amount: fee.amount,
    note: fee.note,
    branches: fee.branches,
    practitioners: fee.practitioners,
  });
  const { branches, practitioners } = props;
  let branchOptions = [];
  let practitionerOptions = [];
  branchOptions =
    branches?.map((branch) => ({
      id: branch._id,
      name: branch.name,
    })) ?? [];
  practitionerOptions =
    practitioners?.map((practitioner) => ({
      id: practitioner._id,
      name: practitioner.name,
    })) ?? [];
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setFines({
      ...fines,
      [name]: value,
    });
  };
  console.log(practitioners)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-[440px] lg:min-w-[440px] h-fit flex flex-col items-center bg-white py-2 rounded-md">
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
            <span>Edit Fine</span>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-3">
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">
                Name of the Fine
              </span>
              <input
                type="text"
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                placeholder="ex: Late Cancellation"
                value={fines.name}
                onChange={(e) => {
                  setFines({
                    ...fines,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">
                Adjustment type
              </span>
              <div className="w-full flex justify-center">
                <Dropdown
                  items={["Compensation", "Absent", "Late Cancellation"]}
                  selected={fines.adjustmentType}
                  width={"410px"}
                  onSelected={(selected) => {
                    setFines({
                      ...fines,
                      adjustmentType: selected,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">Fine type</span>
              <div className="w-full flex justify-center">
                <Dropdown
                  items={["Percentage Given", "Amount Given"]}
                  selected={fines.fineType}
                  width={"410px"}
                  onSelected={(selected) => {
                    setFines({
                      ...fines,
                      fineType: selected,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">
                Amount of the Fine
              </span>
              <input
                type="text"
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                placeholder="ex: 10%"
                value={fines.amount}
                onChange={(e) => {
                  setFines({
                    ...fines,
                    amount: e.target.value,
                  });
                }}
              />
            </div>

            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">Branch Name</span>
              <div className="w-full flex justify-center">
                <MultiSelectDropdown
                  items={[{ id: "-1", name: "Select All" }, ...branchOptions]}
                  selectedList={fines.branches}
                  itemName="Branch"
                  onSelectedItem={(selected) => {
                    if (selected === "-1") {
                      if (fines.branches.length !== branches.length) {
                        let newValue = branchOptions.map((branch) => {
                          return branch.id;
                        });
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      } else {
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: [],
                          },
                        });
                      }
                    } else {
                      if (!fines.branches.includes(selected)) {
                        let newValue = fines.branches;
                        newValue.push(selected);
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      } else {
                        let newValue = fines.branches;
                        newValue.splice(newValue.indexOf(selected), 1);
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      }
                    }
                  }}
                  width={"410px"}
                />
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">
                Dedicated Practitioner
              </span>
              <div className="w-full flex justify-center">
                <MultiSelectDropdown
                  items={[{ id: "-1", name: "Select All" }, ...practitionerOptions]}
                  selectedList={fines.practitioners}
                  itemName="Practitioner"
                  onSelectedItem={(selected) => {
                    if (selected === "-1") {
                      if (fines.practitioners.length !== practitioners.length) {
                        let newValue = practitionerOptions.map((branch) => {
                          return branch.id;
                        });
                        onChangeValue({
                          target: {
                            name: "",
                            value: newValue,
                          },
                        });
                      } else {
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: [],
                          },
                        });
                      }
                    } else {
                      if (!fines.practitioners.includes(selected)) {
                        let newValue = fines.practitioners;
                        newValue.push(selected);
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: newValue,
                          },
                        });
                      } else {
                        let newValue = fines.practitioners;
                        newValue.splice(newValue.indexOf(selected), 1);
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: newValue,
                          },
                        });
                      }
                    }
                  }}
                  width={"410px"}
                />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">Note</span>
              <textarea
                className="w-[410px] h-[62px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
                placeholder="ex: Absent will be charged 10% of the total amount."
                value={fines.note}
                onChange={(e) => {
                  setFines({
                    ...fines,
                    note: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full flex justify-end items-end px-3 py-5">
              <button
                className="h-[32px] w-[112px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="h-[32px] w-[112px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
                onClick={() => {
                  props.updateFines(fee._id, fines).then(() => {
                    props.getFines();
                    setShowModal(false);
                  });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state?.fines?.loading,
  };
};
export default connect(mapStateToProps, {
  updateFines,
  getFines,
})(FeeModal);
