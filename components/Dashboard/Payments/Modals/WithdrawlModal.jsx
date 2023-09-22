import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import dp from "./Images/dp.jpg";
import Image from "next/image";
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";

export default function WithdrawlModal({ visible, onClose }) {
  const [show, setShow] = useState("basicid");
  const HandleOnClose = (e) => {
    if (e.target.id === "customerModal") onClose();
  };
  if (!visible) return null;

  return (
    <>
      <div
        id="customerModal"
        onClick={HandleOnClose}
        className="flex inset-0 fixed tz-40 bg-[#000]/40  backdrop-blur-lg overflow-y-scroll justify-center py-4 items-center"
      >
        <div>
          <div className="flex">
            <button
              onClick={onClose}
              className="btn-light text-light ml-auto -mr-5 pb-2"
            >
              <RxCross1 className="text-white text-lg " />
            </button>
          </div>
          <div className="bg-white p-4 rounded-[8px] w-[900px] ">
            {/* name and dp */}
            <div className="text-center -mt-[120px]">
              <div className="my-4">
                <p className="text-white text-[14px] mb-1">Withdrawl</p>
                <p className="text-white text-[14px]">
                  10:00 AM (EDT), Aug 15, 2022
                </p>
              </div>
              <div className="">
                <Image
                  src={dp}
                  alt="Picture of the author"
                  width={80}
                  height={80}
                  className="rounded-full "
                />
              </div>
              <div className="border-b-2 border-gray-500">
                <h1 className="text-[32px] text-[#FF0000]">-$1,000.00 USD</h1>
                <p className="text-base text-[#5B5B5B]">Tazrul Islam</p>
                <p className="text-[14px] font-bold text-[#5B5B5B]">
                  Invoice no #12345
                </p>
                <p className="text-[14px] font-bold text-[#5B5B5B]">
                  Transection ID #34546786
                </p>
                <p className="text-[14px] p-4 text-[#5B5B5B]">
                  Lorem ipsum is a placeholder text commonly used to demonstrate
                  <br />
                  the visual form of a document or a typeface without relying on
                </p>
              </div>
              <div className="flex ">
                <div className="w-2/4 px-[50px] py-4  text-left">
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Withdraw To :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">
                      Dutch Bangla Bank Ltd.
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Account name :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">Md. Tazul Islam</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Account number :
                    </span>
                    <p className="text-base text-[#5b5b5b]"> 2011518874</p>
                  </div>
                </div>
                <div className="w-2/4 px-[50px] py-4  text-left">
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Amount :
                    </span>
                    <p className="text-base text-[#5b5b5b]">$ 995.00 USD</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">Tax :</span>
                    <p className="text-base text-[#5b5b5b] ">Md. Tazul Islam</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">Fee :</span>
                    <p className="text-base text-[#5b5b5b] ">2011518874</p>
                  </div>
                </div>
              </div>
              <button className="flex mx-auto rounded-lg py-2 px-[70px] bg-[#19525A] text-white mt-[50px] mb-[25px]">
                <RiDownloadLine className="my-auto text-lg mx-2" />
                <p className="text-[14px] my-auto">Download Invoice</p>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg mt-10 ">
            <div className="border-b-2 border-gray-500 mb-4 flex justify-between">
              <p className="text-[#5b5b5b] pb-6">Add a note</p>
              <AiOutlineSend className=" mt-4 text-[#19525AB2] text-2xl" />
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className=" mr-3">
                  <Image
                    src={dp}
                    className="rounded-full w-100"
                    alt="image"
                    width="44px"
                    height="44px"
                  />
                </div>
                <div className="">
                  <p className="text-[#5b5b5b]"> Md .Tazrul ISlam</p>
                  <p className="text-[14px]">This is the note Section.</p>
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#5b5b5b]">Aug 25, 2022</p>
                <p className="text-[14px] text-[#5b5b5b]">9.53 PM (EDT)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
