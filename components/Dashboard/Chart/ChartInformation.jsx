// @ts-nocheck
import Image from "next/image";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    // [{ script: "sub" }, { script: "super" }],
    // ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const ChartInformation = ({
  setChartItem,
  chartItem,
  index
}) => {
  const [information, setInformation] = useState("");
  return (
    <React.Fragment>
      <div className="w-full h-[250px] p-5 flex flex-col">
        <div
          dangerouslySetInnerHTML={{ __html: information }}
          className="py-1 text-lg mt-5"
        />
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Information</span>
          <Image
            src="/circlecross.png"
            height={20}
            width={20}
            alt="crosscircle"
            className="cursor-pointer"
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
        <ReactQuill
          modules={modules}
          theme="snow"
          placeholder="Write your Information..."
          style={{ height: "116px" }}
          onChange={(content) => {
            setInformation(content)
            setChartItem((prevState) => {
              const newEntries = chartItem.entries.map((item, idx) => {
                if (idx == index) {
                  return {
                    ...item,
                    type: "info",
                    heading: content,
                  };
                }
                return item;
              });
              return {
                ...chartItem,
                entries: newEntries,
              };
            });
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default ChartInformation;
