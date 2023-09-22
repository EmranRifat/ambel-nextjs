import Image from "next/image";
import React, { useState } from "react";
import { BiDotsVerticalRounded, BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import Dropdown from "../../Dropdown";
import AppointmentBookModal from "./Modals/AppointmentBookModal";
import PurchasedModal from "./Modals/PurchasedModal";
import RefundedFrndModal from "./Modals/RefundedFrndModal";
import RefundedModal from "./Modals/RefundedModal";
import WithdrawlModal from "./Modals/WithdrawlModal";

const staffs = [
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "Cash",
		amount: "-1000 USD",
		status: "Completed",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "Cash",
		amount: "+$1000 USD",
		status: "Cancelled",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "E-transfer",
		amount: "-$1000 USD",
		status: "Processesing",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "Cash",
		amount: "+$1000 USD",
		status: "Processesing",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "Cash",
		amount: "-$1000 USD",
		status: "Refunded",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "E-transfer",
		amount: "+$1000 USD",
		status: "Cancelled",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "E-transfer",
		amount: "+$1000 USD",
		status: "Unpaid",
	},
	{
		date: "10 Aug, 2022",
		time: "10 AM (EDT)",
		invoiceNo: "1234",
		branch: "Sylhet",
		description: ["Withdrawal", "Duch bangl bank LTD"],
		payer: "Delwar",
		method: "E-transfer",
		amount: "+$1000 USD",
		status: "Unpaid",
	},
];
const Transactions = (props) => {
	const [showWithdrawlModal, setShowWithdrawlModal] = useState(false);
	const [showAppointmentModal, setShowAppointmentModal] = useState(false);
	const [showPurchasedModal, setShowPurchasedModal] = useState(false);
	const [showRefundedModal, setShowRefundedModal] = useState(false);
	const [showRefundedFrndModal, setShowRefundFrndedModal] = useState(false);
	const handleOnClose = () => setShowWithdrawlModal(false);
	const [openCreatModal, setOpenCreatModal] = useState(false);
	return (
		<>
			<div className=" h-screen">
				<div className="w-full flex justify-between">
					<span className="text-[32px] font-[700] text-[#5B5B5B]">
						Transaction
					</span>
				</div>
				<div className="w-full flex justify-between bg-[#E4E7ED] shadow-xl p-3 mt-3 rounded-md">
					<div className="flex justify-between gap-3">
						<Dropdown
							items={["All branches", "Sylhet", "Dhaka"]}
							selected={"All branches"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="160px"
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
							items={["Type-1", "Type-2", "Type-3"]}
							selected={"Type"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="110px"
						/>
						<Dropdown
							items={["Status", "Status-1", "Status-2"]}
							selected={"Status"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="120px"
						/>
						<Dropdown
							items={["11/12/22", "11/12/22", "12/12/22"]}
							selected={"Date of payment"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width="180px"
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
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal  text-[16px]"
									>
										<div className="flex">
											<p className="my-auto">Date</p>
											<div className="ml-1">
												<MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
												<BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
											</div>
										</div>
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] w-[160px] font-normal text-[16px] whitespace-nowrap"
									>
										Invoice no
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										<div className="flex">
											<p className="my-auto">Branch</p>
											<div className="ml-1">
												<MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
												<BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
											</div>
										</div>
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										Description
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										Payer
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										Method
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										<div className="flex">
											<p className="my-auto">Amount</p>
											<div className="ml-1">
												<MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
												<BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
											</div>
										</div>
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-[#5B5B5B] font-normal text-[16px]"
									>
										Status
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
												className="px-6 py-4 flex flex-col font-normal text-gray-700 whitespace-nowrap"
											>
												<span>{staff.date}</span>
												<span>{staff.time}</span>
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal  text-gray-700 whitespace-nowrap"
												onClick={() => setShowAppointmentModal(true)}
											>
												#{staff.invoiceNo}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												onClick={() => setShowPurchasedModal(true)}
											>
												{staff.branch}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												<p onClick={() => setShowWithdrawlModal(true)}>
													{staff.description[0]}
												</p>
												<p>{staff.description[1]}</p>
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												onClick={() => setShowRefundFrndedModal(true)}
											>
												{staff.payer}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												onClick={() => setShowRefundedModal(true)}
											>
												{staff.method}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal  whitespace-nowrap"
											>
												{staff.amount[0] === "-" ? (
													<p className="text-rose-600"> {staff.amount}</p>
												) : (
													<p className="text-lime-600"> {staff.amount}</p>
												)}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 w-[200px] "
											>
												{staff.status === "Processesing" && (
													<p className="text-[#FA7800]"> {staff.status}</p>
												)}
												{staff.status === "Unpaid" && (
													<p className="text-[#0081C9]"> {staff.status}</p>
												)}
												{staff.status === "Cancelled" && (
													<p className="text-rose-600"> {staff.status}</p>
												)}
												{staff.status === "Refunded" && (
													<p className="text-rose-900"> {staff.status}</p>
												)}
												{staff.status === "Completed" && (
													<p className="text-lime-600"> {staff.status}</p>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<WithdrawlModal
						visible={showWithdrawlModal}
						onClose={handleOnClose}
					></WithdrawlModal>

					<AppointmentBookModal
						visible={showAppointmentModal}
						onClose={() => setShowAppointmentModal(false)}
					></AppointmentBookModal>

					<PurchasedModal
						visible={showPurchasedModal}
						onClose={() => setShowPurchasedModal(false)}
					></PurchasedModal>

					<RefundedModal
						visible={showRefundedModal}
						onClose={() => setShowRefundedModal(false)}
					></RefundedModal>

					<RefundedFrndModal
						visible={showRefundedFrndModal}
						onClose={() => setShowRefundFrndedModal(false)}
					></RefundedFrndModal>

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

export default Transactions;
