import Image from "next/image";
import React, { useState } from "react";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const ChartChecklist = ({ setChartItem, chartItem, index }) => {
  const [checkBox, setCheckBox] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [takeInput, setTakeInput] = useState("");
  const [itemArr, setItemArr] = useState([]);
  const [positon, setPostion] = useState("horizontal");


  const handleChange = (event) => {
    setTakeInput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      setItemArr([...itemArr, { id: itemArr.length + 1, name: takeInput }]);
      // setChartItem((prevState) => {
      //   const newEntries = chartItem.entries.map((item, idx) => {
      //     if (idx == index) {
      //       return {
      //         ...item,
      //         data: {
      //           ...item.data,
      //           listItem: [...item.data.listItem, takeInput],
      //         },
      //       };
      //     }
      //     return item;
      //   });
      //   return {
      //     ...chartItem,
      //     entries: newEntries,
      //   };
      // });
      setTakeInput("");
      setShowInput(false);
    }
  };

  const deleteItem = (id) => {
    setItemArr((prevState) => {
      const newEntries = itemArr.filter(
        (item) => id != item.id
      );
      return [
        ...newEntries,
      ];
    });
  }
  console.log(positon)
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3 mt-4">
          <span className="text-[16px]">{checkBox}</span>
          <Image
            src="/circlecross.png"
            height={20}
            width={20}
            alt="crosscircle"
            className="cursor-pointer"
            onClick={() => {
              setChartItem((prevState) => {
                const newEntries = chartItem.entries.filter(
                  (item, idx) => index != idx
                );
                return {
                  ...chartItem,
                  entries: newEntries,
                };
              });
            }}
          />
        </div>
        <div className={`flex ${positon === "vertical" ? "flex-col" : "flex-row justify-start"} items-center mb-3`}>
          {itemArr.map((item, i) => (
            <div
              key={i}
              className="w-[948px] h-[28px] flex items-center  text-[14px] px-2"
            >
              <input
                id="default-checkbox"
                type="checkbox"
                className="w-[10px] h-[10px] text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-[16px] ml-2">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Checbox</span>
          {/* <Image
            src="/circlecross.png"
            height={20}
            width={20}
            alt="crosscircle"
            className="cursor-pointer"
            onClick={() => {
              setChartItem((prevState) => {
                const newEntries = chartItem.entries.filter(
                  (item, idx) => index != idx
                );
                return {
                  ...chartItem,
                  entries: newEntries,
                };
              });
            }}
          /> */}
        </div>

        <div className="w-[973px] py-2 flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Name</h3>
            <input
              type="text"
              placeholder="Checkbox name"
              name="checkBox"
              value={checkBox}
              onChange={(event) => setCheckBox(event.target.value)}
              className="h-[24px] w-[948px] px-5 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>
          <div className="w-[948px] flex flex-col items-start p-2">
            <span className="">Checkbox Layout</span>
            <div className="w-[948px] flex justify-start items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-[10px] w-[10px] checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
                  name={positon}
                  value="horizontal"
                  onChange={(event) => setPostion(event.target.value)}
                />
                <span className="text-[14px] text-[#5B5B5B] ml-2">
                  Horizontal
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-[10px] w-[10px] checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
                  name={positon}
                  value="vertical"
                  onChange={(event) => setPostion(event.target.value)}
                />
                <span className="text-[14px] text-[#5B5B5B] ml-2">
                  Vertical
                </span>
              </div>
            </div>
          </div>
          <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
            <span className="text-white text-[14px] font-bold">
              Settings of Check Box
            </span>
            <div className="flex items-center">
              <BsPlus
                onClick={() => setShowInput(!showInput)}
                className="text-2xl text-white cursor-pointer mr-2"
              />
              <BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
            </div>
          </div>

          {showInput && (
            <input
              type="text"
              placeholder="Add items"
              value={takeInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-[948px] p-2 outline-none border-[.5px] border-gray-300 px-2"
            />
          )}
          <div className="w-[948px] px-2 flex flex-col items-center mt-2">
            {itemArr.map((item, i) => (
              <div
                key={i}
                className="w-[948px] h-[28px] flex justify-between items-center border-[.5px] text-[14px] border-gray-300 px-2"
              >
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-[10px] h-[10px] text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-[16px] ml-2">{item.name}</span>
                </div>
                <MdDelete onClick={() => deleteItem(item.id)}
                  className="text-[20px] text-[#FF0000]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartChecklist;
