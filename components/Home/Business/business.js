import Image from 'next/image';

const Organization = () => {
  const info = [
    {
      id: 1,
      description: 'Online shop and Inventory management.',
    },
    {
      id: 2,
      description: 'Marketing and Promotion.',
    },
    {
      id: 3,
      description: 'Organization Intelligence and management.',
    },
    {
      id: 4,
      description: 'Organization Intelligence and management.',
    },
    {
      id: 5,
      description: 'Time to time reminder.',
    },
    {
      id: 6,
      description: '24/7 support.',
    }
  ];

  return <section>
    <div className='w-[90%] md:mt-20 mt-14  rounded-md md:max-w-[100%] mx-auto'>
      <div className='lg:mb-20 mb-10'>
        <h1 className='text-2xl md:text-3xl text-center font-medium'>Take Your Organization in Highest Level.</h1>
        <p className='text-[#595959] mt-2 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error
          laborum ab amet sunt recusandae?</p>
      </div>
      <div className='flex lg:flex-row  flex-col justify-center items-center'>
        <div className='lg:w-1/2 w-full'>
          <img src='/home/business/business.png' />
        </div>
        <div className='lg:w-1/2 w-full mt-10 md:mt-0 sm:w-[70%] '>
            {info.map(content => {
              return <div key={content.id} className='shadow-magical shadow-emerald-200 rounded-md border-emerald-900 hover:bg-emerald-400 text-gray-700 hover:text-white flex-col mb-3 bg-white px-4 py-3'>
                <p className='font-medium  text-center sm:text-left'>{content.description}</p>
              </div>
            })}
        </div>
      </div>
    </div>
  </section>
};

export default Organization;
