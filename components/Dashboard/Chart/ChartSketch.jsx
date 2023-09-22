import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { createRef } from "react";
import { FaPaintBrush, FaEraser } from "react-icons/fa";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChartSketch = ({ setChartItem, chartItem, index }) => {
  const canvas1Ref = createRef();
  const canvas2Ref = createRef();

  const handleClick = (isEraser, canvasRef) => () => {
    canvasRef.current?.eraseMode(isEraser);
  };
  const styles = {
    widht: "948px",
    border: "0.2px solid #9c9c9c",
    background: "#F0F4FF",
  };
  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">File Upload</span>
          <Image
            src="/circlecross.png"
            height={20}
            width={20}
            alt="crosscircle"
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
        <div className="w-[973px] h-[582px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
          <div className="w-[948px] flex flex-col mt-3 py-2">
            <h3 className="text-[16px]">Description</h3>
            <textarea
              placeholder="Write the file description"
              className="h-[64px] w-[948px] px-2 py-1 outline-none border-[.5px] border-[#19525A80] rounded-sm"
            />
          </div>

          <div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
            <span className="text-white text-[14px] font-bold">
              Settings of Sketch
            </span>
            <BsThreeDotsVertical className="text-xl text-white cursor-pointer mr-3" />
          </div>

          <div className="w-[520px] h-[400px] mt-5 flex justify-center">
            <ReactSketchCanvas
              ref={canvas1Ref}
              style={styles}
              strokeWidth={4}
              strokeColor="black"
              height="420"
              className="bg-gray-700"
            />
          </div>
          <div className="w-[948px] h-[24px] justify-center items-center gap-10 flex border-[.5px] border-gray-300 mt-3">
            <div className="flex items-center gap-5">
              <p className="text-[12px]">H 450</p>
              <p className="text-[12px]">W 520</p>
            </div>
            <button type="button" onClick={handleClick(false, canvas1Ref)}>
              <FaPaintBrush className="text-[16px]" />
            </button>
            <button type="button" onClick={handleClick(true, canvas1Ref)}>
              <FaEraser className="text-[16px]" />
            </button>
            <button
              className="text-[14px]"
              onClick={() => canvas1Ref.current?.resetCanvas()}
            >
              Clear
            </button>
            <button
              className="text-[14px]"
              onClick={() => {
                canvas1Ref.current.redo();
              }}
            >
              Redo
            </button>
            <button
              className="text-[14px]"
              onClick={() => {
                canvas1Ref.current.undo();
              }}
            >
              Undo
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChartSketch;
