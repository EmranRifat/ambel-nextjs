import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {

  const footer = [
    {
      id: 1,
      heading: 'For Customers',
      items: [
        { text: 'Find a Practitioner', link: '/' },
        { text: 'Book an Appointment', link: '/' },
        { text: 'Make Payment', link: '/' },
        { text: 'Live Consultant', link: '/' },
        { text: 'Refund ', link: '/' },
        { text: 'Shop ', link: '/' },
        { text: 'Resources', link: '/' },
      ]
    },
    {
      id: 2,
      heading: 'For Practitioners',
      items: [
        { text: 'Profile Setup', link: '/' },
        { text: 'Organization Setup', link: '/' },
        { text: 'Collaboration', link: '/' },
        { text: 'Withdraw', link: '/' },
        { text: 'Pay Staff', link: '/' },
        { text: 'QR Code', link: '/' },
        { text: 'Booking page', link: '/' },
        { text: 'Business Tools', link: '/' },
      ]
    },

    {
      id: 4,
      heading: 'Resources',
      items: [
        { text: 'Plans', link: '/' },
        { text: 'Blog', link: '/' },
        { text: 'FAQ', link: '/' },
        { text: 'Reviews', link: '/' },
        { text: 'Refund & Return', link: '/' },
        { text: 'Documentations', link: '/' },
        { text: 'Road Map', link: '/' },
      ]
    },
    {
      id: 5,
      heading: 'Company',
      items: [
        { text: 'About US', link: '/' },
        { text: 'Contact Us', link: '/' },
        { text: 'Career', link: '/' },
        { text: 'Support Center', link: '/' },
        { text: 'Affiliate Program', link: '/' },
        { text: 'Trust and Safety', link: '/' },
      ]
    },

  ];

  return (
    <footer className="bg-[#19525A] relative mt-32">
      <div className="max-w-screen-xl px-4 pb-7 pt-16 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-20 lg:justify-center ">
          {footer.map((item) => {
            return <div key={item.id} className="col-span-6 mx-4 sm:mx-8 lg:mx-12 mb-10 sm:col-span-1 ">
              <p className="font-bold hover:border-b-2 mb-4 hover:border-b-white text-white">{item.heading}</p>
              {/* <div className='w-28 h-[2px] bg-gray-700 my-2  '></div> */}
              <nav className="flex flex-col w-[140px]  space-y-4 text-sm text-gray-300">
                {item.items.map((item, i) => {
                  return <Link
                    key={i}
                    href={item.link}>
                    <a className="inline-block  hover:border-l-gray-400 hover:border-l-2 hover:pl-2 hover:text-white">
                      {item.text}
                    </a>
                  </Link>
                })}
              </nav>
            </div>
          })}
        </div>


        <div className="pb-2 hidden md:flex  md:w-auto col-span-2 items-center space-x-4 text-white lg:col-span-6">
          <h3>Follow Us</h3>




          <Link href="/">
            <a className="hover:opacity-75 hover:text-white">
              <span className="sr-only"> Twitter </span>
              <FaTwitter className="w-4 h-4 md:w-10 md:h-10 " />
            </a>
          </Link>
          <Link href="/">
            <a className="hover:opacity-75 hover:text-white">
              <span className="sr-only"> Facebook </span>
              <FaFacebook className="w-4 h-4 md:w-10 md:h-10 " />
            </a>
          </Link>
          <Link href="/">
            <a className="hover:opacity-75 hover:text-white">
              <span className="sr-only"> Instagram </span>
              <FaInstagram className="w-4 h-4 md:w-10 md:h-10 " />
            </a>
          </Link>

          <Link href="/">
            <a className="hover:opacity-75 hover:text-white">
              <span className="sr-only"> GitHub </span>
              <FaGithub className="w-6 h-4 md:w-10 md:h-10 " />
            </a>
          </Link>
          <Link href="/">
            <a className="hover:opacity-75 hover:text-white">
              <span className="sr-only"> Dribbble </span>
              <FaDribbble className="w-4 h-4 md:w-10 md:h-10 " />
            </a>
          </Link>
        </div>





        <div className="pt-8 md:inline-flex md:justify-between w-full text-white mt-12 border-t border-white/10">




          <div className="pb-2 w-full md:w-auto flex md:hidden col-span-2 items-center justify-center space-x-4 ">
            <Link href="/">
              <a className="opacity-75 text-white">
                <span className="sr-only"> Facebook </span>
                <FaFacebook className="w-6 h-6 md:w-10 md:h-10 " />
              </a>
            </Link>
            <Link href="/">
              <a className="hover:opacity-75 hover:text-white">
                <span className="sr-only"> Instagram </span>
                <FaInstagram className="w-6 h-6 md:w-10 md:h-10 " />
              </a>
            </Link>
            <Link href="/">
              <a className="hover:opacity-75 hover:text-white">
                <span className="sr-only"> Twitter </span>
                <FaTwitter className="w-6 h-6 md:w-10 md:h-10 " />
              </a>
            </Link>
            <Link href="/">
              <a className="hover:opacity-75 hover:text-white">
                <span className="sr-only"> GitHub </span>
                <FaGithub className="w-6 h-6 md:w-10 md:h-10 " />
              </a>
            </Link>
            <Link href="/">
              <a className="hover:opacity-75 hover:text-white">
                <span className="sr-only"> Dribbble </span>
                <FaDribbble className="w-6 h-6 md:w-10 md:h-10 " />
              </a>
            </Link>
          </div>

          <div className='flex  w-full justify-between'>

            <p className=" mt-2 text-gray-400 ">
              Copyright &copy; 2022. Ambel. All rights reserved.
            </p>

            <div className=" justify-end mt-2  lg:text-end text-gray-400">

             <div>
             <Link href="/">
                <a className="hover:text-white"> Terms & Conditions </a>
              </Link>
              <Link href="/">
                <a className="hover:text-white"> Privacy Policy </a>
              </Link>
              <Link href="/">
                <a className="hover:text-white"> Cookies </a>
              </Link>
             </div>
            </div>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
