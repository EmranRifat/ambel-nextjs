import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import icon2 from "../../../public/pay12.svg";
import { GoPrimitiveDot } from "react-icons/go";
import TotalSales from "./TotalSales";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CollectedAmount = () => {
  const collectionAmount = {
    series: [75, 25],
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
          startAngle: -220,
          endAngle: 140,
          donut: {
            size: "60%",
          },
        },
      },
      colors: ["#03982D", "#F94144"],
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
      {/* collections amount */}
      <div className="w-[297px] h-[304px] flex flex-col items-center py-3 bg-white rounded-md shadow-lg">
        <div className="w-full flex justify-between px-2 border-b-2 pb-2">
          <Image src={icon2} height="40px" width="50px" alt="sales" />
          <div className="flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">Collected Amount</span>
            <span className="text-[#00A455] text-[20px] font-[500] mt-1">
              $1500.00 USD
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
        <div className="w-full mt-3">
          <Chart
            options={collectionAmount.options}
            series={collectionAmount.series}
            type={collectionAmount.options.chart.type}
            height={180}
            width={"100%"}
          />
        </div>
        <div className="w-full flex justify-around mt-3">
          <div className="flex items-center">
            <GoPrimitiveDot className="text-[#00A455]" />
            <span className="text-[11px]"> Collected($1.5k)</span>
          </div>
          <div className="flex items-center ">
            <GoPrimitiveDot className="text-[#F3722C]" />
            <span className="text-[11px]"> Remain($500) </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectedAmount;
