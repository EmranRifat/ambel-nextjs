import React from 'react'

const headerItems = [
  {
    id: 1,
    title: "Description",
  },
  {
    id: 2,
    title: "Information",
  },
  {
    id: 3,
    title: "Work History",
  },
  {
    id: 4,
    title: "Achievements",
  },
  {
    id: 5,
    title: "Feedback",
  },
];
const ProfessionalDetailsHeader = (props) => {

  return (
    <>
      <div className="w-[720px] h-[32px] flex justify-around items-center bg-[#E6E6E6] rounded-md mt-5">
        {headerItems.map((item) => (
          <button onClick={()=> props.setClickedID(item.id)} key={item.id} className={`text-[16px] text-[#5B5B5B] px-2 rounded-sm ${props.clickedID === item.id ?"bg-[#ffff]":"none"}`}>
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
}

export default ProfessionalDetailsHeader