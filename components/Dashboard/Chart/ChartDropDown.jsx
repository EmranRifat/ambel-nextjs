import Image from "next/image";
import React, { useState } from "react";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "../../Dropdown";
import { MdDelete } from "react-icons/md";
import DropdownWithId from "../../Dropdown/DropDownId";

const ChartDropDown = ({ chartItem, setChartItem, index }) => {
  const [showInput, setShowInput] = useState(false);
  const [takeInput, setTakeInput] = useState("");
  const [itemArr, setItemArr] = useState([]);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("")

  const handleChange = (event) => {
    setTakeInput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      setItemArr([...itemArr, { id: itemArr.length + 1, name: takeInput }]);
      setChartItem((prevState) => {
        const newEntries = chartItem.entries.map((item, idx) => {
          if (idx == index) {
            return {
              ...item,
              data: {
                ...item.data,
                listItem: [...item.data.listItem, takeInput],
              },
            };
          }
          return item;
        });
        return {
          ...chartItem,
          entries: newEntries,
        };
      });
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

  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <h3>{name}</h3>
        {
          itemArr.length > 0 &&
          <div className="w-[948px] mt-5">
            <DropdownWithId
              items={itemArr}
              selected={""}
              onSelected={(selected) => {
                // onChangeValue({
                //   target: {
                //     name: "playList",
                //     value: selected,
                //   },
                // });
              }}
              placeHolder={prompt}
              width={"960px"}
            />
          </div>
        }
        <div className="w-full flex justify-between items-center mb-2 mt-8">
          <span className="text-[16px]">Dropdown</span>
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

        {/* smart options deails.... */}
        <div className="w-[973px] pb-5 flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Name</h3>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-[24px] w-[948px] px-3 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Prompt</h3>
            <input
              type="text"
              placeholder="Select a option"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="h-[24px] w-[948px] px-3 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
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
                <span className="text-[16px]">{item.name}</span>
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

export default ChartDropDown;
