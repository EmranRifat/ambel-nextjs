import React from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "../../Dropdown";
const MakePaymentModal = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="flex">
        <button
          onClick={() => setShowModal(true)}
          className="h-[32px] w-[92px] text-[14px]  text-white bg-[#19525A] rounded-[30px]"
        >
          Pay Now
        </button>
        <BsThreeDotsVertical className="my-auto text-2xl ml-5" />
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-[440px] lg:min-w-[440px] absolute top-32 flex flex-col items-center bg-white py-2 pb-5 rounded-md">
              <div className="w-full flex justify-end items-start">
                <span
                  onClick={() => setShowModal(false)}
                  className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
                >
                  ✖
                </span>
              </div>
              {/* all fields... */}
              <div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-4">
                <span>Withdrawal Request</span>
              </div>
              <div className="w-full flex flex-col justify-center items-center p-3 py-5">
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] mb-1 text-[#5B5B5B]">
                    Payment Via
                  </span>
                  <div className="w-full flex justify-center">
                    <Dropdown
                      items={["Cash", "others"]}
                      selected={"Cash"}
                      width={"410px"}
                      onSelected={(selected) => {
                        // setSelectedTitle(selected);
                        // setSelectedFormat(
                        //   emailFormats.find((item) => item.name === selected)
                        // );
                      }}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col mt-2">
                  <span className="text-[16px] mb-1 text-[#5B5B5B]">
                    Purpose of Payment
                  </span>
                  <div className="h-[90px] w-[410px] border-[1px] border-[#19525A80] px-3 py-1  rounded-md">
                    <textarea
                      placeholder=""
                      className="w-full border-[1px] border-[#19525A80] outline-none border-none p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[16px] text-[#5B5B5B]">Amount</span>
                  <div className="w-full flex justify-center">
                    <input
                      type="text"
                      className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md "
                    />
                  </div>
                </div>
              </div>
              <button className="h-[32px] py-2 w-[310px] bg-[#19525A] rounded-md text-white">
                Next
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default MakePaymentModal;
