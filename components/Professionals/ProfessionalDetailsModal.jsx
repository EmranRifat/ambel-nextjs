import React from "react";
import { useState } from "react";
import ProfessionalAchivement from "./ProfessionalAchivement";
import ProfessionalDescription from "./ProfessionalDescription";
import ProfessionalDetails from "./ProfessionalDetails";
import ProfessionalDetailsHeader from "./ProfessionalDetailsHeader";
import ProfessionalFeedback from "./ProfessionalFeedback";
import ProfessionalInformation from "./ProfessionalInformation";
import ProfessionalWorkHistory from "./ProfessionalWorkHistory";
import { AiOutlineClose } from "react-icons/ai";

const ProfessionalDetailsModal = (props) => {
  const [clickedID, setClickedID] = useState(1);
  return (
    <>
      <div className="max-w-[760px] lg:min-w-[760px] h-[800px] absolute top-10 left-[30%] flex flex-col items-center bg-white rounded-md">
        <div className="w-full flex justify-end px-2">
          <span
            onClick={() => props.setOpenDetailsModal(false)}
            className="text-[25px] p-2 text-[#5B5B5B] cursor-pointer"
          >
          <AiOutlineClose></AiOutlineClose>
          </span>
        </div>
        <ProfessionalDetails />
        <ProfessionalDetailsHeader
          clickedID={clickedID}
          setClickedID={setClickedID}
        />
        {clickedID === 1 && <ProfessionalDescription />}
        {clickedID === 2 && <ProfessionalInformation />}
        {clickedID === 3 && <ProfessionalWorkHistory />}
        {clickedID === 4 && <ProfessionalAchivement />}
        {clickedID === 5 && <ProfessionalFeedback />}
      </div>
    </>
  );
};

export default ProfessionalDetailsModal;
