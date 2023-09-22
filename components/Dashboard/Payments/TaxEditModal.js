/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PulseLoader } from "react-spinners";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";
import { getTax, taxCreate, onCancelAction } from "../../../store/actions/tax";
import { connect } from "react-redux";
import { useEffect } from "react";
import Toggle from "../../Toggle";

const TaxModal = (props) => {
  const { setShowModal, show } = props;
  const { branches } = props;
  let branchOptions = branches?.map((branch) => ({
    id: branch._id,
    name: branch.name,
  }))??[];
  const [taxData, setTaxData] = React.useState({
    name: "",
    rate: "",
    branches: props.tax?.branches,
    note: "",
    activeStatus: false,
  });
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setTaxData({
      ...taxData,
      [name]: value,
    });
  };
  useEffect(() => {
    setTaxData(props.tax);
  }, []);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-[440px] lg:min-w-[440px] h-[550px] flex flex-col items-center bg-white py-2 rounded-md">
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
            <span>Edit Tax</span>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-3">
            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">Tax name</span>
              <input
                type="text"
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
                value={taxData.name}
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
                value={taxData.rate}
                onChange={(event) => {
                  setTaxData({ ...taxData, rate: event.target.value });
                }}
              />
            </div>

            <div className="flex flex-col mt-2">
              <span className="text-[16px] text-[#5B5B5B]">Branches</span>
              <div className="w-full flex justify-center">
                <MultiSelectDropdown
                  items={[{id:"-1",name:"Select All"},...branchOptions]}
                  selectedList={taxData.branches}
                  itemName="Branch"
                  onSelectedItem={(selected) => {
                    if (selected === "-1") {
                      if (taxData.branches.length === 0) {
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
                value={taxData.note}
                onChange={(event) => {
                  setTaxData({ ...taxData, note: event.target.value });
                }}
              />
            </div>
            <div className="w-full flex items-center mt-2 gap-4 px-2">
              <span className="text-[16px] text-[#5B5B5B]">
                Active Status:{" "}
              </span>
              <Toggle
                checked={taxData.activeStatus}
                setChecked={(checked) => {
                  setTaxData({ ...taxData, activeStatus: checked });
                }}
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
              <button
                className="h-[32px] w-[112px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
                onClick={() => {
                   props.updateTax(taxData).then(() => {
                      props.getTax();
                      setShowModal(false);
                   });
                  
                }}
              >
                {props.loading ? (
                  <PulseLoader color="#ffffff" size={12} />
                ) : (
                  <span>Update</span>
                )}
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
    loading: state?.department?.loading,
  };
};
export default connect(mapStateToProps, {
  taxCreate,
  getTax,
  onCancelAction,
})(TaxModal);
