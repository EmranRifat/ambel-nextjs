import Image from "next/image";
import React from "react";
import location from "../../assets/icons/Vector (2).png"
import star from "../../assets/icons/Vector (3).png"
const ProfessionalDetails = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center px-3">
          {/* image with  ditails*/}
          <div className="w-[80%] flex justify-start items-start">
            <Image
              src="/drImage.jpg"
              height={160}
              width={160}
              alt="profile_pic"
              className="rounded-full"
            />
            <div className="flex flex-col justify-center ml-4">
              <h3 className="text-[#5B5B5B] text-[32px] mt-2">
                Md Tazul Islam{" "}
              </h3>
              <h3 className="text-[16px] text-[#5B5B5B] ">
                MBBS,FRCS,MSBC (UK)
              </h3>
              <h3 className="text-[16px] text-[#5B5B5B] mt-2">
                Specialist on
                <span className="text-[#5c5b5b] font-semibold ml-2">Eye, Nose and Ear</span>
              </h3>
              <h3 className="text-[16px] text-[#5B5B5B] mt-2">
                Work on
                <span className="text-[#0372BA] ml-2">
                  Dhaka Medical College
                </span>{" "}
              </h3>
            </div>
          </div>

          {/* normal details */}
          <div className="w-[20%] flex flex-col items-center mr-4 mt-2">
            <div className="w-full flex justify-between px-4">
              <Image
                src={"/icons/loveIcon.png"}
                height={20}
                width={22}
                alt="love"
              />
              <Image src="/icons/share.png" height={20} width={22} alt="love" />
              <Image src="/icons/flag.png" height={20} width={22} alt="love" />
            </div>
            <span className="text-[#1d1d1db9] font-semibold text-[16px] mt-2">
              Consaltant Fee
            </span>
            <span className="text-[#00A455] text-[16px] mt-2">
              $ 100/hr (+5% Vat)
            </span>
            <button className="h-[40px] w-[172px] text-[14px] mt-3 bg-[#19525A] rounded-[61px] text-white">
              Get an Appointment
            </button>
          </div>
        </div>
        {/* experience rating and location */}

        <div className="w-full flex justify-between items-center mt-8 px-5 py-3 ">
          <div className="w-full flex flex-col items-center border-r-[2px] border-[#555555b9]">
            <span className="text-[#505050ce] text-[16px] font-semibold">Experienced</span>
            <div className="flex">
              <Image
                src="/icons/years.png"
                height={6}
                width={14}
                alt="years"
              />
              <span className="text-[16px] text-[#5b5b5bda] ml-2">10 years+</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center border-r-[2px]border-[#555555b9]">
            <span className="text-[#505050ce] font-semibold text-[16px]">Total Rating</span>
            <div className="flex">
            
              <Image
                src={star}
                height={4}
                width={14}
                alt="years"
              />
              <span className="text-[16px] text-[#5B5B5B] ml-2">4.8 (30)</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center  border-l-[2px] border-[#555555b9]">
            <span className="text-[#505050ce] font-semibold text-[16px]">Location</span>
            <div className="flex">
              <Image
                src={"/icons/location.png"}
                height={2}
                width={12}
                alt="years"
              />
              <span className="text-[16px] text-[#5B5B5B] ml-2">Mirpur Dhaka</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalDetails;
