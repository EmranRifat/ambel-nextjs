import Image from 'next/image'
import React from 'react'

const data = [
  {
    id: 1,
    name: "First Name",
    req: true,
  },
  {
    id: 2,
    name: "Last Name",
    req: true,
  },
  {
    id: 3,
    name: "Email",
    req: true,
  },
  {
    id: 4,
    name: "Phone Number",
    req: true,
  },
  {
    id: 5,
    name: "Office Phone Number",
    req: false,
  },
  {
    id: 6,
    name: "Social Security Number",
    req: false,
  },
  {
    id: 7,
    name: "Gurdian Name",
    req: false,
  },
];

const level = [
  {
    id: 1,
    lev: "Low",
  },
  {
    id: 2,
    lev: "Medium Low",
  },
  {
    id: 3,
    lev: "Medium",
  },
  {
    id: 4,
    lev: "High",
  },
];
const IntakeHeaderModal = (props) => {
  return (
    <React.Fragment>
      <div className="h-[1800px] w-[1000px] bg-white flex flex-col">
        <div
          onClick={() => { props.setPreview(false) }} className="w-full flex justify-end p-4">
          <Image src="/blackcross.png" height={17} width={15} alt="cross" />
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-[48px] text-black">Intake form Header</span>
        </div>
        <div className="w-full bg-[#5B5B5B] h-[.1px] mt-10"></div>

        {/* date and powered by */}
        <div className="w-full flex justify-between items-center mt-10 px-10">
          <p className="text-[#5B5B5B] text-[14px]">
            <span className="text-[20px] font-bold">Health History </span>{" "}
            provided by Mount Adora Hospital
          </p>
          <p className="text-[#5B5B5B] text-[20px]">
            <span className="text-[18px] font-bold">Date : </span> 11.8.22
          </p>
        </div>

        {/* description */}
        <div className="w-full flex flex-col px-10 mt-8">
          <span className="text-[20px] text-[#5B5B5B] font-bold">
            Description
          </span>
          <p className="text-[#5B5B5B] text-[14px] mt-2">
            Whatever written in the description box. Whatever written in the
            description box. Whatever written in the description box. Whatever
            written in the description box. Whatever written in the description
            box.
          </p>
        </div>

        {/* fields */}
        <div className="w-full flex flex-col px-10 mt-12">
          <span className="text-[#5B5B5B] text-[20px] font-bold">
            Please kindly fill Up the fields
          </span>

          {data.map((dat) => (
            <div
              key={dat.id}
              className="w-full flex justify-between items-center mt-5"
            >
              <h3 className="text-[16px]">
                {dat.name}
                {dat.req ? (
                  <span className="text-rose-600 text-[18px]">*</span>
                ) : (
                  ""
                )}
              </h3>
              <input
                type="text"
                className="h-[40px] w-[609px] outline-none border-[.5px] border-[#19525A80] shadow-md rounded-md px-3"
              />
            </div>
          ))}
        </div>

        {/* questionaries and describe form */}
        <div className="w-full flex flex-col px-10 mt-16">
          <span className="text-[#5B5B5B] text-[20px] font-bold">
            Please kindly fill Up this questioneries
          </span>

          <div className="w-full flex flex-col justify-start items-start mt-5">
            <h3 className="text-[16px]">
              Describe your problem <span className="text-[#FF0000]">*</span>
            </h3>
            <textarea className="p-2 text-[18px] h-[148px] w-[918px] outline-none border-[.5px] border-[#19525A80] shadow-md rounded-md" />
          </div>

          {/* the level of pain */}
          <div className="flex flex-col mt-10">
            <h3>
              The level of your pain
              <span className="text-[16px] text-[#FF0000]">*</span>
            </h3>
            <div className="flex items-center">
              {level.map((levl) => (
                <div key={levl.id} className="flex items-center mt-3 ml-5">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-[20x] h-[20px] text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-[16px] text-[#5B5B5B] ml-3">
                    {levl.lev}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* this form is under something..... */}
        <div className="w-full flex flex-col mt-10">
          <div className="w-full px-10 border-b-[.01px] border-[#7676764D] p-2">
            <span className="text-[20px] text-[#5B5B5B] font-bold">
              This form is under those constant
            </span>
          </div>
          <div className="w-full px-10 flex flex-col border-b-[.01px] border-[#7676764D] p-5">
            <span className="text-[20px] text-[#5B5B5B] font-bold">
              Constant Name:
            </span>
            <span className="text-[14px] text-[#5B5B5B]">
              Privacy Policy act 2022
            </span>
          </div>
          <div className="w-full px-10 flex flex-col border-b-[.01px] border-[#7676764D] p-5">
            <span className="text-[20px] text-[#5B5B5B] font-bold">
              Description
            </span>
            <span className="text-[14px] text-[#5B5B5B]">
              This is the description section. In publishing and graphic design,
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface without relying on
              meaningful content. Lorem ipsum may be used as a placeholder
              before final copy is available
            </span>
          </div>

          <div className="w-full px-10 flex justify-between border-b-[.01px] border-[#7676764D] p-5">
            <span className="text-[20px] text-[#5B5B5B] font-bold">
              Disagree Option
            </span>
            <div className="flex">
              <div className="flex items-center mt-3 ml-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-[20x] h-[20px] text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-[16px] text-[#5B5B5B] ml-3">Agree</span>
              </div>
              <div className="flex items-center mt-3 ml-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-[20x] h-[20px] text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-[16px] text-[#5B5B5B] ml-3">
                  Disagree
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-10 flex justify-between items-center border-b-[.01px] border-[#7676764D] p-5">
            <span className="text-[20px] text-[#5B5B5B] font-bold">
              Signature
            </span>
            <label className="w-[201px] h-[40px] text-[20px] border-[.5px] border-[#19525A80] px-3 py-2 flex flex-col items-center bg-white rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white">
              <span className="text-[18px] text-[#5B5B5BB2] leading-normal">
                Upload signature
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* signature... */}

          <div className="w-full px-10 flex justify-between mt-5 py-8">
            <div className="flex flex-col items-center">
              <div className="h-[.1px] w-[160px] bg-[#19525A]"></div>
              <span className="text-[14px] text-[#5B5B5B]">Signature</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[.1px] w-[160px] bg-[#19525A]"></div>
              <span className="text-[14px] text-[#5B5B5B]">Signature</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IntakeHeaderModal