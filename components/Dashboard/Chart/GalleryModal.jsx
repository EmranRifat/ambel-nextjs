import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const GalleryModal = ({ setGallery }) => {
  const imageName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,];
  const [gallryOrLibray, setGalleryOrLibrary] = useState("gallery");
  return (
    <React.Fragment>
      <div className="w-[500px] h-[410px] bg-white flex flex-col mt-40 rounded-md">
        <div className="w-full flex justify-between items-center rounded-md">
          <div
            onClick={() => setGalleryOrLibrary("gallery")}
            className={`w-full h-[21px] flex items-center justify-center text-[10px] border-[.5px] cursor-pointer border-gray-400 ${
              gallryOrLibray == "gallery"
                ? "bg-[#19525A] text-white"
                : "bg-[#19525A1A]"
            } `}
          >
            My Gallery
          </div>
          <div
            onClick={() => setGalleryOrLibrary("library")}
            className={`w-full h-[21px] flex items-center justify-center text-[10px] border-[.5px] cursor-pointer border-gray-400 ${
              gallryOrLibray == "library"
                ? "bg-[#19525A] text-white"
                : "bg-[#19525A1A]"
            }`}
          >
            Library
          </div>
        </div>

        <div className="w-full flex items-center justify-between border-[.5px] border-gray-400 px-2 rounded-b-md shadow-sm">
          <input
            type="text"
            placeholder="Search...."
            className="outline-none w-[300px] px-2"
          />
          <BiSearch />
        </div>

        <div className="w-full flex justify-start gap-2 flex-wrap items-center p-2 mt-2 overflow-y-auto">
          {imageName.map((imgName) => (
            <div
              key={imgName}
              className="h-[90px] w-[72px] rounded-md border-[.5px] border-gray-300 flex flex-col items-center"
            >
              <div className="h-[80px] w-[72px] border-b-[.5px] border-gray-400"></div>
              <span className="text-[10px]">Image name</span>
            </div>
          ))}
        </div>
        <div className="w-full border-t-[.5px] border-gray-400 flex justify-end items-center gap-4">
          <button className="w-[56px] h-[20px] text-[10px] border-[.5px] border-gray-300 mt-2 rounded-md">
            Remove
          </button>
          <button className="w-[56px] h-[20px] text-[10px] border-[.5px] border-gray-300 mr-4 mt-2 rounded-md bg-[#19525A] text-white">
            Import
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GalleryModal;
