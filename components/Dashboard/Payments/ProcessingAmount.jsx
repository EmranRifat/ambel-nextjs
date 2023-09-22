import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import imgPro from "../../../public/process.svg";
import { GoPrimitiveDot } from "react-icons/go";
import TotalSales from "./TotalSales";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProcessingAmount = () => {
  const ProcessingAmount = {
    series: [50, 25, 25],
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
      colors: ["#F3722C", "#5B5B5B", "#FF2929"],
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
          <Image src={imgPro} height="40px" width="50px" alt="sales" />
          <div className="flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">
              Processing Amount
            </span>
            <span className="text-[#F3722C] text-[20px] font-[500] mt-1">
              $2000.00 USD
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
            options={ProcessingAmount.options}
            series={ProcessingAmount.series}
            type={ProcessingAmount.options.chart.type}
            height={180}
            width={"100%"}
          />
        </div>
        <div className="w-full flex justify-around mt-3">
          <div className="flex items-center">
            <GoPrimitiveDot className="text-[#F3722C]" />
            <span className="text-[11px]">Processing($2k)</span>
          </div>
          <div className="flex items-center ">
            <GoPrimitiveDot className="text-[#5B5B5B]" />
            <span className="text-[11px]">Refund($580)</span>
          </div>
          <div className="flex items-center ">
            <GoPrimitiveDot className="text-[#FF2929]" />
            <span className="text-[11px]">Cancel($600)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessingAmount;
