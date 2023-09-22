import React from "react";
import Image from "next/image";
import { BiDotsVerticalRounded, BiDownArrow } from "react-icons/bi";
import MakePaymentModal from "./MakePaymentModal";
import Dropdown from "../../Dropdown";
import { RxDotFilled } from "react-icons/rx";
import { MdPlayArrow } from "react-icons/md";
const staffs = [
	{
		id: 1,
		name: "Tazul Islam",
		active: "1",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 2,
		name: "Tazul Islam",
		active: "1",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 3,
		name: "Tazul Islam",
		active: "0",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "Completed"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 4,
		name: "Tazul Islam",
		active: "0",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "Completed"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 5,
		name: "Tazul Islam",
		active: "1",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 6,
		name: "Tazul Islam",
		active: "1",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 7,
		name: "Tazul Islam",
		active: "0",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
	{
		id: 8,
		name: "Tazul Islam",
		active: "1",
		img: "/img/photo-1.avif",
		commission: "1 Commission",
		lastpayment: ["01-09-2022", "$ 1000 USD", "pending"],
		ownbalance: "$ 1000 USD",
		makepayment: "Pay Now",
	},
];

const StaffPayments = () => {
	const [showModal, setShowModal] = React.useState(false);
	return (
		<>
			<div className=" h-screen">
				<div className="w-full flex justify-between">
					<span className="text-[32px] font-[700] text-[#5B5B5B]">
						Staff Payment
					</span>
				</div>
				<div className="w-full flex justify-between bg-[#E4E7ED] shadow-xl p-3 mt-3 rounded-md">
					<div className="flex justify-between gap-3">
						<Dropdown
							items={["Commission-1", "Commission-2", "Commission-3"]}
							selected={"Commission Type"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="180px"
						/>
						<Dropdown
							items={["Patient", "Practitioner", "Staff"]}
							selected={"All Staffs Member"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="180px"
						/>
						<Dropdown
							items={["11/12/22", "11/12/22", "12/12/22"]}
							selected={"Date of payment"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="170px"
						/>
					</div>
					<div className="flex justify-between items-center">
						<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
					</div>
				</div>
				<div className="bg-white shadow-md mb-4 px-4 py-1 h-full">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="text-gray-600 border-b-2 border-gray-200">
								<tr className="">
									<th
										scope="col"
										className="px-6 py-4 text-[#5B5B5B] font-light text-[16px]"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-[#5B5B5B] font-light text-[16px]"
									>
										<div className="flex">
											<p className="my-auto">Commission</p>
											<div className="ml-1">
												<MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
												<BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
											</div>
										</div>
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-[#5B5B5B] font-light text-[16px]"
									>
										<div className="flex">
											<p className="my-auto">Last Payment</p>
											<div className="ml-1">
												<MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
												<BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
											</div>
										</div>
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-[#5B5B5B] font-light text-[16px]"
									>
										Owe balance
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-[#5B5B5B] font-light text-[16px]"
									>
										Make payment
									</th>
								</tr>
							</thead>
							<tbody>
								{staffs.map((staff, index) => {
									return (
										<tr
											className={`bg-white  border-b hover:bg-gray-50`}
											key={index}
										>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												<div className="flex items-center h-full">
													<Image
														src={staff.img}
														alt="patient"
														height={40}
														width={40}
														className="object-cover rounded"
													/>
													<div className="ml-3 truncate">
														<p className="text-md font-normal text-gray-700">
															{staff.name}
														</p>
														{staff.active === "1" && (
															<p className="text-xs flex">
																<RxDotFilled className="my-auto text-xl text-lime-600 shadow-lg" />
																Active Now
															</p>
														)}
														{staff.active === "0" && (
															<p className="text-xs flex">
																<RxDotFilled className="my-auto text-gray-400 text-xl" />{" "}
																Active 5 min ago
															</p>
														)}
													</div>
												</div>
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												{staff.commission}
											</td>
											<td
												scope="row"
												className="px-6 py-4 flex flex-col font-normal text-gray-700 whitespace-nowrap"
											>
												<span className="text-center">
													<p className="text-[#5b5b5b] text-xs">
														{staff.lastpayment[0]}
													</p>
													<p className="text-[#FF0000]">
														{staff.lastpayment[1]}
													</p>
													{staff.lastpayment[2] === "pending" ? (
														<p className="text-[#FFA800] text-[10px]">
															{staff.lastpayment[2]}
														</p>
													) : (
														<p className="text-lime-600 text-[10px]">
															{staff.lastpayment[2]}
														</p>
													)}
												</span>
												<span>{staff.status}</span>
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												<span className="text-[#5B5B5B] text-[16px]">
													{staff.ownbalance}
												</span>
											</td>
											<td
												scope="row"
												className="pl-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												<MakePaymentModal />
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{/* <div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
          <button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
            Show all
          </button>
        </div> */}
				</div>
			</div>
		</>
	);
};

export default StaffPayments;
