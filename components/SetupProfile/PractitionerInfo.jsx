import React, { useEffect } from "react";
import { practitionerCategories } from "../../constants";
import {
  getAllCountries,
  getPhoneWithoutCode,
} from "../../utils/int_phone_code";
import Dropdown from "../Dropdown";
import PhoneCodeDropdown from "../Dropdown/PhoneCodeDropdown";
import Input from "./Input";

const PractitionerInfo = (props) => {
  const areaOfPracticeList = ["Only my state", "Others state", "International"];

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
            Please provide us your practitoiner info
          </span>
        </div>

        <div className="w-full mt-2">
          <span className="text-[#5B5B5B] text-[14px]">
            Practitioner category <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={practitionerCategories.map((item) => item.category)}
              selected={props.practitionerData?.professionType}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "professionType", value: selected },
                });
              }}
            />
          </div>
          {props.fillError.professionType ? (
            <small>Select Practitioner Category</small>
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
                practitionerCategories.find(
                  (item) =>
                    item.category === props.practitionerData?.professionType
                )?.subCategories
              }
              selected={props.practitionerData?.professionSubType}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "professionSubType", value: selected },
                });
              }}
            />
          </div>
          {props.fillError.professionSubType ? (
            <small>Select Profession Sub Category</small>
          ) : (
            <></>
          )}
        </div>
        <Input
          title="Professional Email"
          star={true}
          required={true}
          name="businessEmail"
          placeholder="Professional Email"
          value={props.practitionerData?.businessEmail}
          onChange={handleChange}
        />
        {props.fillError.businessEmail ? (
          <small>Fill in Profession Email</small>
        ) : (
          <></>
        )}
        <div className="w-full flex flex-col mt-3">
          <span className="text-[#5B5B5B] text-[14px]">
            Professional Phone number
            <b className="text-rose-600"> *</b>
          </span>
          <div className="w-full flex items-center justify-between">
            <PhoneCodeDropdown
              width={"90px"}
              items={getAllCountries()}
              selected={props.practitionerData?.phoneCode ?? "+1"}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "phoneCode", value: selected },
                });
              }}
            />
            <input
              type="text"
              name="businessPhoneNumber"
              value={props.practitionerData?.businessPhoneNumber}
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
            Area of Practice <b className="text-rose-600">*</b>
          </span>
          <div className="w-full mt-2">
            <Dropdown
              width={"390px"}
              items={areaOfPracticeList}
              selected={props.practitionerData?.areaOfPractice}
              onSelected={(selected) => {
                handleChange({
                  target: { name: "areaOfPractice", value: selected },
                });
              }}
            />
          </div>
          {props.fillError.areaOfPractice ? (
            <small>Select Area Of Practice</small>
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PractitionerInfo;
