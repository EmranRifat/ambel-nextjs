/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { items } from "./AddChartItems";
const AddItemModal = (props) => {
  const [feature, setfeature] = useState(1);
  return (
    <React.Fragment>
      <div className="h-[760px] w-[980px] bg-white flex flex-col mt-20 rounded-md">
        <div className="w-full flex justify-end p-4">
          <Image
            onClick={() => props.setItemOpen(false)}
            src="/blackcross.png"
            height={17}
            width={15}
            alt="cross"
          />
        </div>
        <div className="w-full flex justify-center items-center text-[#19525A] text-[28px] font-bold">
          Add Items on Your Chart
        </div>
        <div className="w-full flex justify-between items-center border-b-[.2px] border-[#5B5B5B] pb-2 shadow-md px-5 mt-2">
          <div className="flex items-center gap-10">
            <button
              onClick={() => setfeature(1)}
              className={`h-[52px] rounded-md w-[85px] text-[#5B5B5B] text-[20px] ${feature == 1 && "bg-[#C4DBCC]"
                }`}
            >
              Items
            </button>
            <button
              onClick={() => setfeature(2)}
              className={`h-[52px] rounded-md w-[100px] text-[#5B5B5B] text-[20px]  ${feature == 2 && "bg-[#C4DBCC]"
                } `}
            >
              Templates
            </button>
            <button
              onClick={() => setfeature(3)}
              className={`h-[52px] rounded-md w-[180px] text-[#5B5B5B] text-[20px]  ${feature == 3 && "bg-[#C4DBCC]"
                }`}
            >
              Templates Library
            </button>
          </div>
          <div className="bg-white h-[42px] w-[293px] flex justify-start gap-2 px-3 items-center border-[1px] border-[#42424280] rounded-[50px] shadow-sm">
            <Image src="/search.png" height={12} width={12} alt="search" />
            <input
              type="text"
              placeholder="Search chart"
              className="outline-none border-none"
            />
          </div>
        </div>

        {/* items */}
        <div className="w-full flex flex-wrap justify-start p-2">
          {items.map((item) => (
            <div
              onClick={() => {
                props.setChartItem((_) => {
                  switch (item.type) {
                    case "dropdown":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props?.chartItem?.entries,
                          {
                            type: item.type,
                            title: item.title,
                            data: {
                              listItem: [],
                              prompt: "Select the item",
                            },
                          },
                        ],
                      };
                    case "text":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            title: item.title,
                            name: item.name,
                            description: item.description,
                          },
                        ],
                      };
                    case "heading":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            heading: "",
                          },
                        ],
                      };
                    case "info":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "note":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "bodychart":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "checkbox":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "range":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "vitals":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "table":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "sketch":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "attachment":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "optical_measurement":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                    case "smart_options":
                      return {
                        ...props.chartItem,
                        entries: [
                          ...props.chartItem?.entries,
                          {
                            type: item.type,
                            text: "",
                          },
                        ],
                      };
                  }
                });
                props.setItemOpen(false);
              }}
              key={item.id}
              className=" w-[320px] flex justify-start items-center gap-2 p-3 hover:bg-[#C4DBCC] cursor-pointer rounded-md delay-75 ease-in-out"
            >
              <img
                src={`/chartIcon/${item.icon}.png`}
                alt="img"
                className="mb-1"
              />
              <div className="flex flex-col py-1">
                <h3 className="text-[#19525A] text-[16px] font-bold">
                  {item.title}
                </h3>
                <span className="text-[#5B5B5B] text-[12px]">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddItemModal;
