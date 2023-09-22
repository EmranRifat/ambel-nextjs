import React, { useEffect, useState } from "react";
import call from "../../../public/icons/phonecall.svg";
import mail from "../../../public/icons/mail.svg";
import notificationbell from "../../../public/icons/notificationbell.svg";
import user from "../../../public/icons/user.svg";
import search from "../../../public/icons/whitesearch.svg";
import cross from "../../../public/icons/whitecross.svg";
import blacksearch from "../../../public/icons/blacksearch.svg";
import medicallogo from "../../../public/icons/medicallogo.png";
import DropdownId from "../../Dropdown/DropDownId";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
const items = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 2,
    name: "Team",
    link: "/team",
  },
  {
    id: 3,
    name: "Services",
    link: "/services",
  },
  {
    id: 4,
    name: "Package",
    link: "/package",
  },
  {
    id: 5,
    name: "Support",
    link: "/support",
  },
  {
    id: 6,
    name: "Back to Main",
    link: "/",
  },
];
const Head = ({ userName, orgData, branch, setBranch }) => {
  const [isClick, setIsClick] = useState(false);
  const router = useRouter();
  const branchOptions = orgData?.branches?.map((item) => {
    return {
      id: item._id,
      name: item.name,
    };
  })||[];

  return (
    <div className="w-full bg-[#FFF] px-[50px] pt-[15px]">
      <div className="flex justify-between">
        <div className="inline-block pt-[5px]">
          <div className="inline-block mr-[30px]">
            <img
              src={call.src}
              alt="mobileicon"
              className="w-[20px] h-[20px] inline-block"
            />
            <text className="text-[14px] leading-[21px] text-[#5B5B5B]">
              {" "}
              {orgData?.phone}{" "}
            </text>
          </div>
          <div className="inline-block">
            <img
              src={mail.src}
              alt="mobileicon"
              className="w-[20px] h-[20px] inline-block"
            />
            <text className="text-[14px] leading-[21px] text-[#5B5B5B]">
              {" "}
              {orgData?.email}{" "}
            </text>
          </div>
        </div>
        <div className="inline-block">
          <div className="inline-block">
            {!isClick ? (
              <img
                src={blacksearch.src}
                alt="search"
                className="w-[25px] h-[25px] inline-block mr-[15px] pt-[5px]"
                onClick={() => {
                  setIsClick(!isClick);
                }}
              />
            ) : (
              <div className="flex flex-row w-[200px] rounded-[34px] h-[30px] border-[#19525AB2] border-[1px] mr-[20px]">
                <div className="px-[10px] flex flex-row w-[85%] relative rounded-tl-[34px] rounded-bl-[34px]">
                  <input
                    type="text"
                    placeholder="Search it here"
                    className="inline-block text-[14px] leading-[16px]  text-[#5B5B5BB2]/70 focus:outline-none rounded-tl-[34px] rounded-bl-[34px]"
                  />
                  <img
                    src={cross.src}
                    alt="cross"
                    className="inline-block relative w-[12px] h-[12px] bg-[#5B5B5B] text-[#FFF] rounded-[50%] -left-[10px] top-[8px]"
                    onClick={() => {
                      setIsClick(!isClick);
                    }}
                  />
                </div>
                <div className="block w-[80px] bg-[#19525A] rounded-tr-[34px] rounded-br-[34px] border-[#19525AB2] border-[1px] rounde">
                  <img
                    src={search.src}
                    alt="search"
                    className="block relative text-[#FFF] top-[5px] px-[5px]"
                  />
                </div>
              </div>
            )}
          </div>
          {"" && (
            <>
              <img
                src={notificationbell.src}
                alt="bellicon"
                className="w-[25px] h-[25px] inline-block mr-[15px] pt-[5px]"
              />
              <img
                src={user.src}
                alt="userphoto"
                className="w-[35px] h-[35px] inline-block pt[-5px] "
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between pt-[50px]">
        <hr className="w-[40%] blur-[.5px] border-[1px] border-[#19525A]/70" />
        {orgData.logo ? (
          <img
            src={orgData?.src}
            alt="medicallogo"
            className="inline-block medicallogo w-[100px] h-[100px] relative -top-[50px]"
          />
        ) : (
          <div className="flex w-[100px] h-[100px] relative -top-[50px] font-bold rounded-full justify-center items-center text-[50px] bg-[#5b5b5b] text-white">
            {(orgData?.name ?? "Ambel")[0].toUpperCase()}
          </div>
        )}

        <hr className="w-[40%] blur-[.5px] border-[1px] border-[#19525A]/70" />
      </div>
      <div className="flex flex-row justify-between relative -top-[20px]">
        <div className="ml-[350px]">
          {items.map((item) => {
            return (
              <button
                key={item.id}
                className={`${
                  router.pathname.endsWith(item.link)
                    ? "text-[#FFF] bg-[#19525A]"
                    : "text-[#19525A] bg-[#FFF] hover:text-[#FFF] hover:bg-[#19525A]"
                } px-[10px] h-[35px] text-[18px] rounded-[8px] mr-[30px]`}
                onClick={() => {
                  if (item.id == 6) {
                    router.replace(item.link);
                  } else {
                    router.push(`/organizations/${userName}${item.link}`);
                  }
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div>
          <DropdownId
            items={[{ id: "-1", name: "All Branches" },...branchOptions]}
            selected={branch}
            width={"150px"}
            onSelected={(selected) => {
              setBranch(selected);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Head;
