import Image from "next/image";
import React, { useEffect } from "react";
import { SUserStatus } from "./Components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getTimeDate } from "../../utils/utility";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { BsForward } from "react-icons/bs";
import { RiChatDeleteLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";
import PayNowModal from "./PayNow/PayNowModal";
import Modal from "../Modal";
import axios from "../../utils/axios";
import { format, parseISO } from 'date-fns';

export const MessageItems = (props) => {
	const messagesEndRef = React.createRef();
	const [actionOnMessage, setActionOnMessage] = React.useState(null);
	const scrollToBottom = () =>
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

	React.useEffect(() => {
		if (!actionOnMessage) scrollToBottom();
		return () => {
			setActionOnMessage(false);
		};
	}, [props.messages]);

	const items = [
		{
			id: 1,
			text: "Remove",
			icon: <RiChatDeleteLine />,
		},
		{
			id: 2,
			text: "Copy",
			icon: <AiOutlineCopyrightCircle />,
		},
		{
			id: 3,
			text: "Forward",
			icon: <BsForward />,
		},
	];

	const reference = React.useRef();
	const [selected, setSelected] = React.useState(null);
	const router = useRouter();
	const [showPayNowModal, setShowPayNowModal] = React.useState(false);

	const onSelected = (item) => {
		setSelected(null);
	};

	const renderOptions = (index, type) => {
		if (selected === index) {
			return (
				<div
					className={`absolute bottom-5 ${type == "me" ? "right-2" : "left-2"
						} z-auto px-2 py-1 bg-white rounded-3xl divide-y divide-gray-100 shadow`}
				>
					<div className="flex">
						{items.map((item, index) => {
							return (
								<div
									key={index}
									onClick={(_) => onSelected(item.text)}
									title={item.text}
									className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 text-sky-700"
								>
									{item.icon}
								</div>
							);
						})}
						<div className="w-[1px] mx-1 rounded bg-gray-100"></div>
						<div
							key={index}
							onClick={(_) => setSelected(null)}
							title="Close"
							className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 text-sky-700"
						>
							<MdOutlineClose />
						</div>
					</div>
				</div>
			);
		} else {
			return <></>;
		}
	};

	const getOtherUser = (message) => {
		const user = message?.conversation?.participants?.find(
			(user) => user._id !== props.meUser?._id
		);
		return user;
	};

	const getSixDigitFillingWithZero = (number) => {
		return number.toString().padStart(5, "0");
	};

	// flex  flex-col justify-end

	const [invoice, setInvoice] = React.useState(null);

	const _updateInvoice = async (invoice) => {
		setActionOnMessage(true);
		try {
			const res = await axios.put(`/payReceipt/${invoice._id}`, invoice);
			if (res.status === 200) {
				props.getMessages();
			}
		} catch (error) {
			// console.log(error);
		}
	};

	return (
		<div ref={reference} className="p-4 h-full">
			{showPayNowModal && (
				<Modal
					onClick={setShowPayNowModal}
					closeOnOutsideClick={true}
					disableBlur={true}
				>
					<PayNowModal
						setShowPayNowModal={setShowPayNowModal}
						invoice={invoice}
					/>
				</Modal>
			)}
			{
				props.messages.map((message, index) => {
					// console.log(message);

					return (

						<>

							{
								message.messageType != "case" &&
								<div
									ref={reference}
									key={message._id}
									className={`flex mb-4 justify-${message.sender?._id === props.meUser?._id ? "end" : "start"
										}`}
								>
									<div
										className={`w-2/3 flex justify-${message.sender?._id === props.meUser?._id ? "end" : "start"
											}`}
									>
										{message.sender?._id === props.meUser?._id ? (
											<React.Fragment>
												<div
													className="flex flex-col chat_item"
													style={{
														animationDelay: `0.1s`,
														transformOrigin: "right",
													}}
												>
													<div className="flex items-center">
														<div
															title="Menu"
															className="text-xl mt-1.5 relative flex items-start cursor-pointer rounded-full transition p-1 text-gray-500"
														>
															<BiDotsVerticalRounded
																onClick={() => setSelected(index)}
															/>
															{renderOptions(index, "me")}
														</div>
														<div>
															{message.messageType === "text" && (
																<div className="relative max-w-xl w-fit bg-sky-500 break-words text-white px-2.5 py-2 rounded-xl mr-2 rounded-tr-none flex flex-col">
																	<p className="text-base font-light">
																		{message.text}
																	</p>
																</div>
															)}
															{message.messageType.includes("audio") && (
																<div className="mr-2 mt-1 rounded-md">
																	<audio controls className="h-[30px]">
																		<source
																			src={message.files[0]}
																			type="audio/mpeg"
																		/>
																	</audio>
																</div>
															)}
															{message.messageType.includes("image") && (
																<div className="m-2 rounded-md border cursor-pointer">
																	<img
																		onClick={(_) =>
																			window.open(message.files[0], "_blank")
																		}
																		src={message.files[0]}
																		className="h-[200px] w-[360px] object-cover overflow-hidden rounded-md"
																		alt="image"
																	/>
																</div>
															)}
															{message.messageType.includes("pdf") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/pdf.png"
																	height={160}
																	width={140}
																	alt="pdf"
																/>
															)}
															{message.messageType.includes("doc") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/doc.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType.includes("csv") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/csv.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType.includes("zip") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/zip.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType == "invoice" && (
																<div className="border m-2 rounded-[14px] w-[330px] bg-[#F0F0F0]">
																	<div className="flex flex-col items-center justify-start overflow-hidden">
																		<div className="flex items-center w-full justify-start p-2 bg-[#CFDDFF] rounded-t-[14px]">
																			Invoice No#{" "}
																			{getSixDigitFillingWithZero(
																				message.invoice?.receiptNo
																			)}
																		</div>
																		<div className="w-full py-1">
																			{message.invoice?.selectedServices.map(
																				(item) => {
																					return (
																						<div
																							key={item.id}
																							className="flex items-center justify-between gap-3 px-2"
																						>
																							<span className="basis-3/4 text-start">
																								{item.title}
																							</span>
																							<span className="basis-1/6 text-end">
																								X{item.quantity}
																							</span>
																							<span className="basis-1/6 text-end">
																								${item.price}
																							</span>
																						</div>
																					);
																				}
																			)}
																			{message.invoice?.discountAmount > 0 && (
																				<div className="flex items-center justify-between gap-3 px-2">
																					<span>Discount</span>
																					<span>
																						${message.invoice?.discountAmount}
																					</span>
																				</div>
																			)}
																		</div>
																		<div className="text-lg mt-1 w-full text-end px-2 text-[#005a09]">
																			Total- ${message.invoice?.payAmount}
																		</div>
																		<div className="flex items-center justify-end w-full mb-1">
																			<div
																				onClick={
																					message.invoice?.paymentStatus ===
																						"withdrawn" ||
																						message.invoice?.paymentStatus === "paid"
																						? () => { }
																						: (e) => {
																							e.preventDefault();
																							_updateInvoice({
																								...message.invoice,
																								paymentStatus: "withdrawn",
																							});
																						}
																				}
																				className={`w-[95px] text-sm text-center h-8 flex items-center justify-center px-2 m-2 ${message.invoice?.paymentStatus ===
																					"withdrawn" ||
																					message.invoice?.paymentStatus === "paid"
																					? "bg-[#19525A] opacity-50"
																					: "bg-[#19525A] cursor-pointer"
																					}  text-white border border-[#19525A] rounded-full`}
																			>
																				{message.invoice?.paymentStatus ===
																					"withdrawn"
																					? "Withdrawn"
																					: message.invoice?.paymentStatus ===
																						"paid"
																						? "Paid"
																						: "Withdraw"}
																			</div>
																		</div>
																	</div>
																</div>
															)}

														</div>

													</div>

													<div className=" flex items-center justify-end mt-1 mr-2">
														<span className=" text-gray-300 font-medium text-xs">
															{getTimeDate(message.createdAt)}
														</span>
													</div>
												</div>
												<div>
													<div className="relative w-[36px]">
														<Image
															src={message.sender?.photo}
															height={36}
															width={36}
															title={message.sender?.fullName}
															alt="user"
															className="rounded-full w-full object-cover"
														/>
														<div className="absolute right-0 bottom-1">
															<SUserStatus active={message.sender?.activeStatus} />
														</div>
													</div>
												</div>
											</React.Fragment>
										) : (
											<React.Fragment>
												<div>
													<div className="relative w-[36px]">
														<Image
															src={message.sender?.photo}
															height={36}
															width={36}
															title={message.sender?.fullName}
															alt="user"
															className="rounded-full w-full object-cover"
														/>
														<div className="absolute right-0 bottom-1">
															<SUserStatus active={message.sender?.activeStatus} />
														</div>
													</div>
												</div>
												<div
													className="flex chat_item"
													style={{
														animationDelay: `0.1s`,
														transformOrigin: "left",
													}}
												>
													<div>
														<div className="flex items-center">
															{message.messageType === "text" && (
																<div className="chat_item max-w-xl w-fit bg-gray-100 relative text-gray-900 px-2.5 py-2 rounded-xl ml-2 rounded-tl-none flex flex-col">
																	<p className="text-gray-800 text-base font-light">
																		{message.text}
																	</p>
																</div>
															)}
															{message.messageType === "audio" && (
																<audio controls>
																	<source
																		src={message.files[0]}
																		type="audio/mpeg"
																	/>
																</audio>
															)}
															{message.messageType.includes("image") && (
																<div className="m-2 rounded-md border cursor-pointer">
																	<img
																		onClick={(_) =>
																			window.open(message.files[0], "_blank")
																		}
																		src={message.files[0]}
																		className="h-[200px] w-[360px] object-cover overflow-hidden rounded-md"
																		alt="image"
																	/>
																</div>
															)}
															{message.messageType.includes("pdf") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/pdf.png"
																	height={160}
																	width={140}
																	alt="pdf"
																/>
															)}
															{message.messageType.includes("doc") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/doc.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType.includes("csv") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/csv.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType.includes("zip") && (
																<Image
																	onClick={(_) =>
																		window.open(message.files[0], "_blank")
																	}
																	src="/file_types/zip.png"
																	height={160}
																	width={140}
																	alt="doc"
																	className="cursor-pointer"
																/>
															)}
															{message.messageType == "invoice" && (
																<div className="border m-2 rounded-[14px] w-[330px] bg-[#F0F0F0]">
																	<div className="flex flex-col items-center justify-start overflow-hidden">
																		<div className="flex items-center w-full justify-start p-2 bg-[#CFDDFF] rounded-t-[14px]">
																			Invoice No#{" "}
																			{getSixDigitFillingWithZero(
																				message.invoice?.receiptNo
																			)}
																		</div>
																		<div className="w-full py-1">
																			{message.invoice?.selectedServices.map(
																				(item) => {
																					return (
																						<div
																							key={item.id}
																							className="flex items-center justify-between gap-3 px-2"
																						>
																							<span className="basis-3/4 text-start">
																								{item.title}
																							</span>
																							<span className="basis-1/6 text-end">
																								X{item.quantity}
																							</span>
																							<span className="basis-1/6 text-end">
																								${item.price}
																							</span>
																						</div>
																					);
																				}
																			)}
																			{message.invoice?.discountAmount > 0 && (
																				<div className="flex items-center justify-between gap-3 px-2">
																					<span>Discount</span>
																					<span>
																						${message.invoice?.discountAmount}
																					</span>
																				</div>
																			)}
																		</div>
																		<div className="text-lg mt-1 w-full text-end px-2 text-[#005a09]">
																			Total- ${message.invoice?.payAmount}
																		</div>
																		{message.invoice?.paymentStatus !== "unpaid" ? (
																			<div className="flex justify-end w-full">
																				<div className="w-[95px] text-sm text-center h-7 flex items-center justify-center px-2 m-2  bg-[#19525A] opacity-50 text-white border border-[#19525A] rounded-full">
																					{message.invoice?.paymentStatus.replace(
																						message.invoice?.paymentStatus[0],
																						(c) => c.toUpperCase()
																					)}
																				</div>
																			</div>
																		) : (
																			<div className="flex items-center justify-end w-full mb-1">
																				<div
																					onClick={(e) => {
																						e.preventDefault();
																						_updateInvoice({
																							...message.invoice,
																							paymentStatus: "declined",
																						});
																					}}
																					className="w-[85px] cursor-pointer text-sm text-center h-7 flex items-center justify-center px-3 m-2 border border-[#19525A] rounded-full"
																				>
																					Decline
																				</div>

																				<div
																					onClick={(e) => {
																						setInvoice(message.invoice);
																						setShowPayNowModal(true);
																						// window.open(
																						// 	`/make-payment?invoiceId=${message.invoice?.receiptNo}`,
																						// 	"_blank",
																						// 	"noopener,noreferrer"
																						// );
																					}}
																					className="w-[85px] cursor-pointer text-sm text-center h-7 flex items-center justify-center px-3 m-2 bg-[#19525A] text-white border border-[#19525A] rounded-full"
																				>
																					Pay Now
																				</div>
																			</div>
																		)}
																	</div>
																</div>
															)}
															<div
																title="Menu"
																className="text-xl mt-1.5 relative flex items-start cursor-pointer rounded-full transition p-1 text-gray-500"
															>
																<BiDotsVerticalRounded
																	onClick={() => setSelected(index)}
																/>
																{renderOptions(index, "other")}
															</div>
														</div>
														<div className=" flex items-center justify-start mt-1 ml-2">
															<span className=" text-gray-300 font-medium text-xs">
																{getTimeDate(message.createdAt)}
															</span>
														</div>
													</div>
												</div>
											</React.Fragment>
										)}
									</div>
									<div ref={messagesEndRef} />
								</div>
							}
							{message.messageType == "case" && <div
								ref={reference}
								className="mt-16">
								{message.messageType == "case" && (
									<div
										ref={reference}
										className="w-full ">
										<div className="flex justify-between items-center overflow-hidden">
											<div className="w-[35%] md:w-[43%] h-[1px] bg-[#8D8D8D] pl-5"></div>
											<div className="text-[#8D8D8D] text-[8px] md:text-[12px]">New Case Created</div>
											<div className="w-[35%] md:w-[43%] h-[1px] bg-[#8D8D8D] pr-5"></div>
										</div>
										<div className="flex flex-col justify-center items-center mt-[8px]">
											<p className="text-[#19525A]">{message?.case?.caseName ? message?.case?.caseName : message?.caseName}</p>
											<div className="text-[#5B5B5B] text-center">
												<p className="text-[12px] leading-5 ">Created by {message?.sender?.fullName ? message?.sender?.fullName : message?.fullName}</p>
												<p className="text-[12px] leading-5 "> {format(parseISO(message?.case?.created ? message?.case?.created : new Date().toISOString()), 'p')}, {format(parseISO(message?.case?.created ? message?.case?.created : new Date().toISOString()), 'PP')}</p>
											</div>

										</div>
									</div>
								)}
							</div>}
						</>
					);
				})
				// .reverse()
			}
		</div>
	);
};
