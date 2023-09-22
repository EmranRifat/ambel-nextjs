import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const NewIntakeContents = (props) => {
  const { data, setData } = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div className="pb-8">
      <div className="w-full flex flex-col bg-white rounded-md shadow-md mt-2">
        <div className="flex justify-between items-center px-10 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Full name</span>
          <input
            type="text"
            required
            placeholder="Circle Studio"
            className="outline-none rounded-[8px] border-2 py-2 px-4 w-[240px]"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center px-10 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Text</span>
          <textarea
            required
            className="outline-none rounded-[8px] border-2 py-1 px-1 w-[240px] h-[65px]"
            name="text"
            value={data.text}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center px-10 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Declaration</span>
          <textarea
            required
            className="outline-none rounded-[8px] border-2 py-1 px-1 w-[240px] h-[71px]"
            name="declaration"
            value={data.declaration}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Disagree option</span>
          <div className="flex justify-between w-[25%] px-4">
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value="agree"
                checked={data.disagreeOption === "agree"}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded mr-4 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                name="disagreeOption"
                onChange={handleChange}
              />
              <span className="text-[16px] text-[#5B5B5B]">Agree</span>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value="disagree"
                checked={data.disagreeOption === "disagree"}
                name="disagreeOption"
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded mr-4 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-[16px] text-[#5B5B5B]">Disagree</span>
            </div>
          </div>
        </div>
        {/*  ------------ remove consent and add concent is removed  ---------------*/}
        {/* <div className="flex justify-end items-center px-10 py-10 border-b-[2px] border-gray-300">
          <button className="bg-[#FF0101] h-[50px] w-[185px] text-[20px] text-white rounded-md">
            Remove content
          </button>
        </div>
        <div className="flex justify-start items-center px-8 py-4 border-b-[2px] border-gray-300">
          <AiOutlinePlusCircle className="text-3xl bg-[#C4DBCC] rounded-full text-[#1A535B]" />
          <button className="text-[#5B4B4B] text-[20px] ml-3 rounded-md">
            Add consent
          </button>
        </div> */}
        <div className="flex justify-between items-center px-8 py-4 border-b-2">
          <span className="text-[16px] text-[#5B5B5B]">Upload Signature</span>
          <div className="flex items-center justify-center bg-grey-lighter ">
            <label className="w-[240px] text-[20px] border-[1px] border-gray-300 px-3 py-2 flex flex-col items-center bg-white rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white">
              <span className="text-[14px] text-base leading-normal">
                Choose Your File
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center px-8 py-6 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">
            Customers Signature
          </span>
          <div className="flex justify-between w-[25%] px-4">
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value="required"
                checked={data.customerSignature === "required"}
                name="customerSignature"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded mr-4 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
              <span className="text-[16px] text-[#5B5B5B]">Required</span>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value="notRequired"
                checked={data.customerSignature === "notRequired"}
                name="customerSignature"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded mr-4 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
              <span className="text-[16px] text-[#5B5B5B]">Not required</span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-end px-10 py-5">
          <button className="w-[122px] h-[49px] text-[20px] text-[#5B5B5B] border-2 border-gray-500 bg-white rounded-[8px] mr-4">
            Cancel
          </button>
          <button
            className="w-[194px] h-[49px] text-[20px] bg-[#1A535B] rounded-[8px] text-white"
            onClick={() => {
              localStorage.setItem(
                "newIntakeConsents",
                JSON.stringify(data)
              );
              props.saveData();
            }}
          >
            Save Intake Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewIntakeContents;
