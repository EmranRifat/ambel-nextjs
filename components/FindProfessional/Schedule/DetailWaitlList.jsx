import Image from "next/image";
import React from "react";
import { MdClear } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Tazul Islam",
    phone: "+8801687771913",
    email: "Abc@gmail.com",
    address: "Sylhet, BD",
  },
  {
    id: 2,
    name: "Tazul Islam",
    phone: "+8801687771913",
    email: "Abc@gmail.com",
    address: "Sylhet, BD",
  },
  {
    id: 3,
    name: "Tazul Islam",
    phone: "+8801687771913",
    email: "Abc@gmail.com",
    address: "Sylhet, BD",
  },
];
const DetailWaitlList = (props) => {
  const [getId, setGetId] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center bg-white rounded-md">
        <div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
          <span className="text-[#19525A] text-[16px]">
            Waitlist for Appointment
          </span>
          <MdClear
            onClick={() => props.setWaitListForBook(false)}
            className="text-xl text-[#5B5B5BB2]"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start p-3">
          <p className="text-[#5B5B5B] text-[12px]">
            There are 4 wait listed clients for this appointment
          </p>
          <p className="text-[#5B5B5B] text-[12px] mt-2">
            These appointment can’t be book online untile the time slot is
            released
          </p>

          <div className="w-full flex items-center justify-center mt-2">
            <Image src="/clock.png" height={13} width={13} alt="clock" />
            <p className="text-[#5B5B5B] text-[12px] ml-2">
              Opening to be released in
              <span className="text-[#19525A] font-bold ml-3">01:40:00</span>
            </p>
          </div>

          <div className="w-full flex flex-col mt-2">
            <button className="w-full rounded-md bg-[#19525A] text-white text-[12px] p-1">
              Send notification to 4 client
            </button>
            <button className="w-full rounded-md bg-[#EEEEEE] text-black mt-2 text-[12px] p-1">
              Release time slot
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
            <span className="text-[#5B5B5B] text-[16px]">
              Wait listed Clients
            </span>
          </div>
          {users.map((user) => (
            <div
              key={user.id}
              className="w-full flex flex-col border-b-[1px] border-gray-300 py-2"
            >
              <div className="w-full flex justify-between items-center px-3">
                <span className="text-[#0089C9] text-[14px]">{user.name}</span>
                <BiChevronDown
                  onClick={() => {
                    setGetId(user.id);
                    setOpen(!open);
                  }}
                  className="text-2xl text-[#5B5B5B] cursor-pointer"
                />
              </div>
              <div className="w-full flex justify-between items-center text-[#5B5B5B] text-[12px] mt-1 px-3">
                <div className="flex items-center">
                  <Image
                    src="/phone.png"
                    height={12}
                    width={12}
                    alt="address"
                  />
                  <span className="ml-1">{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/email.png"
                    height={12}
                    width={12}
                    alt="address"
                  />
                  <span className="ml-1">{user.email}</span>
                </div>
              </div>
              <div className="w-full flex justify-start items-center text-[#5B5B5B] text-[12px] mt-1 px-3">
                <Image
                  src="/address.png"
                  height={13}
                  width={12}
                  alt="address"
                />
                <span className="ml-1">{user.address}</span>
              </div>
              {getId === user.id && open && (
                <>
                  <div className="w-full flex flex-col border-t-[1px] border-gray-300 mt-2">
                    <span className="text-[12px] text-[#5B5B5B] py-2 px-3">
                      Give Another time request
                    </span>

                    <div className="w-full flex justify-between items-center mt-3 px-3 py-2 border-t-[1px] border-gray-300">
                      <div className=" w-[138px] flex flex-col">
                        <span className="text-[12px] text-[#5B5B5B]">
                          Date*
                        </span>
                        <div className="w-full flex justify-between items-center h-[36px] text-[12px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
                          <input
                            type="text"
                            placeholder="DD/MM"
                            className="outline-none w-[100px]"
                          />
                          <Image
                            src="/calendar.png"
                            height={16}
                            width={16}
                            alt="clendar"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-[138px]">
                        <span className="text-[12px] text-[#5B5B5B]">
                          Time*
                        </span>
                        <input
                          type="text"
                          placeholder="00:00 AM-00:00 AM"
                          className="h-[36px] w-full outline-none text-[12px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col px-3 py-2 justify-start items-start border-t-[1px] border-gray-300">
                      <span className="text-[14px] text-[#5B5B5B]">
                        Request Service
                      </span>
                      <p className="text-[12px] text-[#5B5B5B] mt-1">
                        Service name by MD. Delware hossain Requested on 10 july
                        10:30 am
                      </p>
                    </div>
                    <div className="w-full flex justify-end items-center px-3 py-2 border-t-[1px] border-gray-300">
                      <button
                        className="text-[10px] h-[20px] w-[74px] mr-2 bg-[#EEEEEE] text-black rounded-md;
]"
                      >
                        View Profile
                      </button>
                      <button className="text-[10px] h-[20px] w-[93px] bg-[#19525A] text-white rounded-md">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailWaitlList;
