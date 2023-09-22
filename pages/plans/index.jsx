import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Image from "next/image";
import female from "./Image/female.png";
import Navbar from "../../components/Navbar/Navbar";
import MontlyPlan from "./MontlyPlan";
import YearlyPlan from "./YearlyPlan";
import Footer from "../../components/Footer/Footer";

const selectedStyle = "text-sm text-white bg-[#19525A] rounded-full py-3 px-5";
const unSelectdStyle = "text-sm pl-4 pr-6 py-3 bg-gray-300 rounded-full";

const packs = [
  {
    id: "1",
    name: "montly",
  },
  {
    id: "2",
    name: "yearly",
  },
];

export default function Index() {
  const [show, setShow] = useState("1");
  const [style, setStyle] = useState("1");

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="text-center pt-10">
          <h2 className="text-5xl my-16">
            Let’s Get Started We’ve got a Plan that’s perfect for you{" "}
          </h2>
          <div className="flex">
            <div className="bg-gray-300 flex rounded-full mx-auto">
              <button
                onClick={() => {
                  setShow("1");
                }}
                className={show === "1" ? selectedStyle : unSelectdStyle}
              >
                MONTLY
              </button>
              <button
                onClick={() => {
                  setShow("2");
                }}
                className={show === "2" ? selectedStyle : unSelectdStyle}
              >
                YEARLY
              </button>
            </div>
          </div>
        </div>

        {/* plan card  */}
        {show === "1" && <MontlyPlan></MontlyPlan>}
        {show === "2" && <YearlyPlan></YearlyPlan>}

        {/* contact us */}
        <div className="flex">
          <div className="mx-auto text-center">
            <h3 className="mb-6 mt-10 text-[32px] ">
              Don’t Understand? Need Any Help?{" "}
            </h3>
            <button className="bg-[#FF8A00] text-base rounded-full py-2 px-9 mb-24">
              Contact us
            </button>
          </div>
        </div>

        {/* educational plan  */}
        <div className="bg-[#5A191917] w-full flex relative ">
          <div className="text-center my-auto py-18 w-4/6 p-20">
            <h3 className="text-3xl mb-5">Education Plan</h3>
            <p className="mb-5 px-5">
              Ambel offers a free educational plan for practitioners such as
              doctors, lawyers, and teachers to help them master online schedule
              management and practice. Apply today to enroll the free
              educational plan. Please feel free to contact us with any
              questions or concerns you may have about our continuing education
              offerings for practitioners. We are here to help!
            </p>
            <div>
              <button className=" text-base py-2 px-8 rounded-full  text-gray-100 bg-[#00AA4E]">
                Learn More
              </button>
              <button className="ml-4 text-base py-2 px-8 rounded-full  text-gray-100 bg-[#0D3685]">
                Apply Now
              </button>
            </div>
          </div>
          <div className="w-2/6 absolute bottom-0 right-0 -mb-[6px]">
            <Image
              className="w-full mx-20 "
              src={female}
              alt="icon of female"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
