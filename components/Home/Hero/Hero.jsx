import Image from 'next/image';
import React from 'react';
import heroImage from './heroImage.png';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import heroimg from '../../../assets/Hero Section.jpg'

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-50 to-white  md:pt-20">
      <div className="w-[92%] lg:w-[90%]   xl:py-[4%] mx-auto">
        <div className="items-center justify-center md:flex">
          <div className="w-full lg:w-[50%]">
            <h1 className="text-[#282828] leading-[2.5rem] text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl  sm:leading-[3.2rem] md:leading-[3.3rem] lg:leading-[4rem] font-semibold">
            Looking for a <br />
            Professional and <br />
             Business Solution?
              {/* <span className='text-[#10B982]'>
                Supportive Service {}
              </span> */}
            </h1>
            <p className="py-4  md:text-[16px] w-[70%] text-[#595959]">
            Ambel makes it easy for your business to schedule <br /> appointments, meetings, bookkeeping, and emailing. <br /> This all-in-one technology combines all of your <br /> business's requirements into a single platform.
            </p>
            <div className='mt-6 flex'>
              <button className="px-5 md:px-7 text-sm md:text-lg py-2 md:py-3 text-white transition-colors duration-200 transform bg-[#003F48] hover:bg-[#13262e] rounded-md">
               Start Free Trial
              </button>
              <button className="px-5 py-2.5 md:py-3 text-sm md:text-lg flex text-white transition-colors duration-200 transform bg-[#F87316] hover:bg-[#d36212] ml-3 rounded-md">
                <MdOutlineSlowMotionVideo className='w-5 h-5 md:mt-[2px] md:w-6 md:h-6 mr-2 ' />  Watch
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center w-[800px] h-[400px]   md:mt-0 lg:mt-0 md:h-0  lg:w-[45%]">
            <Image
              src={heroimg}
             
              alt="doctor"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
