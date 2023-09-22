import React from "react";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";

const Referral = () => {
  return (
    <>
      <div className="pb-8 flex flex-col">
        <div className="flex justify-between">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Referral
          </span>
        </div>
        <div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-lg mt-5">
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Do you allow customer referral program
            </span>
            <Toggle
              checked={"yes"}
              setChecked={(checked) => {
                // onChangeValue({
                //   target: { name: "shop", value: checked },
                // });
              }}
            />
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Referral commission apply
            </span>
            <div className=" flex justify-center ml-5">
              <Dropdown
                items={["both", ""]}
                selected={"both"}
                width={"140px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Referral Type</span>
            <div className=" flex justify-center ml-5">
              <Dropdown
                items={["Percentage", ""]}
                selected={"Percentage"}
                width={"140px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Referral amount</span>
            <div className=" flex justify-center ml-5">
              <div className="flex flex-col mr-3">
                <span className="text-[#5B5B5B] text-[14px]">Services</span>
                <input
                  type="text"
                  className="w-[80px] h-[36px] outline-none border-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[#5B5B5B] text-[14px]">Products</span>
                <input
                  type="text"
                  className="w-[80px] h-[36px] outline-none border-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Referral Link</span>
            <div className=" flex justify-center ml-5">
              <input
                type="text"
                className="h-[36px] w-[270px] outline-none border-2 rounded-l-md px-1"
              />
              <button className="w-[49px] h-[36px] bg-[#19525A] text-[14px] text-white rounded-r-md">
                Copy
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-8 py-4">
            <span className="text-[16px] text-[#5B5B5B]">
              Link send to the customers
            </span>
            <div className=" flex justify-center ml-5">
              <Dropdown
                items={["After visit first", ""]}
                selected={"After visit first"}
                width={"178px"}
                onSelected={(selected) => {
                  // setSelectedTitle(selected);
                  // setSelectedFormat(
                  //   emailFormats.find((item) => item.name === selected)
                  // );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referral;
