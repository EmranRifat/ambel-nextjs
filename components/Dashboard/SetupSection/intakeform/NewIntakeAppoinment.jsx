import React from "react";

const NewIntakeAppoinment = (props) => {
  const { data, setdata } = props;
  const handleChange = (e) => {
    setdata(e.target.name);
  };
  return (
    <>
      <div className="bg-white flex flex-col rounded-md shadow-md mt-2">
        {/* div1 */}
        <div className="flex flex-col p-4">
          <span className="text-[#5B5B5B] text-[28px]">Appointment type</span>
          <span className="text-[#0D0D0D] text-[20px] mt-5">
            This intake form will be required for
          </span>
        </div>

        {/* radio button div */}
        <div className="w-full flex justify-between items-center px-5 py-8">
          <div className="flex items-center">
            <input
              type="radio"
              className="h-5 w-5 checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
              name="All appointment"
              checked={data === "All appointment"}
              onChange={handleChange}
            />
            <span className="text-[18px] text-[#5B5B5B] ml-3">
              All appointment
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="h-5 w-5 checked:bg-[#01261C] cursor-pointer accent-[#19525A]"
              checked={data === "A specific discipline"}
              name="A specific discipline"
              onChange={handleChange}
            />
            <span className="text-[18px] text-[#5B5B5B] ml-3">
              A specific discipline
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="h-5 w-5 checked:bg-[#01261C] cursor-pointer  accent-[#19525A]"
              name="A specific staff member"
              checked={data === "A specific staff member"}
              onChange={handleChange}
            />
            <span className="text-[18px] text-[#5B5B5B] ml-3">
              A specific staff member
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="h-5 w-5 checked:bg-[#01261C] cursor-pointer accent-[#19525A]"
              name="A specific treatment"
              checked={data === "A specific treatment"}
              onChange={handleChange}
            />
            <span className="text-[18px] text-[#5B5B5B] ml-3">
              A specific treatment
            </span>
          </div>
        </div>
        <div className="w-full px-8">
          <span className="text-[#195947] text-[20px]">
            Next, configure profile fields...
          </span>
        </div>
        {/* div3 */}
        <div className="w-full flex justify-end items-end px-3 py-5">
          <button className="w-[122px] h-[49px] text-[20px] text-[#5B5B5B] border-2 border-gray-500 bg-white rounded-[8px] mr-4">
            Cancel
          </button>
          <button
            className="w-[194px] h-[49px] text-[20px] bg-[#1A535B] rounded-[8px] text-white"
            onClick={() => {
              localStorage.setItem(
                "newIntakeAppointment",
                JSON.stringify(data)
              );
              props.handleNext("Appointment type");
            }}
          >
            Save And Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewIntakeAppoinment;
