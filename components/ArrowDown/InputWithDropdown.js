import React, { useEffect } from "react";
import { useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";

const InputWithDropdown = ({
  items,
  selected,
  onSelected,
  disabled = false,
  onClick = () => { },
  loadingItems = false,
  width = "100%",
  height = "40px",
  borderColor = "border-gray-300",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = React.useRef();
  const [newItems, setNewItems] = useState(items);

  useEffect(() => {
    setNewItems(items);
  }, [items]);

  const filterItems = (event) => {
    var pnItems = items.filter((item) => {
      return item.toLowerCase().includes(event.target.value.toLowerCase());
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

          } text-[16px] ${selected &&
            (selected?.toString().includes("Select") ||
              selected?.toString().includes("Start") ||
              selected?.toString().includes("End"))
            ? "text-[#5B5B5BB2] bg-white"

            : "text-black bg-white"

          } rounded-lg truncate focus:ring-2 focus:ring-[#19525A8C] flex justify-between w-full h-full pl-[14px] pr-2 items-center`}
        type="button"
      >
        <input
          type="text"
          placeholder="Enter class name"
          value={selected}
          id="myInput"
          onKeyUp={filterItems}
          onChange={(e) => onSelected(e.target.value)}
          className="outline-none w-full" />
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
            {newItems?.length > 0 ? (
              newItems.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => {
                        onSelected(item);
                        setIsOpen(false);
                      }}
                      className={`block py-2 pr-2 pl-1 text-[14px] cursor-pointer ${item === selected ? "bg-[#0089C9]" : ""
                        } text-white hover:bg-[rgb(0,137,201)]`}
                    >
                      <div className="flex justify-start overflow-hidden items-center text-start">
                        <div className="pr-2 w-6">
                          {item === selected && <BiCheck size={25} />}
                        </div>
                        {item}
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

export default InputWithDropdown;
