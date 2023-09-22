import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { Doctors } from "./Doctors";
import calender from "../../../assets/OBJECTS.png"
import { MdArrowDropDown } from "react-icons/md";

const SearchSection = () => {
	const onSubmit = (e) => {
		e.preventDefault();
	};

	const [isOpen, setOpen] = React.useState({
		All: false,
		Country: false,
		State: false,
	});

	const [selected, setSelected] = React.useState({
		All: "",
		Country: "",
		State: "",
	});

	const data = [
		{
			All: ["All", "Doctors", "Hospitals", "Clinics", "Pharmacies"],
		},
		{
			Country: ["All", "Nigeria", "Ghana", "Kenya", "South Africa"],
		},
		{
			State: ["All", "Lagos", "Abuja", "Kano", "Ibadan"],
		},
	];

	const filter = React.useRef();

	React.useEffect(() => {
		document.addEventListener("click", handleClickOutside, false);
		return () => {
			document.removeEventListener("click", handleClickOutside, false);
		};
	}, []);

	let resetAll = {
		All: false,
		Country: false,
		State: false,
	};

	const handleClickOutside = (event) => {
		if (filter.current && !filter.current.contains(event.target)) {
			setOpen(resetAll);
		}
	};

	const setDropdownOpen = (key) => {
		setOpen({ ...resetAll, [key]: !isOpen[key] });
	};

	const setSelectedItem = (key, item) => {
		setOpen(resetAll);
		setSelected({ ...selected, [key]: item });
	};

	let doctors = [
		{
			id: 0,
			user: {
				profile_pic: "/home/doctors/item1.svg",
				name: "Md. Tazul Islam",
				isAvailable: false,
			},
			degres: "MBBS,FRCS,MSBC (UK)",
			institution: "Dhaka Medical College",
			location: "Dhaka, BD",
			working_on: "Cardiologist",
			rating: "4.8 (30)",
			price: "100",
			time: "10:00 AM - 12:00 PM",
			completed: "1k",
		},
		{
			id: 1,
			user: {
				profile_pic: "/home/doctors/item1.svg",
				name: "Md. Mijanur Rahman",
				isAvailable: true,
			},
			degres: "UBBS,FRCS,MSBC (UK)",
			institution: "Mymensingh Medical College",
			location: "Mymensing, BD",
			working_on: "Dentist",
			rating: "3.0 (10)",
			price: "100",
			time: "10:00 AM - 12:00 PM",
			completed: "700",
		},
	];

	const [search, setSearchInput] = useState("");
	const [focused, setFocused] = useState(false);
	if (search) {
		doctors = doctors.filter((doctor) => {
			// need to call the api here

			return (
				doctor.user.name.toLowerCase().includes(search.toLowerCase()) ||
				doctor.degres.toLowerCase().includes(search.toLowerCase()) ||
				doctor.institution.toLowerCase().includes(search.toLowerCase()) ||
				doctor.working_on.toLowerCase().includes(search.toLowerCase())
			);
		});
	}

	return (
		<div className="flex w-[90%] justify-center mt-8 ml-12 fixled ">

			<div className="w-[40%]">
				<Image src={calender} alt="cal" />
			</div>




		


			<div className="w-[55%]  mt-4">

	 <h1 className="text-center font-bold  text-xl md:text-2xl">Book Appointments for Local 
 or International <br /> Professionals</h1> 

				<div className=" shadow-magical shadow-slate-200 rounded-md p-8 mt-8">
					{/* <h1 className="text-center font-bold  text-xl md:text-2xl">Book Appointments for Local 
or International Professionals</h1> */}
					<div className="relative flex justify-center  ">
						<input
							onChange={(e) => setSearchInput(e.target.value)}
							// onFocus={() => setFocused(true)}
							type="text"
							className="bg-white border w-full  border-gray-300 focus:text-gray-800 text-gray-500 text-sm rounded-lg focus:ring-indigo-500 focus:ring-1 p-2.5"
							// placeholder="Name of your professionals"
							placeholder="Name of your professionals"
						/>
						<button
							type="button"
							className="text-gray-500  pl-64 flex absolute inset-y-0  items-center hover:text-indigo-700"
						>
						</button>

						<div>
							<button
								type="submit"
								className="text-white bg-emerald-400 hover:bg-emerald-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 ml-4 py-2.5 text-center"
							>
								Search
							</button>
						</div>
					</div>





					<div className="">

						<form className="md:mt-10 mb-2 " onSubmit={onSubmit}>
							<div className=" flex justify-center  md:grid-cols-2 lg:grid-cols-3 relative">

								<div ref={filter} className="grid gap-2 md:grid-cols-3 ">
									{data.map((item, i) => {
										const _key = Object.keys(item)[0];

										return (

											<div key={i}>
												<button
													onClick={() => setDropdownOpen(_key)}
													className="bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-indigo-500 focus:ring-1 focus:text-gray-800 focus:border-indigo-500  flex justify-between w-full p-2.5"
													type="button"
												>
													{selected[_key] ? selected[_key] : _key}

													<MdArrowDropDown className="w-5 h-5" onClick={() => { }} />
												</button>
												{isOpen[_key] ? (
													<div className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
														<ul
															className="py-1 text-sm text-gray-700"
															aria-labelledby="all"
														>
															{item[_key].map((item, i) => {
																return (
																	<li key={i}>
																		<a
																			onClick={(_) => setSelectedItem(_key, item)}
																			className="block py-2 px-4 cursor-pointer hover:bg-gray-100"
																		>
																			{item}
																		</a>
																	</li>
																);
															})}
														</ul>
													</div>
												) : (
													<></>
												)}
											</div>
										);
									})}
								</div>
								<div className="flex items-center ">

									<div className="text-gray-500 ml-3">
										<Image
											src="/home/doctors/filter.svg"
											height={30}
											width={30}
											alt="filter"
										/>
									</div>

								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

		</div>
	);
};

export default SearchSection;
