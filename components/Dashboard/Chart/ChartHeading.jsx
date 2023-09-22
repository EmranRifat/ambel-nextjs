// @ts-nocheck
import Image from "next/image";
import React from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video", "table"],
    ["clean"],
  ],
};
const ChartHeading = ({ setChartItem, chartItem, index }) => {
  const [heading, setHeading] = React.useState("");
  return (
    <React.Fragment>
      <div className="w-full h-[250px] p-5 flex flex-col">
        <div
          dangerouslySetInnerHTML={{ __html: heading }}
          className="py-1 text-3xl"
        />
        <div className="w-full flex justify-between items-center mb-3">

          <span className="text-[16px]">Heading</span>
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
          placeholder="Write your heading..."
          style={{ height: "116px" }}
          onChange={(content) => {
            setHeading(content);
            setChartItem((prevState) => {
              const newEntries = chartItem.entries.map((item, idx) => {
                if (idx == index) {
                  return {
                    ...item,
                    type: "heading",
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

export default ChartHeading;
