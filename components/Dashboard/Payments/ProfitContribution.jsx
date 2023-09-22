import React from "react";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";
import TotalSales from "./TotalSales";
import CollectedAmount from "./CollectedAmount";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ProfitContribution = () => {

   const totalSales = {
     series: [20, 80],
     options: {
       chart: {
         type: "donut",
         toolbar: {
           show: false,
         },
         parentHeightOffset: 0,
       },
       plotOptions: {
         pie: {
           startAngle: -180,
           endAngle: 180,
           donut: {
             size: "60%",
           },
         },
       },
       colors: ["#0383CB", "#5B5B5B33"],
       dataLabels: {
         enabled: false,
       },
       stroke: {
         curve: "smooth",
         width: 0,
       },
       // fill: {
       //   type: "gradient",
       // },
       legend: {
         show: false,
       },
     },
   };
  return (
    <>
      {/* total profits */}
      <div>
        <div className="h-[140px] w-[360px] bg-white p-2 rounded-md shadow-lg ">
          <div className="w-full flex justify-between px-2">
            <Image
              src="/icons/totalprofit.png"
              height="40px"
              width="60px"
              alt="sales"
            />
            <div className="flex flex-col">
              <span className="text-[#5B5B5B] text-[16px]">Total Profit</span>
              <span className="text-[#00A455] text-[20px] font-[500] mt-1">
                $500.00 USD
              </span>
            </div>
            <div className="cursor-pointer">
              <Image
                src="/icons/icircle.png"
                height="20px"
                width="20px"
                alt="sales"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <Image
              src="/icons/profitGrow.png"
              height="40px"
              width="40px"
              alt="sales"
            />
            <span className="text-[#00A455] text-[24px] font-[500] ml-3">
              +12%
            </span>
          </div>
        </div>
        <div className="h-[140px] w-[360px] flex justify-between bg-white p-2 rounded-md shadow-lg mt-5">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center">
              <Image
                src="/icons/totalcontribution.png"
                height="40px"
                width="40px"
                alt="sales"
              />
              <span>Total Contribution</span>
            </div>
            <span className="text-[48px] text-[#0283CB] font-[500]">7%</span>
          </div>
          <div className="w-[30%] mt-3 mr-4">
            <Chart
              options={totalSales.options}
              series={totalSales.series}
              type={totalSales.options.chart.type}
              height={130}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitContribution;
