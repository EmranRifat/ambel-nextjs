import React, { useEffect } from "react";
import { useState } from "react";
import { BiCheck, BiChevronDown, BiSearch } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";

const MultiSelectDropdown = ({
  items,
  selectedList,
  onSelectedItem,
  itemName = "Item",
  disabled = false,
  onClick = () => { },
  loadingItems = false,
  width = "100%",
  height = "40px",
  borderColor = "border-gray-300",
  practitionerError,
  branchError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = React.useRef();
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    setNewItems(items);
    // console.log(items);
  }, [items]);

  const filterItems = (event) => {
    var pnItems = items.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setNewItems(pnItems);
  };

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
          } text-[16px] ${selectedList?.length == 0
            ? "text-[#5B5B5BB2] bg-white"
            : "text-black bg-white"
          } rounded-lg truncate focus:ring-2 focus:ring-[#19525A8C] flex justify-between w-full h-full pl-[14px] pr-2 items-center ${practitionerError && 'border-red-500'} ${branchError && 'border-red-500'}`}
        type="button"
      >
        {selectedList?.length > 0
          ? selectedList?.length + " " + itemName + " Selected"
          : "Select " + itemName}
        <BiChevronDown className="text-2xl ml-1 text-[#5B5B5B]" />
      </button>
      {isOpen && (
        <div
          style={{ width: width }}
          className="relative mb-4 z-10 w-full rounded divide-y divide-gray-100 shadow-md"
        >
          <div className="bg-white p-1">
            <div className="rounded-[4px] border-[0.5px] hover:border-[#19525A] flex justify-start items-center">
              <BiSearch className="ml-1" />
              <input
                className="w-full h-7 outline-none  rounded-[4px] px-2 mx-auto text-sm text-gray-700"
                type="text"
                autoFocus
                id="myInput"
                placeholder="Find staffs by name"
                onKeyUp={filterItems}
              />
            </div>
          </div>
          <div className="bg-[#19525A]">
            {newItems?.length > 0 ? (
              newItems.map((item, i) => {
                return (
                  <label
                    key={item.id}
                    className={`p-2 w-full ${selectedList.includes(item.id) ? "bg-[#0089C9]" : ""
                      } flex items-center gap-2 text-white cursor-pointer hover:bg-[#0089C9]`}
                  >
                    <input
                      type={"checkbox"}
                      className="h-[18px] w-[18px] border-[1px] border-[#ffffff] rounded-md outline-1"
                      checked={
                        selectedList.includes(item.id)
                      }
                      onChange={(event) => {
                        onSelectedItem(item.id);
                      }}
                    />
                    {item.name}
                  </label>
                );
              })
            ) : loadingItems ? (
              <div className="flex items-center justify-center">
                <PulseLoader color="#ffffff" size={8} />
              </div>
            ) : (
              <p className="text-white px-2">
                No {itemName.toLowerCase()} found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
