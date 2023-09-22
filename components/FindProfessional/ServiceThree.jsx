import love from "../../public/icons/love.png";
import share from "../../public/icons/share.png";
import flag from "../../public/icons/flag.png";
import doctor from "../../public/icons/doctor.png";
import dot from "../../public/icons/dot.png";
import completed from "../../public/icons/completed.png";
import experience from "../../public/icons/experience.png";
import locationred from "../../public/icons/locationred.png";
import ratingempty from "../../public/icons/ratingempty.png";
import dollar from "../../public/icons/dollar.png";
import clockwhite from "../../public/icons/clockwhite.png";
import settings from "../../public/icons/settingswhite.png";
import card from "../../public/icons/creditcard.png";
import { BiChevronLeft, BiChevronRight, BiPlus } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import scheduleTime from "./ScheduleTime";
import scheduleDate from "./ScheduleDate";
import ScheduleTop from "./Schedule/ScheduleTop";
import ScheduleMain from "./Schedule/ScheduleMain";
import clock from "../../public/icons/clock.png";
import arrowdown from "../../public/icons/arrowdown.png";
import box from "../../public/icons/box.png";
import cross from "../../public/icons/cross.png";
import phonecallfill from "../../public/icons/phonecallfill.png";
import mailfill from "../../public/icons/mailfill.png";
import headphone from "../../public/icons/headphone.png";
import recepient from "../../public/icons/recepient.svg";
import clocktime from "../../public/icons/clocktime.png";
import femaleDoctor from "../../public/img/femaledoctor.png";
import Modal from "../Modal/index";
import styles from "./dashboard.module.css";
import { useState } from "react";

const BookingModal = (props) => {
  return (
    <Modal onClick={props.setIsBookingModalOpen} closeOnOutsideClick={true}>
      <div className="w-[550px] bg-[#FFF] p-[25px] pt-[15px] rounded-[8px] relative">
        <img
          src={cross.src}
          alt=""
          className="absolute left-[93%]"
          onClick={() => {
            props.setIsBookingModalOpen(false);
          }}
        />
        <p className="font-[500] text-[20px] text-[#5B5B5B] text-center pt-[25px] pb-[50px]">
          Request a time slot on Dr. Tazul Schedule
        </p>
        <div className="flex flex-row justify-between pb-[25px]">
          <div className="">
            <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Date</p>
            <div className="w-[220px] p-[10px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <input
                type="text"
                placeholder="11-08-2022"
                className="w-full outline-none text-[14px] text-[#5B5B5BB2]/70"
              />
              <FaCalendarAlt className="w-[20px] h-[20px] text-[#5B5B5B]/70 mx-[5px]" />
            </div>
          </div>
          <div className="">
            <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Time</p>
            <div className="w-[220px] p-[10px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <input
                type="text"
                placeholder="11-08-2022"
                className="w-full outline-none text-[14px] text-[#5B5B5BB2]/70"
              />
              <img
                src={clock.src}
                alt="icon"
                className="w-[20px] h-[20px] text-[#5B5B5B]/70 mx-[5px]"
              />
            </div>
          </div>
        </div>
        <div className="pb-[25px]">
          <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Service</p>
          <div
            className={`flex justify-between w-[full] border-[1px] border-[#19525A80]/70 rounded-[8px] p-[15px]`}
          >
            <span className="text-[12px] text-[#5B5B5BB2]/70 font-normal">
              {" "}
            </span>
            <img src={arrowdown.src} className="py-[4px] w-[10px] h-[15px]" />
          </div>
        </div>
        <div className="pb-[25px]">
          <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Note</p>
          <div className="w-full p-[10px] h-[80px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]"></div>
        </div>
        <div>
          <img src={box.src} alt="" className="inline-block mr-[10px]" />
          <text className="text-[#5B5B5B]">
            I agree all <span className="text-[#0089C9]">terms</span> and{" "}
            <span className="text-[#0089C9]">condition</span>
          </text>
        </div>
        <div className="p-5 pt-0 ">
          <button className="bg-[#19525A] py-[3px]  float-right ml-[8px] text-[#FFF] px-[11px] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)">
            Request
          </button>
          <button
            className="border-[.5px] py-[3px] float-right  px-[11px]  border-[#19525AB2]/70 rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)"
            onClick={() => {
              props.setIsBookingModalOpen(false);
            }}
          >
            Cancel
          </button>
          <div className="clear-both content-[''] table"></div>
        </div>
      </div>
    </Modal>
  );
};

const WaitlistModal = (props) => {
  return (
    <Modal onClick={props.setIsWaitlistModalOpen} closeOnOutsideClick={true}>
      <div className="w-[550px] bg-[#FFF] p-[25px] pt-[15px] rounded-[8px] relative">
        <img
          src={cross.src}
          alt=""
          className="absolute left-[93%]"
          onClick={() => {
            props.setIsWaitlistModalOpen(false);
          }}
        />
        <p className="font-[500] text-[20px] text-[#5B5B5B] text-center pt-[25px] pb-[50px]">
          Make a waitlist slot on Dr. Tazul Schedule
        </p>
        <div className="flex flex-row justify-between pb-[25px]">
          <div className="">
            <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Date</p>
            <div className="w-[220px] p-[10px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <input
                type="text"
                placeholder="11-08-2022"
                className="w-full outline-none text-[14px] text-[#5B5B5BB2]/70"
              />
              <FaCalendarAlt className="w-[20px] h-[20px] text-[#5B5B5B]/70 mx-[5px]" />
            </div>
          </div>
          <div className="">
            <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Time</p>
            <div className="w-[220px] p-[10px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]">
              <input
                type="text"
                placeholder="11-08-2022"
                className="w-full outline-none text-[14px] text-[#5B5B5BB2]/70"
              />
              <img
                src={clock.src}
                alt="icon"
                className="w-[20px] h-[20px] text-[#5B5B5B]/70 mx-[5px]"
              />
            </div>
          </div>
        </div>
        <div className="pb-[25px]">
          <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Service</p>
          <div
            className={`flex justify-between w-[full] border-[1px] border-[#19525A80]/70 rounded-[8px] p-[15px]`}
          >
            <span className="text-[12px] text-[#5B5B5BB2]/70 font-normal">
              {" "}
            </span>
            <img src={arrowdown.src} className="py-[4px] w-[10px] h-[15px]" />
          </div>
        </div>
        <div className="pb-[25px]">
          <p className="text-[16px] text-[#5B5B5B] pb-[5px]">Note</p>
          <div className="w-full p-[10px] h-[80px] flex flex-row justify-between border-[1px] border-[#19525A80]/70 shadow-[0_0px_2px_1px_rgba(0,0,0,0.25)] rounded-[8px]"></div>
        </div>
        <div>
          <img src={box.src} alt="" className="inline-block mr-[10px]" />
          <text className="text-[#5B5B5B]">
            I agree all <span className="text-[#0089C9]">terms</span> and{" "}
            <span className="text-[#0089C9]">condition</span>
          </text>
        </div>
        <div className="p-5 pt-0 ">
          <button className="bg-[#19525A] py-[3px]  float-right ml-[8px] text-[#FFF] px-[11px] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)">
            Request
          </button>
          <button
            className="border-[.5px] py-[3px] float-right  px-[11px]  border-[#19525AB2]/70 rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)"
            onClick={() => {
              props.setIsWaitlistModalOpen(false);
            }}
          >
            Cancel
          </button>
          <div className="clear-both content-[''] table"></div>
        </div>
      </div>
    </Modal>
  );
};

const Services = ({ setShow }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const getSplittedTime = (schedule, index) => {
    let splittedTime = schedule.time.split(" ")[0].toString();
    let value = scheduleTime.filter(
      (schedule) => schedule.time === splittedTime
    )[0].id;

    let temp = 0;

    if (value >= 1 && value < 5) temp = 4;
    else if (value >= 5 && value < 10) temp = 3;
    else if (value >= 10 && value < 14) temp = 2;
    else if (value >= 14 && value < 18) temp = 1;
    else if (value >= 18 && value <= 22) temp = 0;
    else if (value > 22 && value <= 24) temp = -1;
    let bg, txt, callback;
    if (schedule.value == 0) {
      bg = "bg-[#19525A]";
      txt = "Available";
      callback = () => {
        setIsBookingModalOpen(true);
      };
    } else if (schedule.value == 1) {
      bg = "bg-[#FF000080]/50";
      txt = "Booked";
      callback = () => {};
    } else if (schedule.value == 2) {
      bg = "bg-[#CA610080]/50";
      txt = "Book on Waitlist";
      callback = () => {
        setIsWaitlistModalOpen(true);
      };
    }

    return (
      <div
        key={index}
        className={`w-full h-10 py-2.5 ${bg} rounded-lg text-white text-center absolute `}
        style={{ top: `${value * 4 - temp}%` }}
        onClick={callback}
      >
        <span>{txt}</span>
      </div>
    );
  };
  return (
    <>
      <div className="w-[95%] mx-auto border-b-[1px] border-[#5B5B5BB2]">
        <div className="flex justify-end pt-[30px] pb-[15px]">
          <img src={love.src} alt="love-icon" className="ml-[20px]" />
          <img src={share.src} alt="share-icon" className="ml-[20px]" />
          <img src={flag.src} alt="flag-icon" className="ml-[20px]" />
        </div>
        <div className="flex flex-row">
          <img
            src={doctor.src}
            alt=""
            className="w-[200px] h-[200px]rounded-[50%]"
          />
          <div className="ml-[30px]">
            <div className="text-[#5B5B5B]">
              <p className="text-[32px] pb-[10px]">
                Md. Tazul Islam
                <span className="border-[#19525ACC]/80 border-[1px] rounded-[40px] p-[5px]  text-[14px] relative -top-[5px] mr-[10px] ml-[35px]">
                  <img src={dot.src} alt="dot" className="inline-block" />
                  Available
                </span>
                <span className="border-[#19525ACC]/80 border-[1px] rounded-[40px] p-[5px] text-[14px] relative -top-[5px]">
                  <img
                    src={completed.src}
                    alt="completed"
                    className="inline-block"
                  />
                  1k Completed
                </span>
              </p>
              <p className="text-[16px] font-[500]">MBBS,FRCS,MSBC (UK)</p>
              <p className="text-[16px]">
                Specialist on{" "}
                <span className="text-[#19525A]">Eye, Nose and Ear</span>
              </p>
            </div>
            <p className="text-[16px] text-[#404040] mt-[20px] tracking-[0.02rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
              tincidunt et scelerisque etiam. Blandit hendrerit id nec elementum
              ligula et.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Eu tincidunt et scelerisque etiam. Blandit hendrerit id nec
              elementum ligula et.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Eu tincidunt et scelerisque etiam. Blandit
              hendrerit id nec.
            </p>
          </div>
        </div>
        <div className="flex justify-between text-[16px] text-[#5B5B5B] tracking-[0.02rem] pt-[30px] pb-[20px]">
          <div className="inline-block w-[420px] bg-[#E2E2E2] rounded-[8px] py-[20px] text-center">
            <img
              src={experience.src}
              alt="icon"
              className="inline-block mr-[15px]"
            />
            10+ Years Experience
          </div>
          <div className="inline-block w-[420px] bg-[#E2E2E2] rounded-[8px] py-[20px] text-center">
            <img
              src={ratingempty.src}
              alt="icon"
              className="inline-block mr-[15px]"
            />
            4.8 out of 30 Reviews
          </div>
          <div className="inline-block w-[420px] bg-[#E2E2E2] rounded-[8px] py-[20px] text-center">
            <img
              src={locationred.src}
              alt="icon"
              className="inline-block mr-[15px]"
            />
            Gulshan, Dhaka, BD
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto flex flex-row">
        <div>
          <div>
            <text className="block text-[32px] text-[#000] font-[500]">
              Medicine
            </text>
            <div className="w-[350px]  px-[20px] py-[10px] bg-[#19525A] text-[#FFF] rounded-[8px] mb-[20px]">
              <p className="text-[16px]">
                Full service name ho jo bo ro looo dot shoytan. U laa laaa le
                yee yo laa laaa lee yee.{" "}
              </p>
              <div className="pt-[4px] text-[16px] flex flex-row justify-between">
                <div className="inline-block pr-[10px] ">
                  <img
                    src={clockwhite.src}
                    alt="clock"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 45 min</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={dollar.src}
                    alt="dollar"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 50</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={card.src}
                    alt="Card"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Pre Paid</text>
                </div>

                <div className="inline-block">
                  <img
                    src={settings.src}
                    alt="setting"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Online</text>
                </div>
              </div>
            </div>
            <div className="w-[350px]  px-[20px] py-[10px] bg-[#19525A] text-[#FFF] rounded-[8px] mb-[20px]">
              <p className="text-[16px]">
                Full service name ho jo bo ro looo dot shoytan. U laa laaa le
                yee yo laa laaa lee yee.{" "}
              </p>
              <div className="pt-[4px] text-[16px] flex flex-row justify-between">
                <div className="inline-block pr-[10px] ">
                  <img
                    src={clockwhite.src}
                    alt="clock"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 45 min</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={dollar.src}
                    alt="dollar"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 50</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={card.src}
                    alt="Card"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Pre Paid</text>
                </div>

                <div className="inline-block">
                  <img
                    src={settings.src}
                    alt="setting"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Online</text>
                </div>
              </div>
            </div>
          </div>
          <div>
            <text className="block text-[32px] text-[#000] font-[500]">
              Medicine
            </text>
            <div className="w-[350px]  px-[20px] py-[10px] bg-[#19525A] text-[#FFF] rounded-[8px] mb-[20px]">
              <p className="text-[16px]">
                Full service name ho jo bo ro looo dot shoytan. U laa laaa le
                yee yo laa laaa lee yee.{" "}
              </p>
              <div className="pt-[4px] text-[16px] flex flex-row justify-between">
                <div className="inline-block pr-[10px] ">
                  <img
                    src={clockwhite.src}
                    alt="clock"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 45 min</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={dollar.src}
                    alt="dollar"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 50</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={card.src}
                    alt="Card"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Pre Paid</text>
                </div>

                <div className="inline-block">
                  <img
                    src={settings.src}
                    alt="setting"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Online</text>
                </div>
              </div>
            </div>
            <div className="w-[350px]  px-[20px] py-[10px] bg-[#19525A] text-[#FFF] rounded-[8px] mb-[20px]">
              <p className="text-[16px]">
                Full service name ho jo bo ro looo dot shoytan. U laa laaa le
                yee yo laa laaa lee yee.{" "}
              </p>
              <div className="pt-[4px] text-[16px] flex flex-row justify-between">
                <div className="inline-block pr-[10px] ">
                  <img
                    src={clockwhite.src}
                    alt="clock"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 45 min</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={dollar.src}
                    alt="dollar"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> 50</text>
                </div>
                <div className="inline-block pr-[10px]">
                  <img
                    src={card.src}
                    alt="Card"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Pre Paid</text>
                </div>

                <div className="inline-block">
                  <img
                    src={settings.src}
                    alt="setting"
                    className="inline-block relative -top-[2px]"
                  />
                  <text className="text-[14px]"> Online</text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full h-[74vh] ${styles.scrollbar} overflow-y-scroll overflow-x-hidden mt-[15px] md:w-[1350px] md:pl-5`}>
          <ScheduleMain />
        </div>
      </div>
      <div className="w-full px-[115px] flex flex-row  pt-[20px]">
        <div className="w-[35%] pt-[80px]">
          <div className="w-[100%] mx-auto">
            <div className="flex flex-row pb-[20px]">
              <img
                src={phonecallfill.src}
                alt="map-icon"
                className="w-[20px] h-[20px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
			  +(123) 555-0178-890
                <br /> +(123) 555-0178-890
              </p>
            </div>
            <div className="flex flex-row pb-[20px]">
              <img
                src={clocktime.src}
                alt="map-icon"
                className="w-[20px] h-[20px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
                Mon-Fri: 9:00AM-10:00PM
                <br /> Sat-Sun: 9:00AM-01:00PM
              </p>
            </div>
            <div className="flex flex-row pb-[20px]">
              <img
                src={mailfill.src}
                alt="map-icon"
                className="w-[20px] h-[15px] mr-[5px] relative top-[8px]"
              />{" "}
              <p className="text-[#5B5B5B] text-[20px]">
			  info@medical.com
                <br /> info@medical.com
              </p>
            </div>
            <div className="text-center">
              <p className="text-[#5B5B5B] text-[32px] font-[500] pb-[10px] text-center mr-[120px]">
                Ask to
              </p>
              <div className="inline-block bg-[#19525A] rounded-[50px] w-[210px] py-[5px] px-[10px] mx-auto text-center mr-[120px]">
                <img
                  src={headphone.src}
                  alt="headphone"
                  className="inline-block pl-[10px] pr-[10px] relative -top-[5px]"
                />
                <p className="inline-block text-[#FFF] text-[24px] font-[500]">
                  Receptionist
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={femaleDoctor.src}
            alt="femaleDoctor"
            className="block w-[500px]  pt-[20px]"
          />
        </div>
        <div className="w-[30%] h-[430px] pt-[40px] mt-[20px]">
          <p className="text-[#19525A] text-[32px] font-[500]">Quick Contact</p>
          <input
            type="email"
            placeholder="Your Email"
            className="text-[24px] border-[1px] w-[350px] h-[90px] border-[#5B5B5B] p-[15px] focus:outline-none bg-[#f7f6f4] rounded-[10px] mt-[15px] mb-[10px]"
          />
          <textarea
            placeholder="Your Mesaage"
            className="text-[24px] border-[1px] w-[350px] h-[150px] border-[#5B5B5B] p-[15px] focus:outline-none bg-[#f7f6f4] rounded-[10px]"
          />
          <button className="bg-[#19525A] block w-[140px] h-[40px] text-[#FFF] text-[24px] font-[500] rounded-[10px] mt-[10px]">
            Send
          </button>
        </div>
      </div>
      {isBookingModalOpen && (
        <BookingModal setIsBookingModalOpen={setIsBookingModalOpen} />
      )}
      {isWaitlistModalOpen && (
        <WaitlistModal setIsWaitlistModalOpen={setIsWaitlistModalOpen} />
      )}
    </>
  );
};

export default Services;
