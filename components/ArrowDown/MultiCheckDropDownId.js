import React, { useEffect } from "react";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";

const MultiSelectDropDownId = ({
  items,
  selected,
  onSelected,
  disabled = false,
  onClick = () => { },
  loadingItems = false,
  width = "100%",
  height = "40px",
  borderColor = "border-gray-300",
  placeHolder = "Select Option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = React.useRef();
  const [newItems, setNewItems] = useState(items);

  useEffect(() => {
    setNewItems(items);
  }, [items]);

  const filterItems = (event) => {
    var pnItems = items.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setNewItems(pnItems);
  };

  const selectedItemName = (
    items.find((item) => item.id == selected) ?? {
      name: placeHolder,
      id: "select",
    }
  ).name;

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    // @ts-ignore
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setIsOpen(false);
      setNewItems(items);
    }
  };

  return (
    <div
      ref={dropdown}
      className="shadow-sm w-full"
      style={{ width: width, height: height }}
    >
      <button
        onClick={
          disabled
            ? () => { }
            : () => {
              if (!isOpen) {
                onClick();
              }
              setNewItems(items);
              setIsOpen(!isOpen);
            }
        }
        className={`border h-${height} ${borderColor} ${disabled && "cursor-not-allowed"
          } text-[16px] ${(selectedItemName &&
            (selectedItemName?.toString()?.includes("Select") ||
              selectedItemName?.toString()?.includes("Start") ||
              selectedItemName?.toString()?.includes("End"))) ||
            selectedItemName?.toString() == placeHolder
            ? "text-[#5B5B5BB2] bg-white"
            : "text-black bg-white"
          } rounded-lg truncate focus:ring-2 focus:ring-[#19525A8C] flex justify-between w-full h-full pl-[14px] pr-2 items-center`}
        type="button"
      >
        {selectedItemName}
        <BiChevronDown className="text-2xl ml-1 text-[#5B5B5B]" />
      </button>
      {isOpen && (
        <div
          style={{ width: width }}
          className="relative mb-4 z-10 w-full bg-[#19525A] rounded divide-y divide-gray-100 shadow"
        >
          <ul
            className="py-1 max-h-[200px] overflow-y-auto text-sm text-gray-700"
            aria-labelledby="all"
          >
            {/* <input
              className="w-0 h-0 outline-none text-[0px] absolute"
              type="text"
              autoFocus
              id="myInput"
              onKeyUp={filterItems}
            /> */}

            {newItems?.length > 0 ? (
              newItems.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => {
                        onSelected(item.id);
                        setIsOpen(false);
                      }}
                      style={height ? { height: height } : {}}
                      className={`block py-2 pr-2 pl-1 text-[14px] cursor-pointer ${item.id === selected ? "bg-[#0089C9]" : ""
                        } overflow-hidden whitespace-nowrap text-white hover:bg-[rgb(0,137,201)]`}
                    >
                      <div className="h-full text-[14px] flex justify-start overflow-hidden items-center text-start">
                        <div className="pr-2 w-6">
                          {item.id === selected && <BiCheck />}
                        </div>
                        {item.name}
                      </div>
                    </a>
                  </li>
                );
              })
            ) : loadingItems ? (
              <div className="flex items-center justify-center">
                <PulseLoader color="#ffffff" size={8} />
              </div>
            ) : (
              <p className="text-white px-2">No items found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropDownId;
