import React from "react";

const headItems = [
  {
    id: 1,
    title: "Basic Info",
  },
  {
    id: 2,
    title: "Practitioner",
  },
  {
    id: 3,
    title: "Service",
  },
];
const Userprofileheader = (props) => {
  return (
    <React.Fragment>
      <div className="flex justify-start items-center border-b-2 border-gray-300 p-2">
        {headItems.map((item) => (
          <span
            onClick={() => props.setProfileHead(item.id)}
            key={item.id}
            className={`text-[20px] ml-5 ${
              props.profileHead === item.id
                ? "bg-[#19525A] text-white"
                : "text-[#5B5B5B]"
            } px-5 rounded-md cursor-pointer`}
          >
            {item.title}
          </span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Userprofileheader;
