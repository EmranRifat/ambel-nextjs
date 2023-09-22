import Image from "next/image";
import React from "react";

const ProfessionalAchivement = () => {
  return (
    <>
      <div className="w-[720px] h-[450px] border-[1px] shadow-md p-5 flex flex-col">
        <div>
          <Image
            src="/icons/achivement.png"
            height={24}
            width="20px"
            alt="achivement"
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalAchivement;
