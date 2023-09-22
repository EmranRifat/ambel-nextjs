import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import CaseTableTabInfo from "./CaseTableTabInfo";
import Image from 'next/image'
import m1 from './Images/m1.svg'
import m2 from './Images/m2.svg'
import m3 from './Images/m3.svg'
import c1 from "./Images/case1.svg";
import c2 from "./Images/case2.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlPrinter } from "react-icons/sl";


const caseTableTabHead = [
  {
    id: "1",
    name: "Name",
  },
  {
    id: "2",
    name: "Date",
  },
  {
    id: "3",
    name: "Appointment",
  },
  {
    id: "4",
    name: "Staff",
  },
  {
    id: "5",
    name: "Solution",
  },
  {
    id: "6",
    name: "Document",
  },
];

export default function CaseInfo() {
  const [caseDrop, setCaseDrop] = useState(false);
  const [editDrop, setEditDrop] = useState(false);
  const [documentDrop, setDocumentDrop] = useState(false);
  const [id, setId] = useState(-1);

  return (
    <>
      <div className="h-[600px]">
        {/* Running case */}
        <div className="bg-[#efefef] rounded-[4px] mt-2">
          <div className="bg-[#efefef] rounded-[4px] mt-2">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex pl-3">
              <Image
                src={c2}
                width="30px"
                height="30px"
                className="my-auto text-2xl text-[#19525A]"
                alt="This is a icon"
              />
              <h1 className="text-[20px] font-medium my-3 ml-2 text-[#5b5b5b]">Running Case</h1>
            </div>
          </div>
          <div className="w-full bg-[#efefef] h-[210px] overflow-y-scroll">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {caseTableTabHead.map((tableHead) => (
                  <th key={tableHead.id} className="px-3 py-1 text-base font-medium text-[#5b5b5b] text-left">
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody>
                {CaseTableTabInfo.map((info, index) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3 text-orange-400">{info.case}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.appoinment}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm p-3 ">
                      {(info.solution === 'Prescription') && <p className="text-[#0089C9]">{info.solution}</p>}
                      {(info.solution === 'Chart') && <p className="text-[#00ADD3]">{info.solution}</p>}
                      {(info.solution === 'Document') && <p className="text-[#0015CD]">{info.solution}</p>}
                      {(info.solution === '  -  ') && <p className="text-[#5b5b5b] mx-5">{info.solution}</p>}
                    </td>
                    <td className="text-sm px-3 py-1">
                      <div className="flex justify-between w-full">
                        <div className="flex text-[#5b5b5b]">{info.documents}</div>
                        <BsThreeDotsVertical
                          onClick={() => {
                            setId(index);
                            setEditDrop((event) => {
                              return !event;
                            });
                          }}
                          className="text-2xl ml-auto mr-[6px]"
                        />
                        <div className="relative">
                          {(editDrop === true && id === index) && (
                            <div
                              id="dropdownDots"
                              className="z-20  absolute -right-[10px] top-4 rounded-[4px] w-[155px] h-[94px]"
                            >
                              <div className="flex w-full ml-[122px]">
                                <div
                                  className="w-0 h-0 
                               border-l-[5px] border-l-transparent
                               border-b-[10px] border-b-white
                               border-r-[5px] border-r-transparent shadow-left shadow-right"
                                >
                                </div>
                              </div>
                              <div className=" bg-white shadow rounded">
                                <button className="px-3 py-[8px] text-[14px] hover:bg-gray-200 text-[#5b5b5b] w-full text-left">Mark as Completed</button>
                                <button className="px-3 py-[8px] text-[14px] hover:bg-gray-200 text-[#5b5b5b] w-full text-left">Download Files</button>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compete Case */}
        <div className="bg-[#efefef] rounded-[4px]">
          <div className="bg-[#efefef] rounded-[4px] mt-3">
            <div className="bg-[#D0E5DB] h-[50px] rounded-[4px] border-[0.5px] border-[#19525A80] flex pl-3">
              <Image
                src={c1}
                width="30px"
                height="30px"
                className="my-auto text-2xl text-[#19525A]"
                alt="This is a icon"
              />
              <h1 className="text-[20px] text-[#5b5b5b] my-3 ml-2">Compelete Case</h1>
              <BsThreeDotsVertical
                onClick={() => {
                  setCaseDrop((event) => {
                    return !event;
                  });
                }}
                className="text-2xl ml-auto my-auto mr-[18px]"
              />
              <div className="relative">
                {caseDrop === true && (
                  <div
                    id="dropdownDots"
                    className="z-10  absolute -right-[32px] top-7 rounded-[4px] w-[140px] h-[140px]"
                  >
                    <div className="flex w-full ml-[73px]">
                      <div
                        className="w-0 h-0 
                      border-l-[5px] border-l-transparent
                      border-b-[10px] border-b-white
                      border-r-[5px] border-r-transparent shadow-left shadow-right"
                      >
                      </div>
                    </div>
                    <div className=" bg-white shadow rounded-[4px]">
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <SlPrinter className="text-[14px] text-black my-auto" /> <p className="text-[14px] my-auto text-[#5b5b5b] ml-[6px]">Print</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m1} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px] text-[#5b5b5b] my-auto ml-[6px]">Export As PDF</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m3} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p><p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As CSV</p></button>
                      <button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <p className="my-auto"> <Image src={m2} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As XLS</p></button>

                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
          <div className="w-full bg-[#efefef] rounded-[4px] h-[255px] overflow-y-scroll relative">
            <table className="w-full">
              <thead className="border-b-[0.5px] border-[#5b5b5b73]">
                {/* <tr className="border-b "> */}
                {caseTableTabHead.map((tableHead) => (
                  <th key={tableHead.id} className="px-3 py-1 font-medium text-[#5b5b5b] text-base text-left">
                    {tableHead.name}
                  </th>
                ))}
                {/* </tr> */}
              </thead>
              <tbody>
                {CaseTableTabInfo.map((info, index) => (
                  <tr key={info.id}>
                    <td className="text-sm p-3 text-lime-600">{info.case}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.date}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.appoinment}</td>
                    <td className="text-sm p-3 text-[#5b5b5b]">{info.staff}</td>
                    <td className="text-sm p-3 ">
                      {(info.solution === 'Prescription') && <p className="text-[#0089C9]">{info.solution}</p>}
                      {(info.solution === 'Chart') && <p className="text-[#00ADD3]">{info.solution}</p>}
                      {(info.solution === 'Document') && <p className="text-[#0015CD]">{info.solution}</p>}
                      {(info.solution === '  -  ') && <p className="text-[#5b5b5b] mx-5">{info.solution}</p>}
                    </td>
                    <td className="text-sm  px-3 py-1">
                      <div className="flex relative justify-between w-full">

                        <div className=" text-[#5b5b5b] mr-auto">{info.documents}</div>
                        <BsThreeDotsVertical
                          onClick={() => {
                            setId(index)
                            setDocumentDrop((event) => {
                              return !event;
                            });
                          }}
                          className="text-2xl ml-auto mr-[8px]"
                        />
                        {(documentDrop === true && id === index) && (
                          <div
                            id="dropdownDots"
                            className="z-50  absolute -right-[2px] top-4 rounded-[4px] w-[125px] h-[49px] overflow-visible"
                          >
                            <div className="flex w-full ml-[99px]">
                              <div
                                className="w-0 h-0 
                               border-l-[5px] border-l-transparent
                               border-b-[10px] border-b-white
                               border-r-[5px] border-r-transparent shadow-left shadow-right"
                              >
                              </div>
                            </div>
                            <div className=" bg-white shadow rounded">
                              <button className="px-3 py-2 text-[14px] hover:bg-gray-200 text-[#5b5b5b] w-full text-left">Download Files</button>

                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
