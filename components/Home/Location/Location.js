import Image from 'next/image';
import React from 'react';
import map from "../../../assets/Location.png"
const Location = () => {
  return (
    <div>
<div className="hero min-h-screen bg-base-100 gap-12  ">
  <div className="hero-content flex-col lg:flex-row-reverse -mt-22">
    <div className='w-[40%] ml-32'><Image  src={map}  alt='map'/></div>
    <div>
      <h1 className="text-4xl font-bold">Your brand , in one <br />
      <span className='text-[#176D79]'> easy-to-use</span> system, <br />
       across <span className='text-[#176D79]'>all your locations</span></h1>
      <p className="py-6">Give customers a consistent brand experience,<br /> online and in person. With one source for all your <br /> business information, you'll unify your guest data, <br />
      business operations, marketing efforts, and more.</p>
    </div>
  </div>
</div>    
</div>
  );
};

export default Location;