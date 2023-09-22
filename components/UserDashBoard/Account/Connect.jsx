import Image from "next/image";
import React from "react";

const cons = [
  {
    id: 1,
    icon: "/icons/googleImg.png",
  },
  {
    id: 2,
    icon: "/icons/facebookImg.png",
  },
  {
    id: 3,
    icon: "/icons/twitterImg.png",
  },
  {
    id: 4,
    icon: "/icons/outlook.png",
  },
];
const Connect = () => {
  return (
    <React.Fragment>
      <div className="pb-8 flex flex-col">
        <div className="flex justify-between">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Basic Info
          </span>
        </div>
        {cons.map((con) => (
          <div
            key={con.id}
            className="flex justify-between bg-white items-center px-8 py-4 border-b-[2px] border-gray-300"
          >
            <div>
              <Image src={`${con.icon}`} height={30} width={100} alt="image" />
            </div>
            <button className="w-[159px] h-[36px] text-white text-[16px] bg-[#19525A] rounded-md">
              Connect
            </button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Connect;
