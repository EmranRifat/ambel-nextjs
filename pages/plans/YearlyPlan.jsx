import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export default function YearlyPlan() {
  return (
    <div className="w-full px-20 gap-10 my-16 flex">
      <div className="w-2/6 bg-[#f3e8df] rounded-[16px]">
        {/* card head */}
        <div className="text-center text-white bg-[#9B9376] rounded-[16px] py-12">
          <h3 className="text-2xl">Pay Per You Go</h3>
          <h2 className="text-5xl py-3">10%</h2>
          <p className="text-sm">10% from your customer payment</p>
        </div>
        {/* card body */}
        <div className="p-3">
          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p className="text-base my-[5px]">Online Appointment create</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Only Pre-Paid booking</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24 hours available for booking per day</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Multiple Practitioner</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>All schedule Feature</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>5 Page Website for Organization</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Custom invoice system</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Email & SMS Reminders</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited File Storage</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Data backup System</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Vanish mode for secure file transfer </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Messaging, Audio and Video Calling</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Online Group Session</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-1 rounded-full my-auto bg-white" />
            <p>Advance Reporting</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Staff add</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Charting, E-form, Protected Documentation</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Easy Business and Stuff Management </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24/7 support </p>
          </div>
        </div>
        <div className="flex">
          <p className="bg-[#0DBE5E] mx-auto text-base text-gray-100 mb-4 py-3 px-6 rounded-full">
            Try free for 30 Days
          </p>
        </div>
      </div>

      <div className="w-2/6 bg-[#c6e9d4] rounded-[16px]">
        {/* card head */}
        <div className="text-center text-white bg-[#769B85] rounded-[16px] py-12">
          <h3 className="text-2xl">Basic Plan</h3>
          <h2 className="text-5xl py-3">
            <span className="text-2xl">$</span>505
          </h2>
          <p className="text-sm my-[5px]">Only for 1 practitioner license</p>
        </div>
        {/* card body */}
        <div className="p-3">
          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p className="text-base">Online Appointment create</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Pre-Paid, Post-paid, Free booking System</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24 hours available for booking per day</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Single Practitioner</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>All schedule Feature</p>
          </div>

          {/* <div className="flex py-1">
                <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
                <p>5 Page Website for Organization</p>
              </div> */}

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Custom invoice system</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Email & SMS Reminders</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited File Storage</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Data backup System</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Vanish mode for secure file transfer </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Messaging, Audio and Video Calling</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Online Group Session</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Advance Reporting</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Staff add</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Charting, E-form, Protected Documentation</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Easy Business and Stuff Management </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24/7 support </p>
          </div>
        </div>
        <div className="flex mt-8">
          <p className="bg-[#0DBE5E] mx-auto text-base text-gray-100 mb-4 py-3 px-6 rounded-full">
            Try free for 30 Days
          </p>
        </div>
      </div>

      <div className="w-2/6 bg-[#0423C61A] rounded-[16px]">
        {/* card head */}
        <div className="text-center text-white bg-[#767A9B] rounded-[16px] py-12">
          <h3 className="text-2xl">Enterprise Plan</h3>
          <h2 className="text-5xl py-3">
            <span className="text-2xl">$</span>3900
          </h2>
          <div className="flex">
            <div className="flex mx-auto ">
              <p className="text-sm my-auto">Practitioner Number</p>
              <div className="bg-white px-1 py-[1px] flex rounded ml-2">
                <input
                  className="w-[23px] text-gray-900"
                  type="text"
                  name=""
                  placeholder="10"
                  id=""
                />
                <div className="ml-2 mt-auto">
                  <TiArrowSortedUp className="text-gray-900 -mb-1" />
                  <TiArrowSortedDown className="text-gray-900 -mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* card body */}
        <div className="p-3">
          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p className="text-base">Online Appointment create</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Only Pre-Paid booking</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24 hours available for booking per day</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Multiple Practitioner</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>All schedule Feature</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>5 Page Website for Organization</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Custom invoice system</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Email & SMS Reminders</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited File Storage</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Data backup System</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Vanish mode for secure file transfer </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Messaging, Audio and Video Calling</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Online Group Session</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Advance Reporting</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Unlimited Staff add</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Charting, E-form, Protected Documentation</p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>Easy Business and Stuff Management </p>
          </div>

          <div className="flex py-1">
            <BsFillCheckCircleFill className="text-[#19525A] mr-2 rounded-full my-auto bg-white" />
            <p>24/7 support </p>
          </div>
        </div>
        <div className="flex mt-auto">
          <p className="bg-[#0DBE5E] mx-auto text-base text-gray-100 mb-4 py-3 px-6 rounded-full">
            Try free for 30 Days
          </p>
        </div>
      </div>
    </div>
  );
}
