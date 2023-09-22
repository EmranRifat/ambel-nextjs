/* eslint-disable react/jsx-key */
import Link from 'next/link';
import React from 'react';
import {
  MdOutlineCases,
  MdHeadphones,
  MdGroups,
  MdReviews
} from 'react-icons/md';
import { RiInformationFill, RiDiscussLine } from 'react-icons/ri';
import { SiBloglovin } from 'react-icons/si';

const ResourceDropdown = () => {
  return (
    <>
      <div
        className={`md:group-hover:block group-hover:block hidden lg:shadow border-b-2 bg-white rounded-md lg:absolute lg:top-28 lg:left-[40%] text-gray-800 pt-1`}
      >
        <div className="flex flex-col lg:flex-row p-3">
          <div className="p-1">
            <div className="flex items-center p-2">
              <span className="text-xl font-bold text-[#14C38E] ml-2 lg:border-b-2 border-[#14C38E]">
                News
              </span>
            </div>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <SiBloglovin className="bg-[#B8FFF9] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Blogs
                </span>
              </a>
            </Link>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <MdOutlineCases className="bg-[#D1D1D1] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Case study
                </span>
              </a>
            </Link>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <MdGroups className="bg-[#C1F8CF] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Community
                </span>
              </a>
            </Link>
          </div>
          <div className="p-1">
            <div className="flex items-center p-2">
              <span className="text-xl font-bold text-[#14C38E] ml-2 lg:border-b-2 border-[#14C38E]">
                Know more
              </span>
            </div>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <RiInformationFill className="bg-[#EF9F9F] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  About us
                </span>
              </a>
            </Link>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <MdHeadphones className="bg-[#D1D1D1] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Contact us
                </span>
              </a>
            </Link>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <RiDiscussLine className="bg-[#EA99D5] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Careers
                </span>
              </a>
            </Link>
            <Link href="#">
              <a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
                <MdReviews className="bg-[#D9D7F1] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
                <span className="ml-2 text-md font-medium text-gray-800">
                  Reviews
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceDropdown;
