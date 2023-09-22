import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import dp from "./Images/dp.jpg";
import Image from "next/image";
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";

export default function PurchasedModal({ visible, onClose }) {
  const HandleOnClose = (e) => {
    if (e.target.id === "customerModal") onClose();
  };
  if (!visible) return null;

  return (
    <>
      <div
        id="PurchasedModal"
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
          <div className="bg-white p-4 mt-4 rounded-[8px] w-[900px] ">
            {/* name and dp */}
            <div className="text-center -mt-[120px]">
              <div className="my-2">
                <p className="text-white text-[14px] mb-1">Purchased product</p>
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
                <h1 className="text-[32px] text-lime-600">+$1,000.00 USD</h1>
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
                {/* 1st column */}
                <div className="w-2/4 px-[50px] py-4  text-left">
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Product name :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">
                      Cosmetics Products
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Seller :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">Meagan Mucha</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Branch :
                    </span>
                    <p className="text-base text-[#5b5b5b]"> Sylhet</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Price :
                    </span>
                    <p className="text-base text-[#5b5b5b]"> $10000.00 USD</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">Tax :</span>
                    <p className="text-base text-[#5b5b5b]"> $0.00 USD</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">Fee :</span>
                    <p className="text-base text-[#5b5b5b]"> $0.00 USD</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Payment via :
                    </span>
                    <p className="text-base text-[#5b5b5b]">Card (****_**90)</p>
                  </div>
                </div>
                {/* 2nd column  */}
                <div className="w-2/4 px-[50px] py-4  text-left">
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Company :
                    </span>
                    <p className="text-base text-[#5b5b5b]">N/A</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Address :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">
                      Tilaghor, Sylhet
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Email :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">
                      sohansust@gmail.com
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Phone Number :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">+8801687771913</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#19525AB2] font-medium">
                      Tax or vat ID :
                    </span>
                    <p className="text-base text-[#5b5b5b] ">N/A</p>
                  </div>
                </div>
              </div>
              <button className="flex mx-auto rounded-lg py-2 px-[70px] bg-[#19525A] text-white mb-[10px]">
                <RiDownloadLine className="my-auto text-lg mx-2" />
                <p className="text-[14px] my-auto">Download Invoice</p>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg mt-4 ">
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
