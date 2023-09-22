import Image from "next/image";
import React from "react";

const histores = [
  {
    id: 1,
    desc: "Works  at Dhaka Mecial College, 2017- Present",
  },
  {
    id: 2,
    desc: "Works  at Medlife clinic, 2016- Present",
  },
  {
    id: 3,
    desc: "Works  at Popular medical college, 2011- 2016",
  },
  {
    id: 4,
    desc: "Works  at Daily Care Clinic, 2009-200116",
  },
  {
    id: 5,
    desc: "Owner at Daily Care Clinic, 2001-2009",
  },
];
const ProfessionalWorkHistory = () => {
  return (
    <>
      <div className="w-[720px] h-[450px] border-[1px] shadow-md p-5 flex flex-col">
        {histores.map((history) => (
          <div key={history.id} className="flex items-center mt-3">
            <Image
              src="/icons/workhistory.png"
              height={20}
              width={24}
              alt="history"
            />
            <span className="ml-3 text-[14px] text-[#5B5B5B]">
              {history.desc}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfessionalWorkHistory;
