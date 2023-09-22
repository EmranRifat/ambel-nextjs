import React, { useEffect } from "react";
import arrowdown from "../../../public/icons/arrowdown.svg";
import dot from "../../../public/icons/dot3.png";
import uparrow from "../../../public/icons/uparrow.png";
import downarrow from "../../../public/icons/downarrow.png";
import edit from "../../../public/icons/edit.png";
import send from "../../../public/icons/send.png";
import usersvg from "../../../public/icons/user.svg";
import ambelname from "../../../public/icons/ambelname.png";
import DatePicker from "react-datepicker";
import user from "../../../public/icons/user.png";
import creditcard from "../../../public/icons/creditcard.svg";
import whitecross from "../../../public/icons/whitecross.svg";
import black from "../../../public/icons/black.svg";
import cross from "../../../public/icons/cross.png";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import CustomComponent from "./CustomComponent.js";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";

const MsgReqModal = (props) => {
	return (
		<Modal onClick={props.setIsMsgReqModalOpen} closeOnOutsideClick={true}>
			<div className="w-[420px] h-[510px] bg-[#FFFFFF] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)] m-auto align-middle">
				<div className="relative h-[61px] text-center pt-[25px]  border-b-[1px] border-[#76767680]/50 text-[16px] text-[#19525A]">
					Message request to DR. Md. Tazul Islam{" "}
					<img
						src={cross.src}
						className="absolute top-[10px] left-[95%] border-[2px] border-[#FFF]"
						onClick={() => {
							props.setIsMsgReqModalOpen(false);
						}}
					/>
				</div>
				<div className="p-5">
					<span className="pt-[6px] text-[14px] text-[#5B5B5B]">Note</span>
					<textarea
						placeholder={"write your note..."}
						className="mt-[5px] h-[68px] w-full text-[10px] leading-[15px] rounded-[8px] p-2 placeholder:relative placeholder:-top-[20px] focus:outline-none border-[.5px] border-[#19525AB2]/70"
					></textarea>
				</div>
				<div className="p-5 pt-0 ">
					<button className="bg-[#19525A] py-[3px]  float-right ml-[8px] text-[#FFF] px-[11px] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)">
						Request
					</button>
					<button
						className="border-[.5px] py-[3px] float-right  px-[11px]  border-[#19525AB2]/70 rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)"
						onClick={() => {
							props.setIsMsgReqModalOpen(false);
						}}
					>
						Cancel
					</button>
					<div className="clear-both content-[''] table"></div>
				</div>
			</div>
		</Modal>
	);
};

const CancelModal = (props) => {
	return (
		<Modal onClick={props.setIsCancelModalOpen} closeOnOutsideClick={true}>
			<div className="w-[420px] bg-[#FFFFFF] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)]">
				<div className="relative h-[61px] text-center pt-[25px]  border-b-[1px] border-[#76767680]/50 text-[16px] text-[#19525A]">
					Cancel Appointment with DR. Md. Tazul Islam{" "}
					<img
						src={cross.src}
						className="absolute top-[10px] left-[95%]"
						onClick={() => {
							props.setIsCancelModalOpen(false);
						}}
					/>
				</div>
				<div className="text-[12px] px-[34px] pt-[20px] text-[#5B5B5B] leading-[18px] text-center">
					Are you want to sure cancel appointment. $15 will cut from your
					payment due to the late cancelation period
				</div>
				<div className="text-center pt-[24px] pb-[14px]">
					<button className="px-[25px] mr-[5px] rounded-[8px] py-[4px] bg-[#19525A] text-[#FFF]">
						YES
					</button>
					<button
						className="px-[25px] rounded-[8px] py-[4px] bg-[#19525A] text-[#FFF]"
						onClick={() => {
							props.setIsCancelModalOpen(false);
						}}
					>
						NO
					</button>
				</div>
			</div>
		</Modal>
	);
};

const PaymentModal = (props) => {
	return (
		<Modal onClick={props.setIsPaymentModalOpen} closeOnOutsideClick={true}>
			<div className="py-[50px]">
				<div className="relative w-[800px] text-center mb-[50px] mt-[100px]">
					<text className="text-[16px] text-[#FFF] leading-[24px]">
						Appoinment
						<br />
						10:00 AM (EDT), Aug 15, 2022
					</text>
					<img
						src={whitecross.src}
						className="absolute top-[10px] left-[98%] text-[#FFF] h-4 w-4"
						onClick={() => {
							props.setIsPaymentModalOpen(false);
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
									Appointment With :
								</span>{" "}
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
						</div>
						<div className="w-[40%] inline-block">
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Type :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									Postpaid
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Amount :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									$ 955.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Tax :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									$ 5.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Fee :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									$ 0.00 USD
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Status :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									Partial Paid
								</span>
							</div>
							<div className="pt-[12px]">
								<span className="text-[#19525A]/70 text-[16px] leading-[24px] font-bold">
									Payment Method :
								</span>
								<span className="text-[#5B5B5BB2] text-[16px] leading-[24px]">
									Card ***7734
								</span>
							</div>
						</div>
					</div>
					<div className="w-full text-center pb-[30px]">
						<button className="w-[300px] h-[42px] bg-[#19525A] rounded-[8px] text-center text-[#FFF]">
							<img
								src={creditcard.src}
								className="mr-[5px] inline-block align-middle"
							/>{" "}
							<text className="text-[14px] leading-[17px]">Pay Now</text>
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

const ReminderModal = (props) => {
	return (
		<Modal onClick={props.setIsReminderModalOpen} closeOnOutsideClick={true}>
			<div className="w-[400px]  bg-[#FFFFFF] rounded-[8px] mx-auto shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)] align-middle">
				<div className="relative h-[61px] text-center  my-auto border-b-[1px] border-[#76767680]/50 text-[20px] text-[#19525A] align-middle">
					<span className="pt-[15px] pb-10px]">Add a Reminder</span>
					<img
						src={cross.src}
						className="absolute top-[10px] left-[95%] border-[2px] border-[#FFF]"
						onClick={() => {
							props.setIsReminderModalOpen(false);
						}}
					/>
				</div>
				<div className="p-[15px]">
					<div className="text-[16px] text-[#5B5B5B] leading-[24px] pb-[15px]">
						<span className="pb-[5px]">Name of the Reminder</span>
						<div className="text-[14px] text-[#5B5B5B] p-[10px] border-[1px] border-[#19525A80]/50 rounded-[8px]">
							General Consultant -{" "}
							<span className="text-[8px] italic">with </span>
							<span className="text-[#0089C9] ">Dr. Md Tazul Islam</span>
						</div>
					</div>
					<div className="text-[16px] text-[#5B5B5B] leading-[24px] pb-[15px]">
						<span className="pb-[5px]">Reminder System</span>
						<div className="text-[14px] text-[#5B5B5B] p-[10px] border-[1px] border-[#19525A80]/50 rounded-[8px]">
							Email
						</div>
					</div>
					<div className="text-[16px] text-[#5B5B5B] leading-[24px] pb-[15px]">
						Reminder Time
						<div>
							<div>
								<span className="text-[14px] tex-[#5B5B5B]">Before</span>
								<div className="rounded-[8px] border-[1px] border-[#19525A80]/50">
									<span className="inline-block w-[80%] p-[10px]">15:30</span>
									<span className="inline-block w-[20%] p-[10px] text-[#FFF] bg-[#19525A] text-[14px] rounded-tr-[8px] rounded-br-[8px]">
										Min
									</span>
								</div>
							</div>

							<div>
								<span className="text-[14px] tex-[#5B5B5B]">Status</span>
								<div className="rounded-[8px] border-[1px] border-[#19525A80]/50">
									<span className="inline-block w-[80%] p-[10px]">Active</span>
									<img
										src={arrowdown.src}
										className="float-right w-[12px] h-[12px] mt-[15px] mr-[20px]"
									/>
								</div>
							</div>
						</div>
						<div className="pt-[20px]">
							<button className="bg-[#19525A] py-[5px]  float-right ml-[8px] text-[#FFF] px-[15px] rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)">
								Craete
							</button>
							<button
								className="border-[.5px] py-[5px] float-right  px-[15px]  border-[#19525AB2]/70 rounded-[8px] shadow-[0_0px_0px_4px_rgba(0, 0, 0, 0.25)"
								onClick={() => {
									props.setIsReminderModalOpen(false);
								}}
							>
								Cancel
							</button>
							<div className="clear-both content-[''] table"></div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

const CheckinModal = (props) => {
	return (
		<Modal
			onClick={props.setIsCheckinModalModalOpen}
			closeOnOutsideClick={true}
		>
			<div className="w-[420px] bg-[#FFF] p-[40px] h-[625px] rounded-[8px]">
				<img
					src={cross.src}
					className="relative left-[105%] -top-[22px]"
					onClick={() => {
						props.setIsCheckinModalModalOpen(false);
					}}
				/>
				<div>
					<div className="text-[24px] leading-[36px] mx-auto text-[#003F48] text-center">
						<span>Self checking system by</span>
					</div>
					<img src={ambelname.src} className="relative -top-[100px]" />
					<div className="text-center pb-[40px] relative -top-[180px]">
						<span className="text-[24px] leading-[36px] text-[#5B5B5B]">
							Self Checking at
							<br />
						</span>
						<span className="text-[32px] leading-[48px] text-[#00AAF3]">
							Mount Adora Hospital
						</span>
					</div>
				</div>
				<div className="relative -top-[180px]">
					<img src={black.src} />
				</div>
			</div>
		</Modal>
	);
};

const UpcomingAppointments = () => {
	const [date, setDate] = useState(null);
	const [range, setRange] = useState("");
	const [dateRange, setDateRange] = useState([null, null]);
	const [isMsgReqModalOpen, setIsMsgReqModalOpen] = useState(false);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
	const [isCheckinModalModalOpen, setIsCheckinModalModalOpen] = useState(false);
	const [startDate, endDate] = dateRange;
	const dataSetLength = 3;
	const [isShown, setIsShown] = useState(Array(dataSetLength).fill(false, 0));
	const editRef = useRef();

	const editPopupRef = useRef();

	const handleSelect = (date) => {
		// console.log(date);
	};

	const DateComponent = CustomComponent("Date of Appointment", "w-[163px]");
	const RangeComponent = CustomComponent("Range of Date", "w-[163px]");

	const handleEditPopup = (event) => {
		// console.log(event.target);
		const index = event.target.getAttribute("data-is-shown");
		// console.log(index);
		if (isShown[+index]) {
			const newArr = Array(dataSetLength).fill(false, 0);
			setIsShown(newArr);
		} else {
			const newArr = Array(dataSetLength).fill(false, 0);
			newArr[+index] = true;
			setIsShown(newArr);
		}
	};

	useEffect(() => {
		Array.from(document.getElementsByClassName("edit")).map((el) => {
			el.addEventListener("hover", handleEditPopup);
		});

		return () => {
			Array.from(document.getElementsByClassName("edit")).map((el) => {
				el.removeEventListener("hover", handleEditPopup);
			});
		};
	}, []);

	return (
		<>
			<div className="pb-20">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Upcoming Appointments
				</span>
				<div className="bg-white rounded-lg flex flex-col mt-2 shadow-md">
					<div className="flex w-full bg-[#E4E7ED] rounded-[8px] pt-[12px] pb-[14px] shadow-[0_0px_0px_6px_rgba(0, 0, 0, 0.25)]">
						<DatePicker
							selected={date}
							onChange={(date) => {
								// console.log(date);
								setDate(date);
							}}
							customInput={
								<DateComponent value={undefined} onClick={undefined} />
							}
							withPortal
						/>
						<DatePicker
							selected={startDate}
							onChange={(update) => {
								setDateRange(update);
							}}
							customInput={
								<RangeComponent value={undefined} onClick={undefined} />
							}
							startDate={startDate}
							endDate={endDate}
							selectsRange
						/>
						<div
							className={`flex justify-between w-[136px] h-8 bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] p-2 leading-[18px] ml-[17px]`}
						>
							<span className="text-[12px] text-[#5B5B5BB2]/70 font-normal shrink">
								Payment Status
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
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 pt-3 pb-2">
							<div className="text-[14px] w-16% self-start m-auto text-[#5B5B5B]">
								Date
								<div className="inline-block ml-[5px] relative top-[3px]">
									<img src={uparrow.src} className="py-[3px]" />
									<img src={downarrow.src} />
								</div>
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Appointment Name
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								Price
								<div className="inline-block ml-[5px] relative top-[3px]">
									<img src={uparrow.src} className="py-[3px]" />
									<img src={downarrow.src} />
								</div>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Payment
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Join
							</div>

							<div className="text-[14px] w-20% self-start m-auto text-[#5B5B5B]">
								Details
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">with</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#00A455]">Paid</span>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A4D]/30 rounded-[21px] text-[#FFFFFF]">
									Pay Now
								</button>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]">
									Join
								</button>
							</div>
							<div className="relative text-[14px] w-20% self-start m-auto text-[#5B5B5B]">
								<text className="relative -top-2 ml-2 mr-8 text-center text-[#0089C9]">
									View
								</text>
								<div
									className="inline-block edit"
									onClick={handleEditPopup}
									data-is-shown="0"
								>
									<Image
										src={edit}
										className="relative top-[2px]"
										data-is-shown="0"
									/>
									<text className="relative -top-2 ml-[10px]" data-is-shown="0">
										Edit
									</text>
								</div>

								{isShown[0] && (
									<div className="absolute left-[30px] -top-[120px] bg-[#FFF] inline-block border-[0.7px] border-[#5B5B5BB2]/70 px-[12px] z-[100]">
										<div className="inline-block w-[15px] h-[15px] bg-[#FFFFFF] border-l-[0.7px] border-b-[0.7px] border-[#5B5B5BB2]/70  -rotate-45 translate-x-[45px] translate-y-[100px] "></div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-[3px] relative -top-[15px]"
											onClick={() => {
												setIsMsgReqModalOpen(true);
											}}
										>
											Message Request
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] relative -top-[10px]"
											onClick={() => {
												setIsReminderModalOpen(true);
											}}
										>
											Set Reminder
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-[10px] relative -top-[15px]"
											onClick={() => {
												setIsCheckinModalModalOpen(true);
											}}
										>
											Set Check In
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-5px] relative -top-[10px] "
											onClick={() => {
												setIsCancelModalOpen(true);
											}}
										>
											Cancel Appointment
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">with</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#FF0000]">Unpaid</span>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button
									className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]"
									onClick={() => {
										setIsPaymentModalOpen(true);
									}}
								>
									Pay Now
								</button>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A4D]/30 rounded-[21px] text-[#FFFFFF]">
									Join
								</button>
							</div>
							<div className="relative text-[14px] w-20% self-start m-auto text-[#5B5B5B]">
								<text className="relative -top-2 ml-2 mr-8 text-center text-[#0089C9]">
									View
								</text>
								<div
									className="inline-block edit"
									onClick={handleEditPopup}
									data-is-shown="1"
								>
									<Image
										src={edit}
										className="relative top-[2px]"
										data-is-shown="1"
									/>
									<text className="relative -top-2 ml-[10px]" data-is-shown="1">
										Edit
									</text>
								</div>

								{isShown[1] && (
									<div className="absolute left-[30px] -top-[120px] bg-[#FFF] inline-block border-[0.7px] border-[#5B5B5BB2]/70 px-[12px] z-[100]">
										<div className="inline-block w-[15px] h-[15px] bg-[#FFFFFF] border-l-[0.7px] border-b-[0.7px] border-[#5B5B5BB2]/70  -rotate-45 translate-x-[45px] translate-y-[100px] "></div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-[3px] relative -top-[15px]"
											onClick={() => {
												setIsMsgReqModalOpen(true);
											}}
										>
											Message Request
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] relative -top-[10px]"
											onClick={() => {
												setIsReminderModalOpen(true);
											}}
										>
											Set Reminder
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-[10px] relative -top-[15px]"
											onClick={() => {
												setIsCheckinModalModalOpen(true);
											}}
										>
											Set Check In
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-5px] relative -top-[10px] "
											onClick={() => {
												setIsCancelModalOpen(true);
											}}
										>
											Cancel Appointment
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								General consaltant <br />{" "}
								<span className="text-[12px] italic ">with</span>{" "}
								<span className="text-[#0089C9]">Md. Tazul Islam</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								$1000 <br />
								<span className="text-[#CC00FF]">Partial Paid</span>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button
									className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]"
									onClick={() => {
										setIsPaymentModalOpen(true);
									}}
								>
									Pay Now
								</button>
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A4D]/30 rounded-[21px] text-[#FFFFFF]">
									Join
								</button>
							</div>
							<div className="relative text-[14px] w-20% self-start m-auto text-[#5B5B5B]">
								<text className="relative -top-2 ml-2 mr-8 text-center text-[#0089C9]">
									View
								</text>
								<div
									className="inline-block edit"
									onClick={handleEditPopup}
									data-is-shown="2"
								>
									<Image
										src={edit}
										className="relative top-[2px]"
										data-is-shown="2"
									/>
									<text className="relative -top-2 ml-[10px]" data-is-shown="2">
										Edit
									</text>
								</div>

								{isShown[2] && (
									<div className="absolute left-[30px] -top-[120px] bg-[#FFF] inline-block border-[0.7px] border-[#5B5B5BB2]/70 px-[12px] z-[100]">
										<div className="inline-block w-[15px] h-[15px] bg-[#FFFFFF] border-l-[0.7px] border-b-[0.7px] border-[#5B5B5BB2]/70  -rotate-45 translate-x-[45px] translate-y-[100px] "></div>
										<div className="text-[12px] text-[#5B5B5B4D]/30 pt-[3px] relative -top-[15px]">
											Message Request
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] relative -top-[10px]"
											onClick={() => {
												setIsReminderModalOpen(true);
											}}
										>
											Set Reminder
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-[10px] relative -top-[15px]"
											onClick={() => {
												setIsCheckinModalModalOpen(true);
											}}
										>
											Set Check In
										</div>
										<div
											className="text-[12px] text-[#5B5B5B] pt-5px] relative -top-[10px] "
											onClick={() => {
												setIsCancelModalOpen(true);
											}}
										>
											Cancel Appointment
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{isMsgReqModalOpen && (
					<MsgReqModal setIsMsgReqModalOpen={setIsMsgReqModalOpen} />
				)}
				{isCancelModalOpen && (
					<CancelModal setIsCancelModalOpen={setIsCancelModalOpen} />
				)}
				{isPaymentModalOpen && (
					<PaymentModal setIsPaymentModalOpen={setIsPaymentModalOpen} />
				)}
				{isReminderModalOpen && (
					<ReminderModal setIsReminderModalOpen={setIsReminderModalOpen} />
				)}
				{isCheckinModalModalOpen && (
					<CheckinModal
						setIsCheckinModalModalOpen={setIsCheckinModalModalOpen}
					/>
				)}
			</div>
		</>
	);
};

export default UpcomingAppointments;
