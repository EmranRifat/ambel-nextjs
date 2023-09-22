import React from "react";
import { BiChevronDown } from "react-icons/bi";

const PaypalPayment = () => {
  return (
      <div className="w-full flex flex-col mt-5">
        <div className="flex flex-col">
          <span className="text-[#5B5B5B] text-[14px]">
            Email or mobile number
          </span>
          <input
            type="text"
            className="w-full h-[40px] border border-gray-300 px-4 py-5 rounded-lg outline-none transition-colors duration-150 ease-in-out mt-2 focus:ring-2 focus:ring-[#19525A8C]"
          />
        </div>
        <div className="flex flex-col mt-4">
          <span className="text-[#5B5B5B] text-[14px]">PayPal password</span>
          <input
            type="text"
            className="w-full h-[40px] border border-gray-300 px-4 py-5 rounded-lg outline-none transition-colors duration-150 ease-in-out mt-2 focus:ring-2 focus:ring-[#19525A8C]"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <button className="text-white h-[36px] w-[279px] bg-[#0070BA] rounded-md mt-4">
            Login
          </button>
          <span className="text-[10px] text-[#0089C9] mt-3">
            Having trouble with login?
          </span>

          <div className="w-full flex justify-between mt-4">
            <div className="flex justify-between w-[70%] text-[8px] text-[#5B5B5BB2]">
              <span>PayPal policies</span>
              <span>Paypal terms</span>
              <span>PayPal privacy</span>
              <span>Feedback</span>
            </div>
            <div className="flex items-center text-[#5B5B5BB2] text-[8px]">
              <span>English</span>
              <BiChevronDown />
            </div>
          </div>
        </div>
      </div>
  );
};

export default PaypalPayment;
