import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import Dropdown from "../../Dropdown";
import DropdownId from "../../Dropdown/DropDownId";
import Toggle from "../../Toggle";
import {
  getPackages,
  createPackage,
} from "../../../store/actions/packageMembership";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { Tooltip } from "../../Tooltip/Tooltip";
import { RiErrorWarningLine } from "react-icons/ri";

const PackageMembershiModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [packageId, setPackageId] = useState(null);
  const [packageMemebershipData, setPackageMembershipData] = useState({
    name: "",
    description: "",
    price: "",
    packageExpiry: false,
    expireAfter: "",
    tax: [],
    paymentMethod: "Pre-paid",
    capacity: "Unlimited",
    wayOfService: "Online",
    allowOnlineBooking: false,
    priceIncludeTax: false,
    callForBuy: false,
    displayPriceBooking: false,
    status: "Active",
    eligibleServices: [],
  });
  const [service, setService] = useState({
    id: "",
    price: "",
    compensation: "",
    quantity: "",
  });
  console.log(props.package)
  useEffect(() => {
    if (props.edit && props?.package) {
      setPackageValue(props.package.name.length)
      setDescriptionValue(props.package.description.length);
      setPackageId(props.package._id);
      setPackageMembershipData({
        name: props.package.name,
        description: props.package.description,
        price: props.package.price,
        packageExpiry: props.package.packageExpiry,
        expireAfter: props.package.expireAfter,
        tax: props.package.tax ?? [],
        paymentMethod: props.package.paymentMethod,
        capacity: props.package.capacity,
        wayOfService: props.package.wayOfService,
        allowOnlineBooking: props.package.allowOnlineBooking,
        priceIncludeTax: props.package.priceIncludeTax,
        callForBuy: props.package.callForBuy,
        displayPriceBooking: props.package.displayPriceBooking,
        status: props.package.status,
        eligibleServices: props.package.eligibleServices ?? [],
      });
    }
  }, []);

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    if (name === "name") setPackageValue(value.length);
    else if (name === "description") setDescriptionValue(value.length);

    setPackageMembershipData({
      ...packageMemebershipData,
      [name]: value,
    });
  };
  const taxGst =
    props?.tax?.map((tax) => ({
      id: tax._id,
      name: tax.name,
    })) ?? [];

  return (
    <>

      <div className="justify-center items-center flex absolute overflow-y-scroll h-[100vh] inset-0 z-50 bg-[#63636347] outline-none focus:outline-none">
        <div className="max-w-[580px] lg:min-w-[665px] absolute left-[30%] top-10 flex flex-col items-center bg-white rounded-md border-b-2">
          <div className="w-full flex justify-end items-start px-2 py-1">
            <span
              onClick={() => {
                props.setEdit(false);
                props.setShowModal(false);

              }}
              className="text-2xl text-[#5B5B5B] cursor-pointer"
            >
              < RxCross2 className="text-3xl" />
            </span>
          </div>
          <div className="flex w-full justify-center border-b-2 border-gray-300 pb-5">
            <span className="text-[#19525A] text-[32px] font-[700] mt-3">
              {props.edit ? "Edit Package" : "Add A New Package"}
            </span>
          </div>
          <div className="flex w-full justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Name<b className="text-rose-600">*</b>
            </span>
            <div>
              <div
                className={`flex w-[240px] border-[0.5px] border-[#1A535B] rounded-[8px] ml-auto ${parseFloat(packageValue) > 60 &&
                  "border-[1px] border-rose-600"
                  }`}
              >
                <input
                  type="text"
                  required
                  maxLength={60}
                  name="name"
                  value={packageMemebershipData.name}
                  onChange={onChangeValue}
                  placeholder="Write the package Name"
                  className="outline-none rounded-[8px] h-[36px] py-2 px-1 w-[200px]"
                />
                <p className="w-[35px] mt-auto text-xs text-gray-300">
                  {packageValue === "" ? (
                    <span>00</span>
                  ) : (
                    <span>{packageValue}</span>
                  )}
                  /60
                </p>
              </div>
              <div>
                {parseFloat(packageValue) > 60 && (
                  <p className="text-rose-600 text-xs px-1">
                    Not more than 60 character
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between border-b-[2px] border-gray-300 px-[23px] py-3">
            <span className="text-[16px] text-[#5B5B5B]">
              Description
            </span>
            <div>
              <div
                className={` w-[240px] h-[100px] border-[0.5px] border-[#1A535B] rounded-[8px] justify-between ${parseFloat(descriptionValue) > 120 &&
                  "border-[1px] border-rose-600"
                  }`}
              >
                <textarea
                  id=""
                  cols={26}
                  rows={3}
                  required
                  maxLength={120}
                  name="description"
                  value={packageMemebershipData.description}
                  onChange={onChangeValue}
                  className="outline-none rounded-[8px] pt-1  px-1"
                />
                <p className="w-[50px] ml-auto text-xs text-gray-300 ">
                  {descriptionValue === "" ? (
                    <span>00</span>
                  ) : (
                    <span>{descriptionValue}</span>
                  )}
                  /120
                </p>
              </div>
              <div>
                {parseFloat(descriptionValue) > 120 && (
                  <p className="text-rose-600 text-xs px-1">
                    Not more than 120 character
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Price<span className="text-rose-600">*</span>
            </p>
            <div className="flex items-center text-center border-[0.5px] border-[#1A535B] rounded-[8px] overflow-hidden">
              <span className="h-[36px] w-[40px] bg-[#00A455] text-center text-[24px] text-white rounded-l-[5px] ">
                $
              </span>
              <input
                type="number"
                min="0"
                required
                name="price"
                value={packageMemebershipData.price}
                onChange={onChangeValue}
                className="outline-none rounded-[8px] py-2 px-1 h-[36px] w-[200px]"
              />
              {/* <div className="w-full flex justify-center">
                    <Dropdown
                      items={["Per Package", "Per Month", "Per Year"]}
                      selected={packageMemebershipData.packages}
                      width={"129px"}
                      onSelected={(selected) => {
                        onChangeValue({
                          target: {
                            name: "packages",
                            value: selected,
                          },
                        });
                      }}
                    />
                  </div> */}
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B] flex">
              Package expiry
              <Tooltip
                position="top"
                content="Specifies how long customers may use the 
                    services included in the package.(e.g., 356 days 
                    is the expired time, meaning customers can use 
                    the services within 365 days, after that they are 
                    unable to do so if they don't use them entirely.)"
              >
                <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
              </Tooltip>
            </span>
            <Toggle
              checked={packageMemebershipData.packageExpiry}
              setChecked={(checked) => {
                onChangeValue({
                  target: {
                    name: "packageExpiry",
                    value: checked,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Expire after
            </p>
            <div className="flex h-[36px] w-[240px] items-center text-center border-[0.5px] border-[#1A535B] rounded-[8px] overflow-hidden">
              <input
                type="number"
                min="0"
                required
                placeholder=" 00"
                name="expireAfter"
                value={packageMemebershipData.expireAfter}
                onChange={onChangeValue}
                className="outline-none h-[35px] rounded-l-[8px] ml-2 py-2 px-1 w-[121px]"
              />
              <div className="h-[35px] w-[119px] bg-[#D98829] text-center text-[16px] text-white rounded-r-[5px] flex items-center justify-center">
                Days
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Tax

            </p>
            <div className="flex ">
              {taxGst.map((item, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name="taxGst"
                      value={item.id}
                      onClick={(e) => {
                        // the value of the checkbox is the id of the tax

                        let taxArray = packageMemebershipData.tax;
                        // @ts-ignore
                        if (e.target.checked) {
                          taxArray.push(item.id);
                          onChangeValue({
                            target: {
                              name: "tax",
                              value: taxArray,
                            },
                          });
                        } else {
                          taxArray = taxArray.filter(
                            (tax) => tax !== item.id
                          );
                          onChangeValue({
                            target: {
                              name: "tax",
                              value: taxArray,
                            },
                          });
                        }
                      }}
                      className="w-4 h-4 ml-3 rounded-lg text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <p className="text-[16px] text-[#5B5B5B] flex">
              Capacity
              <span className="text-rose-600 flex">*
                <Tooltip
                  position="top"
                  content="How many packages are available for customers to 
                    purchase? (e.g., if the quantity is 10, that means only 
                    10 customers are able to purchase this package.)"
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </span>
            </p>
            <Dropdown
              width={"240px"}
              height={"36px"}
              items={["Unlimited", 5, 10, 15, 20, 25, 30]}
              selected={packageMemebershipData.capacity}
              onSelected={(selected) => {
                onChangeValue({
                  target: {
                    name: "capacity",
                    value: selected,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-2 border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Payment<span className="text-rose-600">*</span>
            </p>
            <Dropdown
              width={"240px"}
              height={"36px"}
              items={["Pre-paid", "Post-paid", "Practitioner Choice"]}
              selected={packageMemebershipData.paymentMethod}
              onSelected={(selected) => {
                onChangeValue({
                  target: {
                    name: "paymentMethod",
                    value: selected,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-2 border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Way of Service
            </p>
            <Dropdown
              width={"240px"}
              height={"36px"}
              items={["Online", "Offline"]}
              selected={packageMemebershipData.wayOfService}
              onSelected={(selected) => {
                onChangeValue({
                  target: {
                    name: "wayOfService",
                    value: selected,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Allow booking online
            </span>
            <Toggle
              checked={packageMemebershipData.allowOnlineBooking}
              setChecked={(checked) => {
                onChangeValue({
                  target: {
                    name: "allowOnlineBooking",
                    value: checked,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B] flex">Call for Buy
              <Tooltip
                position="top"
                content="When customers want to buy this, they will have the 
                  option of calling. Staff will assign this to customers 
                  after the initial contact."
              >
                <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
              </Tooltip>
            </span>
            <Toggle
              checked={packageMemebershipData.callForBuy}
              setChecked={(checked) => {
                onChangeValue({
                  target: {
                    name: "callForBuy",
                    value: checked,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Display Price In Booking Page <span className="text-xs text-gray-300"> e.g <span className="line-through ">$200</span> $100</span>
            </span>
            <Toggle
              checked={packageMemebershipData.displayPriceBooking}
              setChecked={(checked) => {
                onChangeValue({
                  target: {
                    name: "displayPriceBooking",
                    value: checked,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-2 border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Branch <span className="text-rose-600">*</span>
            </p>
            <Dropdown
              width={"240px"}
              height={"36px"}
              items={["Akhaliya", "Noyashork", "Dhaka"]}
              selected={'Select a Branch'}
              onSelected={(selected) => {
                onChangeValue({
                  target: {
                    name: "Select a Branch",
                    value: selected,
                  },
                });
              }}
            />
          </div>
          <div className="border-b-[2px] w-full border-gray-300">
            <div className="w-full flex justify-between items-center px-[23px] py-3 ">
              <div className="flex flex-col">
                <span className="text-[16px] text-[#5B5B5B] my-1">
                  Eligible services
                </span>
                {packageMemebershipData.eligibleServices.map(
                  (item, index) => {
                    return <p className="mx-4 " key={index}>{item.id}</p>;
                  }
                )}
                <DropdownId
                  width={"468px"}
                  height={"36px"}

                  items={[
                    { id: 1, name: "General consultant By Tazul Islam" },
                    { id: 2, name: "General consultant By Tazul Islam" },
                    { id: 3, name: "General consultant By Tazul Islam" },
                  ]}
                  selected={service.id}
                  onSelected={(selected) => {
                    setService({ ...service, id: selected });
                  }}
                />
              </div>

              {/* <div className="flex flex-col items-center mb-1 ml-2">
                    <span className="text-[#5B5B5B] text-[16px]">
                      Service Price
                    </span>
                    {packageMemebershipData.eligibleServices.map(
                      (item, index) => {
                        return <p className="mx-5" key={index}>{item.price}</p>;
                      }
                    )}
                    <div className="flex items-center text-center mt-2 border-[0.5px] border-[#1A535B] rounded-[8px]">
                      <span className="h-[40px] w-[30px] bg-[#00A455] text-center text-[24px] text-white rounded-l-md">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder=" 0 "
                        className="outline-none rounded-[8px]py-2 px-4 w-[109px] border-[#E5E5E5]"
                        onChange={(e) => {
                          setService({ ...service, price: e.target.value });
                        }}
                      />
                    </div>
                  </div> */}

              {/* <div className="flex flex-col items-center mb-1 ml-2">
                    <span className="text-[#5B5B5B] text-[16px]">
                      Staff compensation
                    </span>
                    {packageMemebershipData.eligibleServices.map(
                      (item, index) => {
                        return <p key={index}>{item.compensation}</p>;
                      }
                    )}
                    <div className="flex items-center text-center mt-2 border-[0.5px] border-[#1A535B] rounded-[8px]">
                      <span className="h-[40px] w-[30px] bg-[#00A455] text-center text-[24px] text-white rounded-l-md">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder=" 0 "
                        className="outline-none rounded-[8px] py-2 px-4 w-[109px] border-[#E5E5E5]"
                        onChange={(e) => {
                          setService({
                            ...service,
                            compensation: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div> */}
              <div className="flex flex-col items-center my-1 ml-2">
                <span className="text-[#5B5B5B] text-[16px] flex">Quantity
                  <Tooltip
                    position="top"
                    content="How much money you want to give your practitioner 
                      if a customer purchases this package successfully. 
                      If you don’t set this here, you need to set this to 
                      practitioner commission. Otherwise, the amount 
                      won't be included in the practitioner's payment."
                  >
                    <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                  </Tooltip></span>
                <div className="flex w-full">
                  <p className="w-3/6 text-right">{packageMemebershipData.eligibleServices.map(
                    (item, index) => {
                      return <p key={index}>{item.quantity}</p>;
                    }
                  )}</p>
                  <p className="w-3/6 text-right my-auto ">{packageMemebershipData.eligibleServices.map(
                    (item, index) => {
                      return (
                        <RxCrossCircled
                          className="ml-auto text-lg my-1"
                          key={index}
                          onClick={() => {
                            let newServices =
                              packageMemebershipData.eligibleServices;
                            newServices.splice(index, 1);
                            onChangeValue({
                              target: {
                                name: "eligibleServices",
                                value: newServices,
                              },
                            });
                          }}
                        />
                      );
                    }
                  )}</p>
                </div>
                <div className="flex items-center text-center mt-2">
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder=" 0 "
                    className="outline-none h-[36px] rounded-[8px] border-[0.5px] border-[#1A535B] py-2 px-[18px] w-[130px]"
                    onChange={(e) => {
                      setService({ ...service, quantity: e.target.value });
                    }}
                  />

                </div>
              </div>
              <div className="flex flex-col items-center mb-1 ml-2">

              </div>
            </div>
            <div>
              <button
                className="flex py-1 rounded-[8px] ml-[23px] mb-3 text-[#5b5b5b] "
                onClick={() => {
                  // TODO: validate the service
                  let newServices = packageMemebershipData.eligibleServices;
                  newServices.push(service);
                  onChangeValue({
                    target: {
                      name: "eligibleServices",
                      value: newServices,
                    },
                  });
                }}
              >
                <AiOutlinePlusCircle className="my-auto text-xl  text-[#5b5b5b] mr-2 bg-[#C4DBCC] rounded-full" />
                Add Services
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-[23px] py-3 border-b-2 border-gray-300">
            <p className="text-[16px] text-[#5B5B5B]">
              Status
            </p>
            <Dropdown
              width={"240px"}
              height={"36px"}
              items={["Active", "Inactive"]}
              selected={packageMemebershipData.status}
              onSelected={(selected) => {
                onChangeValue({
                  target: {
                    name: "status",
                    value: selected,
                  },
                });
              }}
            />
          </div>
          <div className="w-full flex justify-end items-end px-[23px] py-3">
            <button
              onClick={() => {
                props.setEdit(false);
                props.setShowModal(false)
              }
              }
              className="px-7 h-[36px] text-[20px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                if (
                  parseFloat(packageValue) > 60 ||
                  parseFloat(descriptionValue) > 120
                ) {
                  return;
                };
                props.createPackage(packageMemebershipData).then(() => {
                  props.getPackages();
                  setShowModal(false);
                });
              }}
              className="px-8 h-[36px] text-[20px]  bg-[#1A535B] rounded-[8px] text-white"
            >
              {
                <span>Save</span>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state?.packageMembership?.info,
    loading: state?.packageMembership?.loading,
  };
};
export default connect(mapStateToProps, {
  createPackage,
  getPackages,
})(PackageMembershiModal);
