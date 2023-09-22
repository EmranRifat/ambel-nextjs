import React, { useEffect, useState } from "react";
import { BiDotsVertical, BiSearch } from "react-icons/bi";
import { RiVideoAddFill } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { SUserStatus } from "./Components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import Image from "next/image";
import moment from "moment";
import { PulseLoader } from "react-spinners";

const MessageTopbar = ({
	conversationInfo,
	setGoBack,
	socket,
	roomId,
	meUser,
	selectedConversationId,
	allActiveUsers
}) => {

	const [typingMessage, setTypingMessage] = useState(null)
	const [disconnectedId, setDisconnectedId] = useState(null)
	useEffect(() => {
		socket?.on('receive_typing_message', (data) => {
			setTypingMessage(data)
		})
	}, [socket])

	const getAgoraToken = async () => {
		const res = await axios.post(
			"/agora-token/generateAccessToken",
			{
				channelName: roomId,
				uid: meUser._id,
				expireTime: 3600,
				role: "publisher",
			},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${cookie.get("jwt")}`,
				},
			}
		);
		return res.data.token;
	};

	const getOtherUser = (conversation) => {

		return conversation?.participants?.find((user) => user._id !== meUser?._id);
	};

	const getGroupActiveStatus = (conversation) => {
		return conversation?.participants?.some(
			(user) => user.activeStatus === true
		);
	};
	const isActive = (conversation) => {
		const users = (conversation?.participants?.find((user) => user._id !== meUser?._id))
		return allActiveUsers.some((user) => user.userId === users?._id);
	}
	const isNotActiveUser = (conversation) => {
		const users = (conversation?.participants?.find((user) => user._id !== meUser?._id))
		if (!allActiveUsers.some((user) => user.userId === users?._id)) {
			return users
		}
	}

	useEffect(() => {
		socket.on('send-inactive-user-id', id => {
			setDisconnectedId(id)
		})
	}, [])
	// console.log(disconnectedId && getOtherUser(conversationInfo)?._id === disconnectedId ? moment(Date.now()).fromNow() : (getOtherUser(conversationInfo)))
	return (
		<>
			<div className="h-[10vh] flex justify-between shadow-sm">
				<div className="flex items-center px-3 py-4">
					<div
						onClick={setGoBack}
						title="Go back"
						className="text-xl md:hidden hover:bg-slate-200 hover:text-gray-800 rounded-full transition p-2 sm:p-2.5 text-gray-600 mr-2"
					>
						<AiOutlineArrowLeft />
					</div>
					<div className="relative">
						{conversationInfo?.conversationType === "group" ? (
							<div className="relative h-[45px] w-[45px] rounded-full border">
								{conversationInfo?.conversationPhoto ? (
									<Image
										src={conversationInfo?.conversationPhoto}
										alt="photo"
										height={45}
										width={45}
										className="rounded-full object-cover"
									/>
								) : (
									<>
										<div className="absolute right-0 top-0 h-7 w-7 bg-emerald-300 rounded-full overflow-hidden">
											{conversationInfo?.participants[1]?.photo && (
												<Image
													src={conversationInfo?.participants[1].photo}
													alt="p2"
													height={28}
													width={28}
													className="rounded-full object-cover"
												/>
											)}
										</div>
										<div className={`absolute left-0 bottom-0 h-7 w-7 rounded-full overflow-hidden ${isActive(conversationInfo) ? 'bg-emerald-600' : "bg-gray-600"}`}>
											{conversationInfo?.participants[0]?.photo && (
												<Image
													src={conversationInfo?.participants[0].photo}
													alt="p1"
													height={28}
													width={28}
													className="rounded-full object-cover"
												/>
											)}
										</div>
									</>
								)}
							</div>
						) :
							getOtherUser(conversationInfo)?.photo ? (
								<Image
									src={getOtherUser(conversationInfo)?.photo}
									alt="user"
									height={45}
									width={45}
									className="object-cover rounded-full"
								/>
							) : (
								<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
									{(getOtherUser(conversationInfo)?.fullName ?? "Ambel User")[0].toUpperCase()}
								</div>
							)}
						<div className="absolute right-[2px] bottom-[2px]">
							<SUserStatus
								active={
									conversationInfo?.conversationType === "group"
										? getGroupActiveStatus(conversationInfo)
										: isActive(conversationInfo)
								}
							/>
						</div>
					</div>
					<div className="flex flex-col ml-3">
						<h6 className="font-normal text-lg sm:text-xl text-gray-700">
							{conversationInfo?.conversationType === "group"
								? conversationInfo?.conversationName
								: (getOtherUser(conversationInfo)?.fullName ?? "Ambel User")}
						</h6>
						<span className="text-sm text-emerald-500">
							{conversationInfo?.conversationType === "group"
								? getGroupActiveStatus(conversationInfo)
									? "Active"
									: "Offline"
								: isActive(conversationInfo)
									? (typingMessage?.message && (selectedConversationId === typingMessage?.selectedConversationId) ? typingMessage?.message && (selectedConversationId === typingMessage?.selectedConversationId) && <span className=" text-gray-700 duration-150 flex items-center">
										typing <PulseLoader color="#000" size={3} /></span> : "Active")
									: <span
										className="text-gray-700">
										Offline {
											disconnectedId && getOtherUser(conversationInfo)?._id === disconnectedId ? moment(Date.now()).fromNow() : moment(getOtherUser(conversationInfo)?.lastActive)?.fromNow()}
									</span>}
						</span>
					</div>
				</div>
				<div className="md:flex hidden items-center mr-2">
					<div
						title="Search Messages"
						className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:p-2.5 text-[#8D8D8D]"
					>
						<BiSearch />
					</div>
					<div
						title="Audio Call"
						className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:2.5 text-[#8D8D8D]"
					>
						<BsTelephone />
					</div>
					<div
						title="Video Call"
						className="text-xl cursor-pointer hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:2.5 text-[#8D8D8D]"
					>
						{/* <Link href={"/rtc/video-call"}> */}
						<RiVideoAddFill
							onClick={async () => {
								const call_token = await getAgoraToken();
								const data = {
									roomId,
									callerName: meUser.fullName,
								};
								await socket?.emit("make_call", data);

								window.open(
									`${window.location.origin}/rtc/video-call?channelName=${roomId}&token=${call_token}&hostId=${meUser._id}&callerName=${data.callerName}`,
									"Popup",
									"location,status,scrollbars,resizable,width=600, height=600"
								);
							}}
						/>
						{/* </Link> */}
					</div>
					<div
						title="More"
						className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:2.5 text-[#8D8D8D]"
					>
						<BiDotsVertical />
					</div>
				</div>
			</div>
		</>
	);
};

export default MessageTopbar;
