import React, { useState } from "react";
import Dropdown from "../../Dropdown";

const VerifyMethod = ({ setVerification }) => {
  const [method, setMethod] = useState("Government issue ID");
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
        <span className="text-[#5B5B5B] text-[32px]">Verification Method</span>
      </div>
      <div className="p-3">
        <p className="text-[#5B5B5B] text-[16px]">
          Please select method from the dropdown to verify your identity. This
          information is used for personal verification only and any of your
          data and related question and their answers aren’t share with your
          client and any non governmental organization. To learn more please
          visit the <span className="text-[#0075FF]">verification center.</span>
        </p>
      </div>
      <div className="w-full fle flex-col px-4 items-start mt-3">
        <span className="text-[#5B5B5B] text-[16px]">
          Select a method to verify Identity
        </span>
        <div className="w-full mt-2">
          <Dropdown
            width={"538px"}
            items={["Government issue ID", "Visual Verification"]}
            selected={method}
            onSelected={(selected) => {
              setMethod(selected);
              setVerification((prevState) => {
                return { ...prevState, method: selected };
              });
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyMethod;
