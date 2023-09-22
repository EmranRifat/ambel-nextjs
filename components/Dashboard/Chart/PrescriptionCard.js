import { BsPin, BsStar, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image"
import phone from "./phone.svg";
import { useState } from "react";
import PrescriptionForm from "./PrescriptionForm";

const PrescriptionCard = (props) => {
  const [openPrescriptionFormFor, setOpenPrescriptionFormFor] = useState(Array(props.prescriptionList.length).fill(false))

  return (<>
    {props.prescriptionList.map((item, index) => {
      return (
        openPrescriptionFormFor[index] ? (<PrescriptionForm new={false} close={() => {
          setOpenPrescriptionFormFor(Array(props.prescriptionList.length).fill(false))
        }} />) :
          (<div
            key={index}
            className="w-full flex flex-col mt-4 shadow-md rounded-[8px]"
            onDoubleClick={() => {
              props.setIsAddNewPrescriptionOpen(false)
              const newArr = Array(props.prescriptionList.length).fill(false);
              newArr[index] = true
              // console.log(newArr);
              setOpenPrescriptionFormFor(newArr)
            }}
          // onClick={() => {
          //   console.log("hello from prescription card")
          // }}
          >
            {/* top */}
            <div className="w-full flex justify-between bg-[#F3920066]/20 rounded-t-[8px] p-1">
              <div className="flex px-5">
                <p className="text-[20px] text-[#090909] font-bold mr-[20px]">
                  Md. Tazul Islam
                  <span className="text-[14px] font-[400] ml-10">
                    January 10, 2023
                  </span>
                </p>
                <Image src={phone} width={20} height={20} />
              </div>
              <div>
                <div className="flex items-center mt-1">
                  <BsPin className="text-xl text-[#19525A] cursor-pointer mr-3" />
                  <BsStar className="text-xl text-[#FF0000] cursor-pointer mr-3" />
                  <BsThreeDotsVertical className="text-xl text-[#5B5B5B] cursor-pointer mr-3" />
                </div>
              </div>
            </div>
            {/* bottom */}
            <div className="w-full flex flex-col px-5 py-5 rounded-[8px]">
              <h3 className="text-[16px] text-[#090909] font-bold">
                {item?.user?.fullName ?? "Medical Template"}
              </h3>
              <p className="text-[14px] text-[#090909] rounded-[8px]">
                Charting details and description. Charting details and
                description.Charting details and description Charting details
                and description .Charting details and description Charting
                details and description Charting details and description
              </p>
            </div>
          </div>)
      );
    })}
  </>
  )
}

export default PrescriptionCard