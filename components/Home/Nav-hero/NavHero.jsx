import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import pc from "../../../assets/Doctor.jpg";
import low from "../../../assets/Law Firm.jpg";
import Therapist from "../../../assets/Therapy.jpg";
import Broker from "../../../assets/broker.jpg";
import Fitness from "../../../assets/Spa and sallon.jpg";
import advisor from "../../../assets/Advisor.jpg";

const NavHero = () => {

  const router = useRouter();
  return (
    <div >
      <div className='font-bold text-center mt-20 text-2xl mb-6'>
        <h1 > Most popular category of <br /> practitioners' who uses this</h1>
      </div>


      <nav className=" bg-base-100">
        <ul className='flex	space-x-20 text-gray-500 justify-center' >

          <li className=" text-[18px] cursor-pointer font-[poppins] hover:text-[#19525A] hover:underline ">
            <p onClick={() => router.push("?show=doctor")}>Doctor</p>
          </li>

          <li className="text-[16px] cursor-pointer  hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=lawer")}>Lawyer</p>
          </li>
          
          <li className="text-[16px]  cursor-pointer hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=Therapist")}>Therapist </p>
          </li>
          <li className="text-[16px] cursor-pointer hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=Broker")}>Broker </p>
          </li>
          <li className="text-[16px] cursor-pointer hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=Fitness")}>Fitness </p>
          </li>
          <li className="text-[16px] cursor-pointer hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=lawer")}>Spa & Salon </p>
          </li>
          <li className="text-[16px] cursor-pointer hover:text-[#19525A] hover:underline  ">
            <p onClick={() => router.push("?show=advisor")}>Advisor </p>
          </li>
          
        </ul>
      </nav>


      {
        router?.query?.show == 'doctor' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex  mt-12  lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={pc} alt='pp' /></div>

              <div className=' pr-20  w-[45%]  '>
                <h1 className="  text-3xl  font-bold mb-4">
                  Business solution for <br /> healthcare providers
                </h1>
                <p className='mb-4 text-[16px] '>Our software allows Doctors and Medical Professionals <br /> to securely message their patients, provide online <br /> prescriptions, overview of their med-charts and <br /> automatically send reminders for</p>

                <p className='text-[#00A4EF] underline'>Learn more</p>

              </div>
            </div>
          </div>


        </div>


      }



      {
        router?.query?.show == 'lawer' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={low} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-4xl font-bold mb-4">
                  Business solutions <br /> for Law Firms
                </h1>
                <p className='mb-4 text-[16px]'>Ambel provides your Law Firm with document <br /> automation, case management, scheduling, booking, <br /> time tracking, billing and accounting features. We aim to <br /> streamline your practice with our user-friendly interface <br /> and secure cloud-based system. You can easily <br /> manage your cases, staff and clients, across your <br /> multiple branches and locations.</p>

                <p className='text-[#00A4EF] underline'>Learn more</p>

              </div>
            </div>
          </div>


        </div>


      }

      {
        router?.query?.show == 'Therapist' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={Therapist} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-[40px] font-bold mb-4">
                  Seamlessly manage <br />
                  your therapy sessions
                </h1>
                <p className='mb-4 text-[16px]'>Empower your mental health practice  and transform <br /> lives with one easy application called Ambel.</p>

                <p className='text-[#00A4EF] underline'>Learn more</p>

              </div>
            </div>
          </div>


        </div>


      }

      {
        router?.query?.show == 'Broker' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={Broker} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-4xl font-bold mb-4">
                The ultimate business <br /> solution for all sectors
                </h1>
                <p className='mb-4 text-[16px]'>Ambel is tailored to meet your business goals with each <br /> one of your clients. Our user-friendly softwar.

          </p>

                <p className='text-[#00A4EF] underline'>Learn more</p>

              </div>
            </div>
          </div>
        </div>


      }
      {
        router?.query?.show == 'Fitness' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={Fitness} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-4xl font-bold mb-4">
                Track and manage how <br /> your customers book online
                </h1>
                <p className='mb-4 text-[16px]'>
                With our user-friendly platform, you can efficiently <br /> schedule appointments, send reminders, and keep track <br /> of customer information all in one place. This will save <br /> you time and improve your overall customer service.
</p>

                <p className='text-[#00A4EF] underline'>Learn more</p>

              </div>
            </div>
          </div>


        </div>


      }
     
      {
        router?.query?.show == 'advisor' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={advisor} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-4xl font-bold mb-4">
                Give advice to your clients <br /> anytime from anywhere
                </h1>
                <p className='mb-4 text-[16px]'>
                Our scheduling tool also enables you to access your <br /> calendar and make changes on-the-go through our <br /> mobile app, ensuring that you never miss an <br /> appointment or opportunity to connect with your clients. <br /> Stay organized and in control of your schedule with our <br /> powerful scheduling software.
</p>

             
              </div>
            </div>
          </div>


        </div>


      }
      {
        router?.query?.show == 'engineer' &&
        <div>
          <div className="hero bg-base-100 flex justify-center">
            <div className="flex flex-wrap mt-12 flex-col lg:flex-row-reverse ">
              <div className='w-[40%] '> <Image src={advisor} alt='pp' /></div>
              <div className=' pr-20 '>
                <h1 className=" text-4xl font-bold mb-4">
                Give advice to your clients <br /> anytime from anywhere
                </h1>
                <p className='mb-4 text-[16px]'>
                Our scheduling tool also enables you to access your <br /> calendar and make changes on-the-go through our <br /> mobile app, ensuring that you never miss an <br /> appointment or opportunity to connect with your clients. <br /> Stay organized and in control of your schedule with our <br /> powerful scheduling software.
</p>

             
              </div>
            </div>
          </div>


        </div>


      }





    </div>
  );
};

export default NavHero;