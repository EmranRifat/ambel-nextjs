import React, { useState } from "react";

const NewIntakeHeader = ({ eleActive, setEleActive }) => {
  return (
    <>
      <div className="w-full mt-2 px-4">
        <ul className="w-full flex justify-between items-center text-[20px] text-[#195947]">
          <li
            onClick={() => setEleActive("General")}
            className={`cursor-pointer px-4 py-3 rounded-md ${
              eleActive === "General" ? "bg-[#C4DBCC] " : "none"
            } `}
          >
            General
          </li>
          <li
            onClick={() => setEleActive("Appointment type")}
            className={`cursor-pointer px-4 py-3 rounded-md ${
              eleActive === "Appointment type" ? "bg-[#C4DBCC] " : "none"
            } `}
          >
            Appointment type
          </li>
          <li
            onClick={() => setEleActive("Profile fields")}
            className={`cursor-pointer px-4 py-3 rounded-md ${
              eleActive === "Profile fields" ? "bg-[#C4DBCC] " : "none"
            } `}
          >
            Profile fields
          </li>
          <li
            onClick={() => setEleActive("Questionaries")}
            className={`cursor-pointer px-4 py-3 rounded-md ${
              eleActive === "Questionaries" ? "bg-[#C4DBCC] " : "none"
            } `}
          >
            Questionaries
          </li>
          <li
            onClick={() => setEleActive("Consents")}
            className={`cursor-pointer px-4 py-3 rounded-md ${
              eleActive === "Consents" ? "bg-[#C4DBCC] " : "none"
            } `}
          >
            Consents
          </li>
        </ul>
      </div>
    </>
  );
};

export default NewIntakeHeader;
