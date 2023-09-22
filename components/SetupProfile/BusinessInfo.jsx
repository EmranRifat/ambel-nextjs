import React, { useEffect } from "react";
import { getAllCountries } from "../../utils/int_phone_code";
import Dropdown from "../Dropdown";
import Input from "./Input";
import {
  businessTypes,
  organizationCategories,
  yourRole,
} from "../../constants";
import PhoneCodeDropdown from "../Dropdown/PhoneCodeDropdown";

const BusinessInfo = (props) => {
  useEffect(() => {
    var code = props.userData?.phoneCode;
    props.onChangeUserData({ name: "phoneCode", value: code });
  }, [props.userData?.phoneCode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.onChangeUserData({ name, value });
  };

  return (
    <React.Fragment>
      <div className="w-full flex flex-col ">
        <div className="w-full flex justify-center items-center my-2">
          <span className="text-[#19525A] text-[20px] font-[500]">
            Please provide us your organization info
          </span>
        </div>

        <Input
          title="Organization Name"
          star={true}
          required={true}
          name="name"
          placeholder="Organization Name"
          value={props.businessData?.name}
          onChange={handleChange}
        />
        {props.fillError.orgName ? (
          <small>Fill Organization Name</small>
        ) : (
          <></>
        )}
        <div className="w-full mt-2">
          <span className="text-[#5B5B5B] text-[14px]">
            Organization category <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={organizationCategories.map((item) => item.category)}
              selected={props.businessData?.businessCategory}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "businessCategory", value: selected },
                });
              }}
            />
          </div>
          {props.fillError.businessnessCategory ? (
            <small>Select Business Category</small>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full mt-2">
          <span className="text-[#5B5B5B] text-[14px]">
            Sub-category <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={
                organizationCategories.find(
                  (item) =>
                    item.category === props.businessData?.businessCategory
                )?.subCategories ?? []
              }
              selected={props.businessData?.businessSubCategory}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "businessSubCategory", value: selected },
                });
              }}
            />
          </div>
          {props.fillError.businessnessSubCategory ? (
            <small>Select Sub Category</small>
          ) : (
            <></>
          )}
        </div>
        <Input
          title="Business Email"
          star={true}
          required={true}
          name="email"
          placeholder="Business Email"
          value={props.businessData?.email}
          onChange={handleChange}
        />
        {props.fillError.orgBusinessEmail ? (
          <small>Fill in Business Email</small>
        ) : (
          <></>
        )}
        <div className="w-full flex flex-col mt-3">
          <span className="text-[#5B5B5B] text-[14px]">
            Phone number
            <b className="text-rose-600"> *</b>
          </span>
          <div className="w-full flex items-center justify-between">
            <PhoneCodeDropdown
              width={"90px"}
              items={getAllCountries()}
              selected={props.businessData?.phoneCode ?? "+1"}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "phoneCode", value: selected },
                });
              }}
            />
            <input
              type="text"
              name="businessPhoneNumber"
              value={props.businessData?.businessPhoneNumber}
              onChange={handleChange}
              required
              placeholder={props.label}
              className="text-[14px] w-[256px] ml-1 h-[40px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
            />
          </div>
          {props.fillError.businessPhoneNumber ? (
            <small>Fill in Business Phone Number</small>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full mt-2">
          <span className="text-[#5B5B5B] text-[14px]">
            Organization Type <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={businessTypes}
              selected={props.businessData?.businessType}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "businessType", value: selected },
                });
              }}
            />
          </div>
        </div>
        {props.fillError.businessType ? (
          <small>Select business type</small>
        ) : (
          <></>
        )}
        <div className="w-full mt-2">
          <span className="text-[#5B5B5B] text-[14px]">
            Your role <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={yourRole}
              selected={props.businessData?.ownerRole}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "ownerRole", value: selected },
                });
              }}
            />
          </div>
        </div>
        {props.fillError.ownerRole ? <small>Select role</small> : <></>}
      </div>
    </React.Fragment>
  );
};

export default BusinessInfo;
