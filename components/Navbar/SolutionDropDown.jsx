import Link from "next/link";
import {
	MdOutlineFitnessCenter,
	MdWork,
	MdOutlineHealthAndSafety,
} from "react-icons/md";
import { RiDiscussLine } from "react-icons/ri";
import { GiSaloon } from "react-icons/gi"

const SolutionDropDown = () => {
	return (
		<>
			<div
				className={`md:group-hover:block group-hover:block hidden rounded-md lg:shadow border-b-2 bg-white lg:absolute lg:top-28 lg:left-[40%] text-gray-800 pt-1`}
			>
				<div className="flex flex-col lg:flex-row p-1">
					<div className="p-2">
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdWork className="bg-[#EF9F9F] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Private practise
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdOutlineHealthAndSafety className="bg-[#D1D1D1] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Healthcare
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<RiDiscussLine className="bg-[#EA99D5] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Lawyer firm
								</span>
							</a>
						</Link>
					</div>
					<div className="p-2">
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdOutlineFitnessCenter className="bg-[#BAFFB4] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Fitness
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<GiSaloon className="bg-[#90E0EF] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Spa/Saloon
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<RiDiscussLine className="bg-[#A2D5AB] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Management
								</span>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default SolutionDropDown;
