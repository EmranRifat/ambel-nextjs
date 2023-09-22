import React from "react";

const FilterAllDepartment = (props) => {
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
      <div className="flex justify-start bg-white rounded-xl">
        <button
          ref={taskDeadlineRef}
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          onClick={(_) => setOpen(!open)}
          className="text-gray-600 text-[12px] focus:ring-2 focus:outline-none focus:ring-sky-500 rounded-xl border-2 px-4 py-1 text-center inline-flex items-center"
          type="button"
        >
          All Department
          <svg
            className="w-4 h-4 ml-2"
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
        </button>
        {open && (
          <div className="z-10 absolute bg-white divide-y mt-10 divide-gray-100 rounded shadow w-44">
            <ul
              className="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownDefault"
            >
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Anatomy
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Anatomy
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Medicine
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Neuromedicine
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Physical Medicine
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Paediatric Surgery
                </a>
              </li>
              <li onClick={(_) => setOpen(false)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Othopedic Surgery
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FilterAllDepartment;
