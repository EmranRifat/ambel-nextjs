import React from 'react';
import pc from "../../../assets/Group.jpg";
import dash from "../../../assets/Dashboard.jpg";
import inven from "../../../assets/inven.jpg";

import Image from 'next/image';

const Secure = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-100 flex justify-center">
  <div className="hero-content flex-col lg:flex-row-reverse -mt-[40%]	">
   <div className='w-[40%]'> <Image  src={pc} alt='pp'/></div>
    <div className='mt-4 pr-20 '>
      <h1 className="text-3xl font-bold">Secure and encrypted <br />
   <span  className='text-[#176D79]'>data transmission and <br />
  checkout</span></h1>
     
      <p className="py-6">These features are essential  for ensuring the protection of sensitive <br /> information; such as credit card details and personal data. <br /> Implementing robust security measures can help build trust with <br /> customers and enhance the reputation of online businesses as <br /> well as HIPAA, PIPEDA, and GDPR-compliant</p>
    </div>
  </div>
</div>


{/* another Sections */}



<div className=" bg-base-100">
  <div className="hero-content flex-col lg:flex-row space-x-32 -mt-[20%]">
   <div className='w-[40%]'> <Image  src={dash} alt='pp'/></div>
    <div className='mt-4 '>
      <h1 className="text-3xl font-bold">A powerful <span  className='text-[#176D79]'>dashboard </span><br />
with real-time <span  className='text-[#176D79]'>data</span> <br />
<span  className='text-[#176D79]'>visualization</span></h1>
     
      <p className="py-6">This dashboard can help businesses make informed decisions <br /> quickly and efficiently, as it provides a clear and concise overview <br /> of key metrics and trends. With real-time data visualization, users <br /> can easily identify patterns and insights that might otherwise go <br /> unnoticed.</p>
    </div>
  </div>
</div>



{/* inventory stctions */}
<div className='  '>
<div className='mt-[10%] text-center'>
      <h1 className="text-3xl font-bold">Online Shop and <br />
Inventory Management</h1>
     
      <p className="py-6">Our Online Shop and Inventory Management system is designed to streamline <br />
      your e-commerce operations by providing a user-friendly platform for customers 
      </p>
    </div>
    <div className='w-[40%] ml-[30%]'> <Image  src={inven} alt='pp'/></div>

</div>


{/* card section */}


<div>
<div className='mt-20  pl-14'>
      <h1 className="text-3xl font-bold ">Our Customer Feedback</h1>
     
      <p className="">Don’t take our word for it. Trust our customers </p>
    </div>


</div>




    </div>
  );
};

export default Secure;