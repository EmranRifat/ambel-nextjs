import Link from "next/link";
import {
	MdSupportAgent,
	MdOutlineDocumentScanner,
	MdGroups,
	MdHeadphones,
} from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";

const HelpDropdown = () => {
	return (
		<>
			<div
				className={`md:group-hover:block group-hover:block hidden rounded-md lg:shadow border-b-2 bg-white lg:absolute lg:top-28 lg:right-[20%] text-gray-800 pt-1`}
			>
				<div className="flex flex-col lg:flex-row p-1">
					<div className="p-2">
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdSupportAgent className="bg-[#B1BCE6] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Support
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdOutlineDocumentScanner className="bg-[#D1D1D1] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Documentation
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<RiMapPin2Line className="bg-[#C1F4C5] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Roadmap
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<FiUserCheck className="bg-[#ECB390] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Be Our Affiliate Partner
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdGroups className="bg-[#FAD4D4] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Community forum
								</span>
							</a>
						</Link>
						<Link href="#">
							<a className="rounded-t  cursor-pointer hover:bg-gray-200 p-2 whitespace-no-wrap flex items-center">
								<MdHeadphones className="bg-[#9BA3EB] h-8 w-8 p-1 rounded-full text-xl text-gray-600" />
								<span className="ml-2 text-md font-medium text-gray-800">
									Contact us
								</span>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpDropdown;
