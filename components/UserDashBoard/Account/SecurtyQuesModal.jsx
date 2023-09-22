import React from "react";
import Dropdown from "../../Dropdown";

const SecurtyQuesModal = (props) => {
  return (
    <React.Fragment>
      <div className="w-[440px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
        <div className="w-full flex flex-col items-center bg-white rounded-md">
          {/* all fields... */}
          <div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
            <span>Security Question</span>
          </div>
          <div className="text-[14px] p-3 text-[#5B5B5B]">
            <p>
              Set Up your security question and rember this or note it down
              safely. It will necessary if any risky activies occure, locked or
              suspend your account.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col">
              <span className="text-[16px] text-[#5B5B5B] mb-3">
                Question 1
              </span>
              <Dropdown
                width={"410px"}
                items={["", "Question-1", "Question-2", "Question-3"]}
                selected={"Question-1"}
                onSelected={(selected) => {
                  // onChangeValue({
                  //   target: { name: "location", value: selected },
                  // });
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-3">
            <div className="flex flex-col mb-3">
              <span className="text-[16px] text-[#5B5B5B]">Answer</span>
              <input
                type="text"
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
              />
            </div>
            <div className="w-full flex justify-center mb-3">
              <div className="flex flex-col">
                <span className="text-[16px] text-[#5B5B5B] mb-3">
                  Question 1
                </span>
                <Dropdown
                  width={"410px"}
                  items={["", "Question-1", "Question-2", "Question-3"]}
                  selected={"Question-1"}
                  onSelected={(selected) => {
                    // onChangeValue({
                    //   target: { name: "location", value: selected },
                    // });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] text-[#5B5B5B]">Answer</span>
              <input
                type="text"
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
              />
            </div>
            <div className="w-full flex justify-start items-center mt-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-[16px] h-[16px] text-blue-600 bg-gray-100 rounded mr-2 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-[12px] text-[#5B5B5B]">
                I understand my account will be locked if I am unable to answer
                this question
              </span>
            </div>

            <div className="w-full flex justify-end items-end px-3 pt-10">
              <button
                onClick={() => props.setOpenSecurityModal(false)}
                className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
              >
                Cancel
              </button>
              <button className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecurtyQuesModal;
