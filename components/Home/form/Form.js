import Image from 'next/image';
import React from 'react';
import logo1 from '../../../assets/Group 1000002410.jpg'
import { MdPersonOutline } from "react-icons/Md";
import { CiMail } from "react-icons/Ci";
import { FaSuitcase } from "react-icons/Fa";
import { AiOutlinePhone } from "react-icons/Ai";
import { GoLocation } from "react-icons/Go";
import { BsPeople } from "react-icons/Bs";

const Form = () => {
  return (
    <div>
      <div className="hero min-h-screen mt-16 ">
  <div className="hero-content lg:flex ">
    <div className="text-center mr-28 lg:text-left">
      <h1 className="text-4xl font-bold">Get A <span className='text-[#10B982]'>Free Trial</span></h1>
      <p className="py-6">Your success is our goal. To get your solution just <br /> right, here's what you will get</p>

<div className='space-y-8'>
<div className='flex space-x-4 '>
  <Image src={logo1} alt="" />
  <p>You will get a free trial for 30 Days trial with <br /> no obligation to continue.</p>
</div>
<div className='flex space-x-4'>
  <Image src={logo1} alt="" />
  <p>You will get a free trial for 30 Days trial with <br /> no obligation to continue.</p>
</div>
<div className='flex space-x-4'>
  <Image src={logo1} alt="" />
  <p>You will get a free trial for 30 Days trial with <br /> no obligation to continue.</p>
</div>

</div>


    </div>
    <div className="card   border-2 bg-base-100 ">
      <div className="card-body">

        <p className='text-[#FF5555]'>Request A demo</p>
          <h2 className='font-bold text-2xl'>Request your Customized demo</h2>


      <div className='lg:flex space-x-4'>
      <div className="form-control relative ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder= "Devid Jhon" className="input input-bordered    placeholder:px-4 " />
          <MdPersonOutline className='absolute mt-12 ml-2  text-gray-500 '></MdPersonOutline>

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="info@yourmail.com" className="input placeholder:px-4  input-bordered" />
          <CiMail className='absolute mt-12 ml-2  text-gray-500 '></CiMail>
        </div>
      </div>
      <div className='flex space-x-4'>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input type="text" placeholder="+ 123 456 789" className="input input-bordered placeholder:px-4  " />
          <AiOutlinePhone className='absolute mt-12 ml-2  text-gray-500 '></AiOutlinePhone>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Business Name</span>
          </label>
          <input type="text" placeholder="Your company name " className="input input-bordered placeholder:px-4  " />
          <FaSuitcase className='absolute mt-12 ml-2  text-gray-500 '></FaSuitcase>
        </div>
      </div>
      <div className='flex space-x-4'>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Business type</span>
          </label>
          <input type="text" placeholder="Your company name " className="input input-bordered placeholder:px-4 " />
          <FaSuitcase className='absolute mt-12 ml-2  text-gray-500 '></FaSuitcase>

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Number Of Locations</span>
          </label>
          <input type="text" placeholder="Enter the number of branch" className="input input-bordered placeholder:px-4  " />
          <GoLocation className='absolute mt-12 ml-2  text-gray-500 '></GoLocation>

        </div>
      </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Number Of Practitioner</span>
          </label>
          <input type="text" placeholder="Number of Practitioner " className="input input-bordered placeholder:px-4  " />
          <BsPeople className='absolute mt-12 ml-2  text-gray-500 '></BsPeople>

        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#19525A]">Book A Demo </button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Form;