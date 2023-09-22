import React from "react";
import TypeList from "./TypeList";

export default function DropDownFileType(props) {
  const [open, setOpen] = React.useState(false);
  const taskDeadlineRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      taskDeadlineRef.current &&
      // @ts-ignore
      !taskDeadlineRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-start rounded-[4px]">
        <button
          ref={taskDeadlineRef}
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          onClick={(_) => setOpen(!open)}
          className="text-gray-600 bg-white font-sm focus:ring-2 focus:outline-none focus:ring-sky-500 rounded-[8px]  border-[0.5px] border-[#19525A80] w-[120px] h-[32px] text-center inline-flex items-center"
          type="button"
        >
          <div className="flex justify-between mx-2">
            <p className="text-[#5b5b5b] text-[14px] my-auto">Type</p>
            <svg
              className="w-[14px] ml-[60px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </button>
        {open && (
          <div className="z-10 absolute bg-white divide-y mt-10 divide-gray-100 rounded shadow w-44">
            <ul
              className="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownDefault"
            >
              {TypeList.map((item) => (
                <li key={item.id} onClick={(_) => setOpen(false)}>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    {item.typeName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
