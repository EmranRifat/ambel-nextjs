import React from "react";

const infos = [
  {
    title: "Name",
    detail: "Md. Tazul Islam",
  },
  {
    title: "Qualification",
    detail: "MBBS, FRCS, MSBC (UK)",
  },
  {
    title: "Specialized on",
    detail: "Eye, Nose, Ear",
  },
  {
    title: "Phone number",
    detail: "+8801687771913",
  },
  {
    title: "Email",
    detail: "ttazulislam96@gmail.com",
  },
  {
    title: "Location",
    detail: "Gulshan 1, Near Hazi mosque, Dhaka, Bangladesh",
  },
  {
    title: "Consulatnt Fee",
    detail: "$100/hr (+5% Vat)",
  },
  {
    title: "Consultant Time",
    detail: "M9:00 AM to 6:00 PM (EST)",
  },
  {
    title: "Availability",
    detail: "4 Days in a week, Friday, Satureday and Sunday off",
  },
];
const ProfessionalInformation = () => {
  return (
    <>
      <div className="w-[720px] h-[450px] border-[1px] shadow-md p-5 flex flex-col">
        {infos.map((info, i) => (
          <p key={i} className="text-[14px] text-[#5B5B5B] mt-2">
            {info.title} :  
            <span
              className={`ml-5 ${
                info.title === "location" ? "text-[#0372BA]" : "text-[#5B5B5B]"
              }`}
            >
              {info.detail}
            </span>
          </p>
        ))}
      </div>
    </>
  );
};

export default ProfessionalInformation;
