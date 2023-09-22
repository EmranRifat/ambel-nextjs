import Image from "next/image";
import React from "react";
import Dropdown from "../../Dropdown";

const PractitionerInfoRightSide = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="w-[800px] flex flex-col border-2 border-gray-300 rounded-md shadow-md">
          <div className="w-full flex flex-col border-b-2 border-gray-300">
            <div className="w-full flex justify-between  p-2  px-5">
              <span className="text-[#5B5B5B] text-[20px] font-[500]">
                Practitioner Type
              </span>
              <button className="text-[#0372BA] text-[16px]">Add New</button>
            </div>
            <p className="text-[#5B5B5B] text-[14px] p-3">
              This practitioner type is allowed to practice in ambel for the
              selected specialized fields. Please select the type and
              specialized field carefully because it helps you to bring your
              services to people searching. If you change these settings you
              need to submit all of the licenses, and certificates for the newly
              selected type. Until accepted you aren’t eligible to practice
              here.
              <span className="text-[#00A455]">Learn More</span>
            </p>
          </div>
          <div className="flex justify-between items-center px-8 py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Type of practitioner
            </span>
            <Dropdown
              width={"350px"}
              items={["Doctor", "Engineer"]}
              selected={"Doctor"}
              onSelected={(selected) => {
                // onChangeValue({
                //   target: { name: "lang", value: selected },
                // });
              }}
            />
          </div>

          <div className="flex justify-between items-center px-8 py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Area of practice</span>
            <Dropdown
              width={"350px"}
              items={["Dhaka", "Sylhet"]}
              selected={"Only state"}
              onSelected={(selected) => {
                // onChangeValue({
                //   target: { name: "lang", value: selected },
                // });
              }}
            />
          </div>
        </div>
        <div className="w-[800px] flex flex-col border-2 border-gray-300 rounded-md shadow-md mt-10">
          <div className="w-full flex flex-col border-b-2 border-gray-300">
            <div className="w-full flex justify-between  p-2  px-5">
              <span className="text-[#5B5B5B] text-[20px] font-[500]">
                Field of practice
              </span>
              <button className="text-[#0372BA] text-[16px]">Add New</button>
            </div>
          </div>
          <div className="flex justify-between items-center px-8 py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Specialized field
            </span>
            <Dropdown
              width={"350px"}
              items={["Physiotherapy", "Cardiology"]}
              selected={"Physiotherapy"}
              onSelected={(selected) => {
                // onChangeValue({
                //   target: { name: "lang", value: selected },
                // });
              }}
            />
          </div>

          <div className="flex justify-between items-center px-8 py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Experienced </span>
            <Dropdown
              width={"350px"}
              items={["10 years", "5years", "15 years"]}
              selected={"10 year"}
              onSelected={(selected) => {
                // onChangeValue({
                //   target: { name: "lang", value: selected },
                // });
              }}
            />
          </div>
          <div className="flex justify-between items-center px-8 py-3 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Designation </span>
            <input
              type="text"
              // name={props.name}
              // onChange={onChangeValue}
              // value={}
              required
              placeholder="School/College/University Name"
              className="text-[14px] w-[350px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>
        {/* end */}
      </div>
    </React.Fragment>
  );
};

export default PractitionerInfoRightSide;
