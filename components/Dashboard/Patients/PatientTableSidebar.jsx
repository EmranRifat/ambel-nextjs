import React from 'react'


const patients = [
  {
    id: 1,
    patient: 'All patients'
  },
  {
    id: 2,
    patient: 'Top patients'
  },
   {
        id:3,
        patient:"New patients"
    },
     {
        id:4,
        patient:"Old patients"
    },

];
const PatientTableSidebar = () => {
  return (
    <>
      <div className="hidden md:w-[10%] md:block border-r-2">
        <div className="bg-white divide-y divide-gray-100 rounded ">
          <ul className=" text-gray-700" aria-labelledby="dropdownDefault">
            {patients.map((pat) => (
              <li className="border-b-2 text-left mt-2" key={pat.id}>
                <a href="#" className="block p-1  text-lg hover:bg-gray-100">
                  {pat.patient}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PatientTableSidebar