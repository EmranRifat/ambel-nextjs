import React from "react";

const profileElements = [
  {text:"FirstName", value:"firstName"},
  {text:"LastName", value:"lastName"},
  {text:"Email", value:"email"},
  {text:"Preffered name", value:"prefferedName"},
  {text:"Prefix", value:"prefix"},
  {text:"Home phone", value:"homePhone"},
  {text:"Mobile phone", value:"mobilePhone"},
  {text:"Work phone", value:"workPhone"},
  {text:"Fax phone", value:"faxPhone"},
  {text:"Address", value:"address"},
  {text:"Date of birth", value:"dateOfBirth"},
  {text:"Gender", value:"gender"},
  {text:"Social Security number", value:"socialSecurityNumber"},
  {text:"Personal health number", value:"personalHealthNumber"},
  {text:"Gurdian", value:"gurdian"},
  {text:"Emergency contact", value:"emergencyContact"}
];


const NewIntakeProfile = (props) => {
  const { data, setdata } = props;
  const handleChange = (e) => {
    const { name, checked } = e.target;
    const [field, type] = name.split("-");
    setdata((prev) => {
      return {
        ...prev,
        [field]: {
          ...prev[field],
          [type]: checked,
        },
      };
    });
  };

  return (
    <>
      <div className="w-full pb-10 ">
        <div className="bg-white flex flex-col mt-2 shadow-lg rounded-md">
          <div className="border-b-[2px] border-gray-300 px-8 py-4">
            <span className="text-[18px] text-[#0D0D0D]">
              Select the fields you want to be filled out
            </span>
          </div>
          <div className="border-b-[2px] border-gray-300 px-8 py-6 flex justify-between">
            <span className="text-[20px] text-[#0D0D0D]  font-[500]">
              Fields
            </span>
            <div className="flex justify-between w-[35%]">
              <span className="text-[20px] text-[#0D0D0D]  font-[500]">
                Include in intake
              </span>
              <span className="text-[20px] text-[#0D0D0D]  font-[500]">
                Required
              </span>
            </div>
          </div>
          {profileElements.map((proEle) => (
            <div
              key={proEle.value}
              className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300"
            >
              <span className="text-[16px] text-[#5B5B5B]">{proEle.text}</span>
              <div className="flex justify-between w-[35%] px-10">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={proEle.value}
                  name={proEle.value + "-" + "include"}
                  className="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}
                  checked={data[proEle.value]?.include}
                />
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={proEle.value}
                  name={proEle.value + "-" + "required"}
                  checked={data[proEle.value]?.required}
                  
                  className="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}

                />
              </div>
            </div>
          ))}
          <div className="w-full px-8 py-4 mt-5">
            <span className="text-[#195947] text-[20px]">
              Next, Questionaries...
            </span>
          </div>
          <div className="w-full flex justify-end items-end px-3 py-5">
            <button className="w-[122px] h-[49px] text-[20px] text-[#5B5B5B] border-2 border-gray-500 bg-white rounded-[8px] mr-4">
              Cancel
            </button>
            <button
              className="w-[194px] h-[49px] text-[20px] bg-[#1A535B] rounded-[8px] text-white"
              onClick={() => {
                localStorage.setItem("newIntakeProfile", JSON.stringify(data));
                props.handleNext("Profile fields")
              }}
            >
              Save and Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewIntakeProfile;
