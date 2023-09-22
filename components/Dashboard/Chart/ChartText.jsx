import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const ChartText = ({ setChartItem, chartItem, index }) => {
  const [text, setText] = useState("");
  const config = useMemo(
    () => ({
      minHeight: 300,
      maxHeight: 400,
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: "Start typings...",
    }),
    []
  );

  return (
    <React.Fragment>
      <div className="p-5 w-full flex flex-col">
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="py-1 text-lg mt-5"
        />
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-[16px]">Text</span>
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
        {typeof window !== "undefined" && (
          // @ts-ignore
          <JoditEditor
            // value={selectedFormat.body || ""}
            config={config}
            // onBlur={(newContent) => setNotice(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setText(newContent)
              setChartItem(() => {
                const newEntries = chartItem.entries.map((item, idx) => {
                  if (idx == index) {
                    return {
                      ...item,
                      type: "text",
                      text: newContent,
                    };
                  }
                  return item;
                });
                return {
                  ...chartItem,
                  entries: newEntries,
                };
              })
            }
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ChartText;
