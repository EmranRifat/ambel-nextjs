import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import icon1 from "../../../public/pay11.svg";
import { GoPrimitiveDot } from "react-icons/go";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const TotalSales = () => {
  const totalSales = {
    series: [50, 50],
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
      colors: ["#F3722C", "#F2CB00"],
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
      {/* total sales chart */}
      <div className="w-[297px] h-[304px] flex flex-col items-center py-3 bg-white rounded-md shadow-lg">
        <div className="w-full flex justify-between px-2 border-b-2 pb-2">
          <Image src={icon1} height="40px" width="40px" alt="sales" />
          <div className="flex flex-col">
            <span className="text-[#5B5B5B] text-[16px]">Total Sales</span>
            <span className="text-[#00A455] text-[20px] font-[500] mt-1">
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
            options={totalSales.options}
            series={totalSales.series}
            type={totalSales.options.chart.type}
            height={180}
            width={"100%"}
          />
        </div>
        <div className="w-full flex justify-around mt-3">
          <div className="flex items-center">
            <GoPrimitiveDot className="text-[#F94144]" />
            <span className="text-[11px]"> Services ($5k)</span>
          </div>
          <div className="flex items-center ">
            <GoPrimitiveDot className="text-[#F3722C]" />
            <span className="text-[11px]"> Treatments ($5k)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalSales;
