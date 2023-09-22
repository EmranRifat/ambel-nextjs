import React from "react";
import Image from "next/image";
import { MdOutlineHistory } from "react-icons/md";
import HistoryTableTabInfo from "./HistoryTableInfo";
import { BsThreeDotsVertical } from "react-icons/bs";

const historyTableTabHead = [
  {
    id: "1",
    name: "Date",
  },
  {
    id: "2",
    name: "Time",
  },
  {
    id: "3",
    name: "Action",
  },
];
export default function HistoryInfo() {
  return (
    <div>
      <div className="bg-[#efefef] rounded-[4px] mt-2 h-[580px] overflow-y-scroll">
        <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80]">
          <div className="flex my-auto">
            <MdOutlineHistory className="my-auto mx-2 text-3xl text-[#19525A]" />
            <h1 className="text-[20px] font-medium text-[#5b5b5b] my-[10px]">History</h1>
          </div>
        </div>
        <div className="w-full bg-[#efefef] rounded ">
          <table className="w-full">
            <thead className="border-b-[0.5px] border-[#5b5b5b73]">
              {/* <tr className="border-b "> */}
              {historyTableTabHead.map((tableHead) => (
                <th key={tableHead.id} className="px-3 py-1 text-base font-medium text-left text-[#5b5b5b]">
                  {tableHead.name}
                </th>
              ))}
              {/* </tr> */}
            </thead>
            <tbody>
              {HistoryTableTabInfo.map((info) => (
                <tr key={info.id}>
                  <td className="text-[14px] text-[#5b5b5b] w-[100px] p-3">{info.date}</td>
                  <td className="text-[14px] text-[#5b5b5b] w-[110px] p-3">{info.time}</td>
                  <td className="text-[14px] p-3 ">
                    <div className="flex  w-full justify-start">
                      <p className="flex text-[#5b5b5b] text-[14px]">{info.action}</p>
                      <span className="flex text-[#06B6D4] text-[14px] ml-1">{info.actionby}</span>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
