// import service from '/home/services/service.svg'

const Services = () => {
	const services = [
		{
			id: 1,
			title: "Phone Communication",
			services: ["medicina", "medicine", "enfermagem"],
			image: "/home/services/1.svg",
			bg: "#E7F0F7",
		},
		{
			id: 2,
			title: "Emergency Hospital ",
			services: [
				"medicina",
				"medicine",
				"enfermagem",
				"enfermagem",
				"enfermagem",
			],
			image: "/home/services/2.svg",
			bg: "#EFFBFB",
		},
		{
			id: 3,
			title: "Virus Treatment",
			services: ["medicina", "medicine", "enfermagem"],
			image: "/home/services/3.svg",
			bg: "#FCF0E4",
		},
		{
			id: 4,
			title: "Virus Treatment",
			services: ["medicina", "medicine", "enfermagem", "enfermagem"],
			image: "/home/services/4.svg",
			bg: "#FCF0E4",
		},
		{
			id: 5,
			title: "Chat with patiens",
			services: ["medicina", "medicine", "enfermagem"],
			image: "/home/services/5.svg",
			bg: "#EFEBE4",
		},
		{
			id: 6,
			title: "One by one Commnication",
			services: ["medicina", "medicine", "enfermagem"],
			image: "/home/services/6.svg",
			bg: "#E7F0F7",
		},
	];

	return (
		<div className="w-[90%] md:mt-20 mt-14 rounded-md md:max-w-[100%] mx-auto">
			<div className="flex md:flex-row flex-col">
				<div className="md:w-1/4 h-72 md:h-auto w-full mt-5 rounded-md relative">
					<img
						src="/home/services/service.svg"
						className="w-full h-full object-cover  rounded-md"
						alt="service"
					/>
					<div className="absolute bg-gradient-to-t rounded-md top-0 w-full h-full from-gray-800 to-transparent flex flex-col items-center justify-center text-center">
						<h1 className="text-white text-2xl py-3 font-bold">Our Service</h1>
						<small className="text-white md:mx-2 mx-5">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
							beatae error laborum ab amet sunt recusandae?
						</small>
						<button
							type="submit"
							className="text-white mt-6 bg-emerald-500 hover:bg-emerald-800  rounded-md text-sm px-10 py-2 text-center"
						>
							More Service
						</button>
					</div>
				</div>
				<div className="md:w-3/4 w-full gap-3 md:gap-0 grid sm:grid-cols-2 xl:grid-cols-3">
					{services.map((service) => {
						return (
							<div
								key={service.id}
								className="mt-5  md:ml-5 py-8 px-7 rounded-md"
								style={{ background: `${service.bg}` }}
							>
								<img src={service.image} className="w-16 h-16" alt="service" />
								<p className="text-[#595959] py-3">{service.title}</p>
								<div className="py-3 flex flex-wrap">
									{service.services.map((service, idx) => {
										return (
											<small
												key={idx}
												className="bg-white text-[#595959] rounded px-2 py-1 mr-2 mb-2"
											>
												{service}
											</small>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Services;
