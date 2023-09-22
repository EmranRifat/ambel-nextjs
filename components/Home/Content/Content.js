import Image from 'next/image';
import img1 from '../../../assets/Booking.png'

const Content = () => {

  const contents = [
    {
      id: 1,
      title: 'Online Booking',
      description: 'Create, schedule and send your clients to your Ambel booking page, where they can book on any device.',
      image: '/home/content/1.svg',
    },
    {
      id: 2,
      title: 'Live Consultant',
      description: 'Communicate with your customers or clients through audio and video calling',
      image: '/home/content/2.svg',
    },
    {
      id: 3,
      title: 'Payments',
      description: 'Send custom invoices and accept payment from anywhere anytime within a moment ',
      image: '/home/content/3.svg',

    },
    {
      id: 4,
      title: 'Customer Tracking',
      description: 'Securely store and track customer information and manage them together',
      image: '/home/content/4.svg',

    },
    {
      id: 5,
      title: 'Notification',
      description: 'Automatically notify your clients with reminder vis SMS and email to all of them just a single click ',
      image: '/home/content/5.svg',
    },
    {
      id: 6,
      title: 'Website Builder',
      description: 'Design a custom booking website for your business without any code ',
      image: '/home/content/6.svg',
    },
    {
      id: 7,
      title: 'Reports ',
      description: 'Powerful data and graphs at your fingertips to monitor day to day activities',
      image: '/home/content/7.svg',
    },
    {
      id: 8,
      title: 'Resources',
      description: 'Create and share resources like Prescriptions, Documentations, Medical Charts and Videos',
      image: '/home/content/8.svg',
    },
  ];

  return <section>
    <div className='w-[90%] md:mt-32 mt-14 rounded-md md:max-w-[100%] mx-auto'>
      <div className='text-center mt-10 mb-16 flex justify-center'>
        <div className='md:w-[60%]'>
          <h1 className='text-3xl md:text-4xl font-bold'>Solve all your needs with <br /> 
            a single software solution</h1>
          <p className='text-[#595959] mt-2'>This platform streamlines the entire customer management process, <br /> saving businesses time and increasing efficiency.</p>
        </div>
      </div>
      <div className='grid lg:grid-cols-4  sm:grid-cols-2 justify-center'>
        {contents.map(content => {
          return <div key={content.id} className='flex flex-col sm:mr-3 mb-7 md:mb-10 md:mr-6 lg:mr-8 items-center px-5 py-8 border rounded-lg w-50 transition hover:shadow-xl hover:border-white'>
            <img
              className='w-16'
              src={content.image}
              alt={content.title}
            />
            <h1 className='text-xl lg:text-2xl  mt-5 text-[#282828] text-center'>{content.title}</h1>
            <p className='text-center mt-4 text-[#595959]'>{content.description}</p>
          </div>
        })}
      </div>
    </div>
  </section>

};

export default Content;
