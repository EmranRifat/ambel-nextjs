import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../../../assets/Rectangle 729.png';
import { useRef } from 'react';
import Image from 'next/image';
const Carousel = () => {
  const ref=useRef()
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:false,
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
          }
      },
      {
          breakpoint: 968,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
          }
      },
      {
          breakpoint: 640,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          }
      },
  ]
  };
  const numbers  =[1,2,3,4,5,6]
  // console.log(ref);
  return (
    <div className='relative'>
     
    <div className=" absolute flex justify-between transform -translate-y-1/2 left-1 right-5  top-28">
      <a onClick={()=>
// @ts-ignore
     ref?.current?.slickPrev()} href="#slide4" className="btn btn-[#EAEAEA] btn-sm	btn-circle">❮</a> 
      <a onClick={()=>
// @ts-ignore
     ref?.current?.slickNext()} href="#slide2" className="btn btn-circle btn-sm">❯</a>
    </div>




     <Slider className='w-[90%] left-14  flex mt-8' ref={ref} {...settings}>
     
    

{
  numbers.map(num=>
 <div key={num} className='px-5'>
 <div className='flex justify-center items-center h-[250px] px-5   border-2 rounded-md shrink-1  ' >
 
 <div className='flex justify-between pt-2'>
 <Image className='w-10' src={logo} alt="pp" />
 
 <div className="rating rating-md rating-half mt-6">
  <input type="radio" name="rating-10" className="rating-hidden" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" checked />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-orange-100 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-orange-100 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-orange-100 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-orange-100 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-orange-100 mask mask-star-2 mask-half-2" />
</div>

 </div>
 <div className='space-y-2 pt-2'>
  <h2 className='font-bold f text-xl	'>Floyd Miles</h2>
  <p className=''>Lawyer, Bangladesh</p>
  <p className='text-xs'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
 </div>


  </div>
 </div>
 
 )
}




     </Slider>
    </div>
  );
};

export default Carousel;