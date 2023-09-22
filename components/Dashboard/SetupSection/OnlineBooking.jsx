/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dropdown from "../../Dropdown";
import { PulseLoader } from "react-spinners";
import Toggle from "../../Toggle";
import {
	onCancelAction,
	onlineBookingInfo,
	onlineBookingUpdate,
} from "../../../store/actions/onlinebooking";
import Modal from "../../Modal";
import Image from "next/image";
import QrForm from "./QrForm";

const OnlineBooking = (props) => {

	const [isChanged, setIsChanged] = React.useState(false);
	const [changes, setChanges] = React.useState([]);
	const [bookingData, setBookingData] = useState({
		business: "",
		onlineBooking: false,
		upcomingLimit: "No limit",
		allowCancellation: false,
		acceptCancelationTime: "",
		displayOrgTimezone: false,
		allowSelfChecking: false,
		practitionerList: "Select practioner",
		bookingType: "Booking type",
	});

	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		props.onlineBookingInfo();
	}, []);

	useEffect(() => {
		if (props.bookingData) {
			setBookingData({
				...bookingData,
				...props.bookingData,
			});
			setChanges([]);
		}
	}, [props.bookingData]);

	useEffect(() => {
		if (props.info) {
			setBookingData({
				...bookingData,
				business: props.info?.business?._id,
			});
		}
	}, [props.info]);

	useEffect(() => {
		if (changes.length > 0) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [changes]);

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setBookingData({
			...bookingData,
			[name]: value,
		});
		if (props.bookingData?.[name] !== value) {
			changes.push(name);
			setChanges([...changes]);
		} else {
			changes.pop();
			setChanges([...changes]);
		}
	};

	return (
		<>

			{
				openModal && <Modal
					onClick={setOpenModal}
					closeOnOutsideClick={true}
					disableBlur={true}
				>
					{/* <div className="py-10 mt-10">

						<div
							className="w-[660px] bg-white rounded-[8px]"
						>
							<div className="flex justify-center items-center flex-col p-10">
								<div className="text-center">
									<p className="text-[#003F48] text-[24px] ">Self checking system by </p>
									<Image
										src={ambelImg}
										alt="ambelImg"
										width={240}
										height={100}
										objectFit="cover"
										className="mx-auto"
									/>
								</div>
								<div className="text-center">
									<p className="text-[#5B5B5B] text-[24px]">Self Checking at</p>
									<p className="text-[#00AAF3] text-[32px]">Mount Adora Hospital</p>
								</div>
								<div
									className="text-center mt-[39px] text-[#5B5B5B] text-[24px]"
								>
									<span>Visit</span>
									<p className="mb-[10px]">Ambel.app/mountadora/checkin</p>
									<Image
										src={vector}
										alt="vectorImg"
										width={41}
										height={66}
										objectFit="cover"
										className="my-[9px]"
									/>
									<p>Or Login your account and use
										<br />
										your camera to self checking</p>
								</div>
							</div>
							<div className="flex justify-center items-center mt-[31px] ">
								<QrCode />
							</div>
							<div className="w-full flex justify-end items-center gap-3 mt-[111px] pb-[26px] pr-[25px]">
								<button
									className="h-[40px] w-[118px] text-[16px]  px-4 text-white bg-[#19525A] rounded-[8px] flex justify-center items-center gap-3">
									<TfiDownload
										className="text-[22px] font-[600]"
									/>
									Save
								</button>
								<button
									className="h-[40px] w-[118px] text-[16px]  px-4 text-white bg-[#19525A] rounded-[8px] flex justify-center items-center gap-3">
									<BsPrinter
										className="text-[22px] font-[600]"
									/>
									Print
								</button>
							</div>
						</div>
					</div> */}
					<QrForm
						businessData={props?.info}
					/>
				</Modal>
			}

			<div className="pb-20">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Online booking of your organization
				</span>
				<div className="bg-white rounded-lg flex flex-col mt-2 shadow-md">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Do you allow online booking?
						</span>
						<Toggle
							checked={bookingData.onlineBooking}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "onlineBooking", value: checked },
								})
							}
						/>
					</div>
					{bookingData.onlineBooking && (
						<div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Upcoming appointment limit?
								</span>
								<Dropdown
									width={"240px"}
									items={["No Limit", "10", "20", "30"]}
									selected={bookingData.upcomingLimit}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "upcomingLimit", value: selected },
										});
									}}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Do you allow cancellations?
								</span>
								<Toggle
									checked={bookingData.allowCancellation}
									setChecked={(checked) =>
										onChangeValue({
											target: { name: "allowCancellation", value: checked },
										})
									}
								/>
							</div>

							<div className="w-full flex justify-between items-center py-5 px-8 border-b-[2px] border-gray-300">
								<p className="text-[16px] text-[#5B5B5B]">
									Accept cancellation before start appointment?
									<span className="text-rose-600">*</span>
								</p>
								<div className="flex items-center text-center">
									<input
										type="text"
										required
										placeholder="24"
										name="acceptCancelationTime"
										value={bookingData.acceptCancelationTime}
										className="outline-none rounded-l-[8px] border-2 border-gray-400 py-1 px-2 w-[150px] h-[40px]"
										onChange={onChangeValue}
									/>
									<div className="h-[40px] w-[90px] bg-[#19525A] text-center text-[16px] text-white rounded-r-md flex items-center justify-center">
										Minutes
									</div>
								</div>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Display organization timezone?
								</span>
								<Toggle
									checked={bookingData.displayOrgTimezone}
									setChecked={(checked) =>
										onChangeValue({
											target: { name: "displayOrgTimezone", value: checked },
										})
									}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Practitioner available to be book online?
								</span>
								<Dropdown
									width={"240px"}
									items={[
										"Tazul Islam",
										"Delwar Hossain",
										"Rahat Mia",
										"Mijan Rahman",
									]}
									selected={bookingData.practitionerList}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "practitionerList", value: selected },
										});
									}}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Booking type?
								</span>
								<Dropdown
									width={"240px"}
									items={[
										"Pre-Paid Payment",
										"Post paid Payment",
										"Practitioner choice",
									]}
									selected={bookingData.bookingType}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "bookingType", value: selected },
										});
									}}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="w-full mt-8">
					<span className="text-[32px] text-[#5B5B5B] font-[700]">
						Allow your customers to verify when they arrived
					</span>
					<div className="bg-white flex flex-col mt-2 shadow-md">
						<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
							<span className="text-[16px] text-[#5B5B5B]">
								Allow customers to self checking?
							</span>
							<Toggle
								checked={bookingData.allowSelfChecking}
								setChecked={(checked) =>
									onChangeValue({
										target: { name: "allowSelfChecking", value: checked },
									})
								}
							/>
						</div>
						<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
							<span className="text-[16px] text-[#5B5B5B]">
								Practitioner available to be book online?
							</span>
							<button
								onClick={() => setOpenModal(true)}
								className="w-[157px] bg-[#19525A] rounded-sm text-white p-2">
								View QR Code
							</button>
						</div>
					</div>
				</div>
				{isChanged && (
					<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
						<span className="">Do you want to save changes?</span>
						<div>
							<button
								type="submit"
								onClick={() => {
									props.onCancelAction();
									setIsChanged(false);
									setBookingData({
										...bookingData,
										...props.bookingData,
									});
								}}
								className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
							>
								<span>Cancel</span>
							</button>
							<button
								type="submit"
								onClick={() => {
									props.onlineBookingUpdate(
										bookingData,
										props.bookingData ? props.bookingData._id : null
									);
								}}
								className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
							>
								{props.loading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Save</span>
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		info: state?.business?.info,
		bookingData: state?.onlineBooking?.info?.bookingData,
		loading: state?.onlineBooking?.loading,
	};
};
export default connect(mapStateToProps, {
	onlineBookingInfo,
	onlineBookingUpdate,
	onCancelAction,
})(OnlineBooking);
