/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PulseLoader } from "react-spinners";
import Dropdown from "../../Dropdown";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";
import { getTax, taxCreate, onCancelAction } from "../../../store/actions/tax";
import { connect } from "react-redux";
import tax from "../../../store/reducers/tax";
import { useEffect } from "react";
const TaxModal = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const { branches } = props;
  let branchOptions = [];
  branchOptions =
    branches?.map((branch) => ({
      id: branch._id,
      name: branch.name,
    })) ?? [];

  const [taxData, setTaxData] = React.useState({
    name: "",
    rate: "",
    branches: [],
    note: "",
  });
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setTaxData({
      ...taxData,
      [name]: value,
    });
  };
  return (
    <>
      <button
        className="text-[20px] w-[120px] h-[40px] bg-[#19525A] text-white rounded-[8px]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Tax
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-[440px] lg:min-w-[440px] h-[510px] flex flex-col items-center bg-white py-2 rounded-md">
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
                <span>Add New Tax</span>
              </div>
              <div className="w-full flex flex-col justify-center items-center p-3">
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">Tax name</span>
                  <input
                    type="text"
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    onChange={(event) => {
                      setTaxData({ ...taxData, name: event.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">Tax rate</span>
                  <input
                    type="text"
                    className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                    onChange={(event) => {
                      setTaxData({ ...taxData, rate: event.target.value });
                    }}
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">Branches</span>
                  <div className="w-full flex justify-center">
                    <MultiSelectDropdown
                      items={[
                        { id: "-1", name: "Select All" },
                        ...branchOptions,
                      ]}
                      selectedList={taxData.branches}
                      itemName="Branch"
                      onSelectedItem={(selected) => {
                        if (selected === "-1") {
                          if (taxData.branches.length !== branches.length) {
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
                          if (!taxData.branches.includes(selected)) {
                            let newValue = taxData.branches;
                            newValue.push(selected);
                            onChangeValue({
                              target: {
                                name: "branches",
                                value: newValue,
                              },
                            });
                          } else {
                            let newValue = taxData.branches;
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
                  <span className="text-[16px] text-[#5B5B5B]">Note</span>
                  <textarea
                    className="w-[410px] h-[86px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
                    onChange={(event) => {
                      setTaxData({ ...taxData, note: event.target.value });
                    }}
                  />
                </div>
                <div className="w-full flex justify-end items-end px-3 py-5">
                  <button className="h-[32px] w-[112px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4">
                    Cancel
                  </button>
                  <button
                    className="h-[32px] w-[112px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
                    onClick={() => {
                      props.taxCreate(taxData).then((res) => {
                        props.getTax();
                        setShowModal(false);
                      });
                    }}
                  >
                    {props.loading ? (
                      <PulseLoader color="#ffffff" size={12} />
                    ) : (
                      <span>Create</span>
                    )}
                  </button>
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
const mapStateToProps = (state) => {
  return {
    loading: state?.department?.loading,
  };
};
export default connect(mapStateToProps, {
  taxCreate,
  getTax,
  onCancelAction,
})(TaxModal);
