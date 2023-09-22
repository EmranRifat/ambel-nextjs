import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import dynamic from "next/dynamic";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";
import TotalSales from "./TotalSales";
import CollectedAmount from "./CollectedAmount";
import ProfitContribution from "./ProfitContribution";
import SalesDetails from "./SalesDetails";
import Dropdown from "../../Dropdown";
import ProcessingAmount from "./ProcessingAmount";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Sales = () => {
  return (
    <>
      <div className="w-full  ">
        <div className="w-full flex justify-between">
          <span className="text-[32px] font-[700] text-[#5B5B5B]">Sales</span>
        </div>
        {/* <div className="w-full flex justify-between bg-[#E4E7ED] shadow-xl p-3 mt-3 rounded-md">
          <div className="flex justify-between gap-3">
            <Dropdown
              items={["Patient", "Practitioner", "Staff"]}
              selected={"All Branches"}
              onSelected={(item) => console.log(item)}
              width={136}
            />
          </div>
          <div className="flex justify-between items-center">
            <BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
          </div>
        </div> */}

        {/* sell collections and profit div */}
        <div className="w-full flex justify-between mt-5">
          <TotalSales />
          <CollectedAmount />
          <ProcessingAmount />
          {/* <ProfitContribution /> */}
        </div>
        {/* sales details */}
      </div>
      <div>
        <SalesDetails />
      </div>
    </>
  );
};

export default Sales;
