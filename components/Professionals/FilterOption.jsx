import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Dropdown from "../Dropdown";
import RangeSlider from "../RangeSlider/RangeSlider";
import { TbBriefcase } from "react-icons/Tb";
import ArrowDown from "../ArrowDown";
import { doctorCategory, lawyerCategory, availabilites } from "./FilterItems";
import { DayPicker } from "react-day-picker";
import { set } from "date-fns/fp";
import Daypicker from "../CalenderPicker/Daypicker";
// import { Country, State, City }  from 'country-state-city';
import { AiOutlineCalendar } from "react-icons/Ai";
import Styles from "./App.module.css";
import StepBar from "./StepBar";
const countryList = [

	"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const FilterOption = ({ onFilter }) => {
	const [country, setCountry] = useState('All countries')
	const [openPractise, setOpenPractise] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);
	const [openAvail, setOpenAvail] = useState(false);
	const [openRating, setOpenRating] = useState(false);
	const [openLang, setOpenLang] = useState(false);
	const [openCharge, setOpenCharge] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  
	const [dateShow, setDateShow] = useState(false);


	const handleCalender=()=>{
		setDateShow(!dateShow);

	
	}

	return (
		<>



			<div className="max-w-[320px] w-full bg-white rounded-xl shadow shadow-slate-300 mx-5">
				<div className="w-full flex items-center justify-center border-b-[1.5px] border-[#5b5b5b5e] p-4">
					<span className="text-[#5B5B5B] text-[24px]">Filter by</span>
				</div>
				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenPractise(!openPractise)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B] ">Practice Type</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div className={`${openPractise ? "flex" : "hidden"} flex-col pl-8  p-3`}>
						<div className="flex justify-start items-center">
							<input
								id="default-checkbox"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-400 dark:border-gray-500" />
							<span className="text-[14px] text-[#5B5B5B] ml-2">
								Individual
							</span>
						</div>
						<div className="flex justify-start items-center">
							<input
								id="default-checkbox"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
							/>
							<span className="text-[14px] text-[#5B5B5B] ml-2">
								Organization
							</span>
						</div>
					</div>
				</div>

				{/* category */}
				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenCategory(!openCategory)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Category</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div className={`${openCategory ? "flex" : "hidden"} flex-col pl-8 p-3`}>
						<div className="flex flex-col">
							<div className="flex justify-start items-center">
								<input
									id="default-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
									onChange={() => {
										setSelectedCategories((prevState) => {
											const idx = prevState.indexOf("Doctor");
											if (idx === -1) prevState.push("Doctor");
											else prevState.splice(idx, 1);
											return [...prevState];
										});
										onFilter({ selectedCategories, selectedSubCategories });
									}}
								/>
								<span className="text-[14px] text-[#5B5B5B] ml-2">Doctor</span>
							</div>

							<div className="ml-4 pl-2">
								{doctorCategory.map((docetegory) => (
									<div
										key={docetegory.id}
										className="flex justify-start items-center"
									>
										<input
											id="default-checkbox"
											type="checkbox"
											value=""
											className="w-3 h-3 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
											onChange={() => {
												setSelectedSubCategories((prevState) => {
													const idx = prevState.indexOf(docetegory.name);
													if (idx === -1) prevState.push(docetegory.name);
													else prevState.splice(idx, 1);
													return [...prevState];
												});
												onFilter({
													selectedSubCategories,
													selectedCategories,
												});
											}}
										/>
										<span className="text-[14px] text-[#5B5B5B] ml-2">
											{docetegory.name}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col mt-2">
							<div className="flex justify-start items-center">
								<input
									id="default-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
									onChange={() => {
										setSelectedCategories((prevState) => {
											const idx = prevState.indexOf("Lawyer");
											if (idx === -1) prevState.push("Lawyer");
											else prevState.splice(idx, 1);
											return [...prevState];
										});
										onFilter({ selectedCategories, selectedSubCategories });
									}}
								/>
								<span className="text-[14px] text-[#5B5B5B] ml-2">Lawyer</span>
							</div>

							<div className="ml-4 pl-2">
								{lawyerCategory.map((lacetegory) => (
									<div
										key={lacetegory.id}
										className="flex justify-start items-center"
									>
										<input
											id="default-checkbox"
											type="checkbox"
											value=""
											className="w-3 h-3 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
											onChange={() => {
												setSelectedSubCategories((prevState) => {
													const idx = prevState.indexOf(lacetegory.name);
													if (idx === -1) prevState.push(lacetegory.name);
													else prevState.splice(idx, 1);
													return [...prevState];
												});
												onFilter({
													selectedSubCategories,
													selectedCategories,
												});
											}}
										/>
										<span className="text-[14px] text-[#5B5B5B] ml-2">
											{lacetegory.name}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenLocation(!openLocation)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Location</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div
						className={`${openLocation ? "flex" : "hidden"
							} flex-col items-center p-2`}
					>
						<div className="">
							
							
							
							
							<Dropdown
								items={countryList}
								selected={country}
								onSelected={(item) => setCountry(item)}
								width={"260px"}
							/>
						</div>
						<div className="mt-2">
							<Dropdown
								items={["Dhaka", "Sylhet", "Bogra", "Mymensingh", "Cumilla", "Chittagong", "Rajshahi"]}
								selected={"State"}
								onSelected={(item) => {
									// console.log(item);
								}}
								width={"260px"}
							/>
						</div>
						<div className="mt-2 ">
							<Dropdown
								items={["Dhaka", "Canad"]}
								selected={"City"}
								onSelected={(item) => {
									// console.log(item);
								}}
								width={"260px"}
								height={"32px"}
							/>
						</div>
					</div>
				</div>
				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenAvail(!openAvail)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Availability</span>
						<BiChevronDown className="text-2xl text-[#5b5b5bfd]" />
					</div>
					<div className={`ml-3 ${openAvail ? "flex" : "hidden"} flex-col pl-5 `}>
						{availabilites.map((avail) => (
							<div key={avail.id} className="mt-2 flex items-center">
								<input
									type="radio"
									className="h-3 w-3 checked:bg-[#01261C] cursor-pointer border-2-gray "
								/>
								<span className="text-[14px] text-[#5B5B5B] ml-2">
									{avail.name}
								</span>
							</div>
						))}
						<div className="flex justify-between items-center mt-2 mr-4">



							{/* arrowDown
							onClick={handleCalender}

							*/}
							  {/* <ArrowDown

								items={["1/1/22", "2/2/22"]}
								selected={"Select date"}
								onSelected={(item) => {
									// console.log(item);
								}}
								width={"120px"}/>  */}


			<div className=" flex-col ">
			<div className="flex " >
				
				<button onClick={handleCalender} className="  btn btn-xs mb-2 glass hover:text-gray-500 text-[#5b5b5baf]  
			btn-outline">select date <AiOutlineCalendar  className="ml-1"></AiOutlineCalendar></button>
		
					<span className=" text-[#5B5B5B] mx-2">To</span>
			
			<button onClick={handleCalender} className=" btn btn-xs mb-2 glass hover:text-gray-500 text-[#5b5b5bb4]  
			btn-outline">select date <AiOutlineCalendar className="ml-1"></AiOutlineCalendar></button>
			</div>
		  
      {
				dateShow?  <Daypicker/> : " "
			}

			</div>









							{/* <ArrowDown
								items={["3/3/22", "4/4/22"]}
								selected={"Select date"}
								onSelected={(item) => {
									// console.log(item);
								}}
								width={"120px"}
							/> */}
						</div>
					</div>
				</div>

				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenCharge(!openCharge)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Charge</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div
						className={`w-full ${openCharge ? "flex" : "hidden"
							} flex-col ml-6 p-2`}
					>
						<Dropdown
							items={["Daily", "Monthly", "2month"]}
							selected={"Hourly"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width={"120px"}
						/>
						{/* <ul  className="steps min-w-0  text-[10px]  mt-4">
							<li data-content="" className= " step   step-neutral">10$</li>
							<li  data-content="" className=" step   step-neutral">30$</li>
							<li  data-content="" className=" step ">50$</li>
							<li  data-content="" className=" step ">100$+</li>
						</ul> */}
						<StepBar></StepBar>
					</div>

				</div>

				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenRating(!openRating)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Ratings</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div
						className={`w-full ${openRating ? "flex" : "hidden"
							} items-center justify-center p-2`}
					>
						<Dropdown
							items={['4 and above 4 stars ratings', "3 and above 3 stars ratings", "2 and above 2 stars ratings", "1 and above 1 star ratings", "bellow 1 star"]}
							selected={"5 star ratings "}
							onSelected={(item) => {
								// console.log(item);
							}}
							width={"260px"}
						/>
					</div>
				</div>
				<div className="border-b-[1.5px] border-[#5b5b5b5e]">
					<div
						onClick={() => setOpenLang(!openLang)}
						className="w-full p-2 pl-5 flex justify-between items-center cursor-pointer"
					>
						<span className="text-[16px] text-[#5B5B5B]">Language</span>
						<BiChevronDown className="text-2xl text-[#5B5B5B]" />
					</div>
					<div
						className={`w-full ${openLang ? "flex" : "hidden"
							} items-center justify-center p-2`}
					>
						<Dropdown
							items={["Bangla", "English", "Hindi"]}
							selected={"Select a language"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width={"260px"}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default FilterOption;
