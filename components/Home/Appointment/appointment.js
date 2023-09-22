import Image from 'next/image';

const Appointment = () => {

  const info = [
    {
      id: 1,
      title: 'Easy Booking by few click',
      description: 'Anyone can book appointment of their practitioner by few click from anywhere, anytime, any devices. ',
      image: '/home/appointment/1.svg',
    },
    {
      id: 2,
      title: '4 Ways of Booking',
      description: 'Anyone can book four different ways. In App Booking, In Web Booking, Google reverse and Book directly from the practitioner or organization website.',
      image: '/home/appointment/2.svg',
    },
    {
      id: 3,
      title: 'People to people',
      description: 'Users and practitioner can live consult with one to one or within a group people.',
      image: '/home/appointment/3.svg',
    },
    {
      id: 4,
      title: 'Secure and safe',
      description: 'All of your data transmission  and transections are secure. End-to-end encrypted and PIPEDA & HIPAA compliant.',
      image: '/home/appointment/4.svg',
    }
  ];

  return <section>
    <div className='w-[90%] md:mt-20 mt-14 rounded-md md:max-w-[100%] mx-auto'>
      <div className='flex lg:flex-row flex-col justify-center items-center'>
        <div className='lg:w-1/2 w-full'>
          <img src='/home/appointment/Cyclic.svg' />
        </div>
        <div className='lg:w-1/2 w-full'>
          <div className='mb-16'>
            <h1 className='text-2xl md:text-3xl text-center sm:text-left font-medium'>Online appointment </h1>
            <p className='text-[#595959] mt-2 text-center sm:text-left'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error</p>
          </div>
          <div className='flex flex-wrap justify-center 2xl:justify-start'>
            {info.map(content => {
              return <div key={content.id} className='flex flex-col items-center sm:items-start w-full sm:w-1/2 mb-7 pr-3'>
                <img
                  className='w-10'
                  src={content.image}
                  alt={content.title}
                />
                <h1 className='text-xl mt-3 text-[#282828] text-center sm:text-left'>{content.title}</h1>
                <p className='mt-4 text-sm text-[#595959] text-center sm:text-left'>{content.description}</p>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
};

export default Appointment;
