// import service from '/home/services/service.svg'

const Sponsor = () => {
	const sponsors = [
		{
			id: 1,
			image: "/home/sponsor/1.svg",
		},
		{
			id: 2,
			image: "/home/sponsor/2.svg",
		},
		{
			id: 3,
			image: "/home/sponsor/3.svg",
		},
		{
			id: 4,
			image: "/home/sponsor/4.svg",
		},
		{
			id: 5,
			image: "/home/sponsor/5.svg",
		},
	];

	return <div className='w-[90%] md:mt-20 mt-14 rounded-md md:max-w-[100%] mx-auto'>
			<h1 className="font-medium text-center text-3xl lg:text-4xl py-5">Sponsored by</h1>
			<div className="flex flex-wrap items-center justify-center">
				{sponsors.map((item, idx) => {
					return <img
					key={idx}
						src={item.image}
						className="md:w-56 w-40"
						alt="sponsor"
					/>
				})}
			
			</div>
	</div>
};

export default Sponsor;
