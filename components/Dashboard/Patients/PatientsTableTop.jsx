import React, {useState} from 'react'
import { BiChevronDown } from 'react-icons/bi';

const PatientsTableTop = () => {
    const [open, setOpen] = useState(false)
  return (
    <>
      <div className=" w-full flex justify-between items-center px-4">
        <div className="flex">
          <button
            onClick={() => setOpen(!open)}
            className="flex text-black items-center border-2 border-gray-500 rounded-3xl px-5 py-2 hover:ring-1"
          >
            Last 7 days
            <BiChevronDown />
          </button>
        </div>
        {open && (
          <div className="z-10  right-14 absolute md:top-[23%] bg-white divide-y divide-gray-100 rounded shadow w-44 ">
            <ul
              className="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last 7 days
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last month
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last year
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default PatientsTableTop