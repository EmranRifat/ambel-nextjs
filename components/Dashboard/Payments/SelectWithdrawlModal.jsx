import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Dropdown from "../../Dropdown";

const SelectWithdrawlModal = () => {
	const [showModal, setShowModal] = React.useState(false);
	const [show, setShow] = useState(false);
	const [selectedValue, setSelectedValue] = useState("localBank");
	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="flex items-center justify-center rounded-md text-white bg-[#0F4556] h-[36px] w-[132px]"
			>
				<span className="text-[30px] mr-3">+</span>
				<span className="text-[16px]">Add New</span>
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="max-w-[440px] lg:min-w-[440px] absolute top-45 flex flex-col items-center bg-white py-2 rounded-md">
							<div className="w-full flex justify-end items-start">
								<span
									onClick={() => setShowModal(false)}
									className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
								>
									✖
								</span>
							</div>
							{/* all fields... */}
							<div className="w-full flex border-b-[1px] border-[#76767680] justify-start text-[#19525A] text-[20px] ml-[14px] pb-3">
								<span>Select a type of Payment method</span>
							</div>
							{/* select the type of payment method you want to add */}
							<div className="w-full justify-start ml-[14px] mt-[30px] md-[30px]">
								<div className="radio">
									<label className="text-[#5B5B5B] flex gap-2">
										<input
											type="radio"
											value="localBank"
											checked={selectedValue === "localBank"}
											className="accent-[#19525A] "
											onChange={(val) => {
												setSelectedValue(val.target.value);
												// console.log(val);
											}}
										/>
										Local Bank
									</label>
								</div>
								<div className="radio ">
									<label className="text-[#5B5B5B] flex gap-2">
										<input
											type="radio"
											value="paypal"
											checked={selectedValue === "paypal"}
											className="accent-[#19525A]"
											onChange={(val) => {
												setSelectedValue(val.target.value);
												// console.log(val);
											}}
										/>
										PayPal
									</label>
								</div>
							</div>
							<div className="w-full flex justify-end items-center mt-4">
								<button
									className="h-[32px] w-[86px]  bg-white border-[.5px] rounded-md text-[#5B5B5B]"
									onClick={() => setShowModal(false)}
								>
									Cancel
								</button>
								<button className="h-[32px] w-[86px] bg-[#19525A] rounded-md text-white ml-[12px] mr-[12px]">
									Next
								</button>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default SelectWithdrawlModal;
