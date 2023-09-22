import React from 'react';
import staff from '../../../assets/Staff.jpg'
import Staff from '../../Dashboard/Staffs/Staffs';
import Image from 'next/image';
const Unlimited = () => {
  return (
    <div>
      <div className=" min-h-screen bg-base-100">
  <div className="hero-content flex-col lg:flex-row space-x-32 -mt-20">
   <div className='w-[40%]'> <Image  src={staff} alt='pp'/></div>
    <div className='mt-4 '>
      <h1 className="text-3xl font-bold">Unlimited <span className='text-[#176D79]'>Staff</span> <br />
      and customizable <br /> <span className='text-[#176D79]'>permissions</span></h1>
     
      <p className="py-6">This feature allows organizations to efficiently manage <br /> their team members' access to sensitive information <br /> and resources, ensuring that only authorized personnel <br /> can access them. Additionally, it provides flexibility in <br /> assigning roles and responsibilities within your organization.</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Unlimited;