import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

export const Doctors = ({ doctor }) => {
  return (
    <div className='flex w-full flex-col md:flex-row items-center'>
     
      <div className='md:w-4/6 flex'>
        <div className='flex flex-col items-center '>
          <div>
            <Image
              src={doctor.user.profile_pic}
              height={100}
              width={100}
              alt="doctor"
              className='rounded-full'
            />
          </div>
          <div className='mt-2 text-[15px] font-medium'>
            <span className='text-[#10B982]'>{doctor.user.isAvailable ? 'Available' : 'Unavailable'}</span>
            <div className='flex items-center'><AiFillStar className='text-yellow-400 mr-1 w-5 h-5' /><span className='text-[#282828]'>{doctor.rating}</span></div>
          </div>
        </div>
        <div className='md:ml-5 ml-3 w-full'>
          <div className='flex items-center'>
            <h1 className='md:text-3xl text-xl mr-3'>{doctor.user.name}</h1>
            <Image
              src='/home/doctors/calender.svg'
              height={23}
              width={23}
              alt="calender"
            />
            <p className='text-[#282828] text-sm md:text-base'>({doctor.completed} Completed)</p>
          </div>
          <p className='text-[#585858] text-sm md:text-lg'>{doctor.degres}</p>
          <div className='text-[#585858] text-sm md:text-lg  pt-2'>
            <span>
              Work on
              <span className='text-[#0372BA] ml-2'>{doctor.institution}</span>
            </span>
          </div>
          <div className='flex justify-between flex-wrap mt-3 md:mt-5'>
            <div className='flex items-center mb-2'>
              <Image
                src='/home/doctors/Cardiologist.svg'
                height={23}
                width={23}
                alt="Cardiologist"
              />
              <p className='text-[#CA0024] ml-2 text-sm md:text-lg'>{doctor.working_on}</p>
            </div>
            <div className='flex items-center mb-2'>
              <Image
                src='/home/doctors/map.svg'
                height={23}
                width={23}
                alt="map"
              />
              <p className='text-[#585858] ml-2 text-sm md:text-lg'>{doctor.location}</p>
            </div>
            <div className='flex items-center mb-2'>
              <Image
                src='/home/doctors/dollar.svg'
                height={23}
                width={23}
                alt="dollar"
              />
              <p className='text-[#585858] ml-1 text-sm md:text-lg'>{doctor.price}/Hour</p>
            </div>
          </div>
        </div>
      </div>
      <div className='md:w-2/6 w-full md:mt-0 mt-5 md:ml-10 flex flex-row md:flex-col justify-end md:items-center md:mx-auto'>
        <button
          type="submit"
          className="text-white bg-[#003F48] hover:bg-[#012227] rounded-lg text-sm  sm:w-auto px-5 md:py-2.5 py-2 text-center">Appointment</button>

        <button
          type="submit"
          className="text-white md:mt-3 ml-3 md:ml-0 bg-emerald-500 hover:bg-emerald-800  rounded-lg text-sm px-10 sm:w-auto md:py-2.5 py-2  text-center">Details</button>

      </div>
    </div>
  );
}