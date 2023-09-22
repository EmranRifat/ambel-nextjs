import React, { useEffect } from "react";
import Image from "next/image";
import { BiDotsHorizontalRounded, BiSearch } from "react-icons/bi";
import { UserStatus } from "./Components";
import { getTimeDate, getBigToSmallText } from "../../utils/utility";
import { useState } from "react";

const MessageLeftSide = ({
	conversationList,
	setConversationId,
	selectedConversationId,
	myUser,
	allActiveUsers
}) => {
	const [search, setSearch] = React.useState("");

	const [convList, setConvList] = React.useState([]);

	const getOtherUser = (conversation) => {

		const otherUser = conversation?.participants?.find(
			(user) => user._id !== myUser?._id
		);
		return otherUser;
	};

	useEffect(() => {
		setConvList(
			conversationList.filter(
				(conversation) =>
					conversation?.conversationName
						?.toLowerCase()
						.includes(search.toLowerCase()) ||
					getOtherUser(conversation)
						?.fullName.toLowerCase()
						.includes(search.toLowerCase())
			)
		);
	}, [conversationList, search]);

	const getGroupActiveStatus = (conversation) => {
		return conversation?.participants?.some((user) => user.activeStatus);
	};
	const isActive = (id) => {
		return allActiveUsers.some((user) => user.userId === id);
	}
	return (
		<React.Fragment>
			<div className="w-full h-full rounded-lg shadow-lg bg-white md:block ">
				<form className="px-4 py-2">
					<h6 className="font-medium py-1 text-lg text-gray-600">Chats</h6>
					<div className="w-full flex items-center justify-between border py-1.5 px-3 border-gray-200 rounded text-sm mr-5 hover:ring-2 ring-indigo-500">
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="outline-none p-1 w-full focus:ring-0 border-none"
						/>
						<div
							title="Filter"
							className="hover:bg-slate-200 cursor-pointer hover:text-gray-700 rounded-full transition sm:p-1 text-[#8D8D8D] mx-0"
						>
							<BiSearch className="text-xl text-gray-600" />
						</div>
					</div>
				</form>
				<div className="bg-gray-100 h-[1px] w-full my-3"></div>
				<div className="overflow-y-auto h-[53vh]">
					{convList.length > 0 ? (
						convList.map((conv, i) => {
							// console.log(conv);
							return (
								<React.Fragment key={conv._id}>
									<div
										onClick={(_) => {
											setConversationId(conv._id);
										}}
										className={
											`hover:bg-[#929ea333]` +
											` cursor-pointer` +
											` ${selectedConversationId === conv._id
												? "bg-[#929ea333]"
												: ""
											} `
										}
									>
										<div className="flex justify-between items-center py-3 mx-4 cursor-pointer ">
											<div className="flex justify-start items-center">
												<div className="relative">
													{conv.conversationType === "group" ? (
														<div className="relative h-[45px] w-[45px] rounded-md border">
															{conv.conversationPhoto ? (
																<Image
																	src={conv.conversationPhoto}
																	alt="photo"
																	height={45}
																	width={45}
																	className="rounded-md object-cover"
																/>
															) : (
																<>
																	<div className={"absolute right-0 top-0 h-7 w-7 bg-emerald-300 rounded-full overflow-hidden"}>
																		{conv.participants[1]?.photo && (
																			<Image
																				src={conv.participants[1].photo}
																				alt="photo"
																				height={28}
																				width={28}
																				className="rounded-full object-cover"
																			/>
																		)}
																	</div>
																	<div className="absolute left-0 bottom-0 h-7 w-7 bg-emerald-600 rounded-full overflow-hidden">
																		{
																			conv.participants[0]?.photo ? (
																				<Image
																					src={conv.participants[0]?.photo}
																					alt="patient"
																					height={40}
																					width={40}
																					className="object-cover rounded-full"
																				/>
																			) : (
																				<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
																					{conv.participants[0]?.fullName[0].toUpperCase()}
																				</div>

																			)}
																	</div>
																</>
															)}
														</div>
													) :
														getOtherUser(conv)?.photo ? (
															<Image
																src={getOtherUser(conv)?.photo}
																alt="user"
																height={45}
																width={45}
																className="object-cover rounded-full"
															/>
														) : (
															<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
																{getOtherUser(conv)?.fullName[0].toUpperCase()}
															</div>

														)}
													<div className="absolute -right-1 bottom-0">
														<UserStatus
															active={
																conv.conversationType === "group"
																	? getGroupActiveStatus(conv)
																	: isActive(getOtherUser(conv)?._id)
															}
														/>
													</div>
												</div>
												<div className="flex ml-2 border-b-1">
													<div className="flex flex-col">
														<span className="text-sm font-medium">
															{conv.conversationType === "group"
																? conv.conversationName
																: getOtherUser(conv)?.fullName}
														</span>
														{conv.lastMessage && (
															<small className="text-[.8rem] text-gray-600">
																{getBigToSmallText(
																	conv.lastMessage?.text ?? "",
																	20
																)}
																<span className="font-bold text-yellow-500 mx-1"></span>
																<span className="text-gray-400">
																	{getTimeDate(conv.lastMessage.createdAt)}
																</span>
															</small>
														)}
													</div>
												</div>
											</div>
											<div
												title="Option"
												className="hover:bg-slate-300 p-1 cursor-pointer hover:text-gray-700 rounded-full transition text-[#8D8D8D] mx-0"
											>
												<BiDotsHorizontalRounded className="text-2xl  text-gray-500" />
											</div>
										</div>
										<div className="flex justify-around content-center">
											<div className="w-[20%]"></div>
											<div className="bg-gray-100 h-[1px] w-[80%]"></div>
										</div>
									</div>
								</React.Fragment>
							)
						})
					) : (
						<p className="text-gray-400 p-3 text-center">No users found..</p>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default MessageLeftSide;
