import Image from "next/image";
import React, { useEffect, useState } from "react";

const PersonalIfon2 = ({ setVerification }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  return (
    <div>
      {" "}
      <React.Fragment>
        <div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
          <span className="text-[#5B5B5B] text-[32px]">
            Personal Information
          </span>
        </div>
        <div className="w-full flex justify-between px-4 mt-3">
          <span className="text-[#5B5B5B] text-[16px]">
            Identity Information
          </span>
          {/* <div className="flex items-center mr-2">
            <span className="text-[#5B5B5B] text-[14px] mr-3">Auto fill</span>
            <Image
              src="/icons/circletick.png"
              height={20}
              width={21}
              alt="tick"
            />
          </div> */}
        </div>

        <div className="w-full flex justify-between items-center px-4 mt-8">
          <div className=" flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">Address</span>
            <input
              type="text"
              // name={props.name}
              // value={}
              required
              // placeholder={props.label}
              className="text-[14px] w-[547px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
              onChange={(e) => {
                // setAddress(e.currentTarget.value);
                setVerification((prevState) => {
                  return {
                    ...prevState,
                    address: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center px-4 mt-8">
          <div className=" flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">City</span>
            <input
              type="text"
              // name={props.name}
              // onChange={onChangeValue}
              // value={}
              required
              // placeholder={props.label}
              className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
              onChange={(e) => {
                // setCity(val.currentTarget.value);
                setVerification((prevState) => {
                  return {
                    ...prevState,
                    city: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className=" flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">Postal Code</span>
            <input
              type="text"
              // name={props.name}
              // onChange={onChangeValue}
              // value={}
              required
              // placeholder={props.label}
              className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
              onChange={(val) => {
                // setPostalCode(val.currentTarget.value);
                setVerification((prevState) => {
                  return {
                    ...prevState,
                    postalCode: val.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default PersonalIfon2;
