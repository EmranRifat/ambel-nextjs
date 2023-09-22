import React, { forwardRef } from "react";
import Dropdown from "../../Dropdown";
import Delete from "../../../public/icons/delete.png";
import calendar from "../../../public/icons/calendar.png";
import arrowdown from "../../../public/icons/arrowdown.png";
import dot from "../../../public/icons/dot3.png";
import uparrow from "../../../public/icons/uparrow.png";
import downarrow from "../../../public/icons/downarrow.png";
import usersvg from "../../../public/icons/user.svg";
import creditcard from "../../../public/icons/creditcard.svg";
import download from "../../../public/icons/download.svg";
import whitecross from "../../../public/icons/whitecross.svg";
import send from "../../../public/icons/send.png";
import user from "../../../public/icons/user.png";
import Modal from "../../Modal";
import CustomComponent from "./CustomComponent.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useState } from "react";

const PurchaeModal = (props) => {
	return (
		<Modal onClick={props.setIsPurchaseModalOpen} closeOnOutsideClick={true}>
			<div className="py-[50px]">
				<div className="w-[800px] relative text-center mb-[50px] mt-[100px]">
					<text className="text-[16px] text-[#FFF] leading-[24px]">
						Purchase Service
						<br />
						10:00 AM (EDT), Aug 15, 2022
					</text>
					<img
						src={whitecross.src}
						className="absolute top-[10px] left-[98%] text-[#FFF] h-4 w-4"
						onClick={() => {
							props.setIsPurchaseModalOpen(false);
						}}
					/>
				</div>
				<div className="w-[800px] bg-[#FFF] px-[50px] rounded-[8px] ">
					<div className="border-b-[1px] border-[#5B5B5B] text-center">
						<img
							src={usersvg.src}
							className="w-[80px] h-[80px] relative -top-[40px] left-[44%]"
						/>
						<div className="relative -top-[30px] text-[#5B5B5B]">
							<span>
								Dr. Tazul Islam
								<br />
								Pshycologist, Sylhet
								<br />
								FEPS, FRCPS, MSNCPS
							</span>
						</div>
					</div>
					<div className="pb-[50px]">
						<div className="w-[60%] inline-block float-left">
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Service Name :
								</span>{" "}
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									General Consultant
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Service Provider :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Dr. Tazul Islam
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Organization Name :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Mount Adora Hospital
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Booking By :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Myself
								</span>
							</div>
							<div className="pt-[12px] float-left">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Apointment Type :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Vedio Call
								</span>
							</div>
							<div className="pt-[12px] float-left">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Apointment Date :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									10 Aug 2022, 10.00 AM (EDT)
								</span>
							</div>
						</div>
						<div className="w-[40%] inline-block">
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Type :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Postpaid
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Amount :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									$ 955.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Tax :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									$ 5.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Fee :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									$ 0.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Status :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Partial Paid
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Method :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									{" "}
									Card ***7734
								</span>
							</div>
						</div>
					</div>
					<div className="w-full text-center pb-[30px]">
						<button className="w-[300px] h-[42px] bg-[#19525A] rounded-[8px] text-center text-[#FFF]">
							<img
								src={download.src}
								className="mr-[5px] inline-block align-middle"
							/>{" "}
							<text className="text-[14px] leading-[17px]">
								Download Invoice
							</text>
						</button>
					</div>
				</div>
				<div className="w-[800px] bg-[#FFF] px-[16px] rounded-[8px] mt-[20px] pt-[10px]">
					<span className="text-[#5B5B5BB2]/70">Add a note</span>
					<div className="border-b-[1px] border-[#5B5B5B]">
						<input
							type={"text"}
							className=" w-[97%] bottom-b-[1px] border-[#5B5B5B] focus:outline-none"
						></input>
						<img src={send.src} className="text-[#5B5B5B] float-right" />
					</div>
					<div className="py-[30px] flex flex-grow">
						<div className="inline-block mr-[16px]">
							<img src={user.src} className="w-[44px] h-[44px] rounded-[50%]" />
						</div>
						<div className="inline-block grow">
							<span className="text-[16px] leading-[24px] text-[#5B5B5BB2]/70">
								Md. Tazul Islam
								<br />
							</span>
							<span className="text-[14px] leading-[21px] text-[#5B5B5BB2]">
								This is the note section.
							</span>
						</div>
						<div className="inline-block mr-[16px]">
							<span className="text-[14px] leading-[21px] text-[#5B5B5BB2]/70">
								Aug 25, 2022 <br />
								9:53 PM (EDT)
							</span>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

const Services = () => {
	const [date, setDate] = useState("");
	const [range, setRange] = useState("");
	const [dateRange, setDateRange] = useState([null, null]);
	const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
	const [startDate, endDate] = dateRange;
	const handleSelect = (date) => {
		// console.log(date);
	};

	const DateComponent = CustomComponent("Date");
	const RangeComponent = CustomComponent("Range", "w-[180px]");
	const AppointmentComponent = CustomComponent("Appointment Date", "w-[144px]");

	return (
		<>
			<div className="pb-20">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">Services</span>
				<div className="bg-white rounded-lg flex flex-col mt-2 shadow-md">
					<div className="flex w-full bg-[#E4E7ED] rounded-[8px] pt-[12px] pb-[14px] shadow-[0_0px_0px_6px_rgba(0, 0, 0, 0.25)]">
						<DatePicker
							selected={date}
							onChange={(date) => {
								// console.log(date);
								setDate(date);
							}}
							customInput={<DateComponent />}
							withPortal
						/>
						<DatePicker
							selected={startDate}
							onChange={(update) => {
								setDateRange(update);
							}}
							customInput={<RangeComponent />}
							startDate={startDate}
							endDate={endDate}
							selectsRange
							withPortal
						/>
						<DatePicker
							selected={date}
							onChange={(date) => {
								// console.log(date);
								setDate(date);
							}}
							customInput={<AppointmentComponent />}
							withPortal
						/>

						{/* <Dropdown
              width={"136px"}
              items={["Status", "Upcoming", "Completed", "Expired"]}
              style="outline-none bg-[#FFFFFF] rounded-[8px]  border-1 border-blue-500 py-1 px-2  h-[40px]"
              selected={"Upcoming"}
              onSelected={(selectedItem) => {}}
            /> */}
						<div
							className={`flex justify-between w-[136px] h-8 bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] p-2 leading-[18px] ml-[17px]`}
						>
							<span className="text-[12px] text-[#5B5B5BB2]/70 font-normal shrink">
								Status
							</span>
							<img src={arrowdown.src} className="py-[4px] " />
						</div>
						<div className="flex flex-col grow mr-[34px] mt-[8px]">
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col px-5">
						<div className="w-full flex justify-items-start items-start mx-auto  border-b-2 border-gray-300 pt-3 pb-2">
							<div className="text-[14px] w-14% self-start m-auto text-[#5B5B5B]">
								Date
								<div className="inline-block ml-[5px] relative top-[3px]">
									<img src={uparrow.src} className="py-[3px]" />
									<img src={downarrow.src} />
								</div>
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Service Name
							</div>
							<div className="text-[14px] w-19% self-start m-auto text-[#5B5B5B]">
								Organization
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Appointment Date
								<div className="inline-block ml-[5px] relative top-[3px]">
									<img src={uparrow.src} className="py-[3px]" />
									<img src={downarrow.src} />
								</div>
							</div>
							<div className="text-[14px] w-10% self-start m-auto text-[#5B5B5B]">
								Amount
							</div>
							<div className="text-[14px] w-9% self-start m-auto text-[#5B5B5B]">
								Status
							</div>
							<div className="text-[14px] w-12% self-start m-auto text-[#5B5B5B]">
								Details
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-14% self-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">By</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] w-19% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-10% self-startm-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#00A455]">Paid</span>
							</div>
							<div className="text-[14px] w-9% self-centre m-auto text-[#5B5B5B]">
								<span className="text-[#FF8311]">Upcoming</span>
							</div>
							<div className="text-[14px] w-12% self-start m-auto text-[#5B5B5B]">
								<text
									className="relative top-[1px] ml-2 mr-8 text-center"
									onClick={() => {
										setIsPurchaseModalOpen(true);
									}}
								>
									View
								</text>
								<img
									src={Delete.src}
									className="inline-block relative top-[2px]"
								/>
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-14% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">By</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] w-19% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-10% self-startm-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#00A455]">Paid</span>
							</div>
							<div className="text-[14px] w-9% self-centre m-auto text-[#5B5B5B]">
								<span className="text-[#00974E]">Completed</span>
							</div>
							<div className="text-[14px] w-12% self-start m-auto text-[#5B5B5B]">
								<text
									className="relative top-[1px] ml-2 mr-8 text-center"
									onClick={() => {
										setIsPurchaseModalOpen(true);
									}}
								>
									View
								</text>
								<img
									src={Delete.src}
									className="inline-block relative top-[2px]"
								/>
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-14% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">By</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] w-19% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-10% self-startm-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#00A455]">Paid</span>
							</div>
							<div className="text-[14px] w-9% self-centre m-auto text-[#5B5B5B]">
								<span className="text-[#FF0000]">Expired</span>
							</div>
							<div className="text-[14px] w-12% self-start m-auto text-[#5B5B5B]">
								<text
									className="relative top-[1px] ml-2 mr-8 text-center"
									onClick={() => {
										setIsPurchaseModalOpen(true);
									}}
								>
									View
								</text>
								<img
									src={Delete.src}
									className="inline-block relative top-[2px]"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isPurchaseModalOpen && (
				<PurchaeModal setIsPurchaseModalOpen={setIsPurchaseModalOpen} />
			)}
		</>
	);
};

export default Services;
