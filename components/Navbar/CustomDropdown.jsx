import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

export const CustomDropdown1 = ({ child, title }) => {
  const [isOpen, changeOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-col group mb-3 lg:mb-0 py-2 lg:pt-0 lg:pb-0"
        onClick={() => {
          changeOpen((prevState) => !prevState);
        }}
      >
        <li
          className="text-[#595959] hover:text-gray-900"
        >
          <p className="flex items-center font-normal cursor-pointer dropdown">
            {title}
            {isOpen ? <BiChevronUp className='w-5 h-6 group-hover:rotate-180 group-hover:transition-transform	group-hover:duration-700' /> : <BiChevronDown className='w-5 h-6' />}
          </p>
        </li>
        {isOpen ? child : <></>}
      </div>
    </>
  );
};

export const CustomDropdown2 = ({ title }) => {
  return (
    <>
      <div
        className="flex flex-col group mb-2 lg:mb-0 py-2 lg:pt-0 lg:pb-0 "
      >
        <li
          className="text-[#595959] hover:text-gray-900"
        >
          <p className="flex items-center font-normal cursor-pointer dropdown">
            {title}
          </p>
        </li>
      </div>
    </>
  );
};

