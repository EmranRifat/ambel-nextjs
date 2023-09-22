import React from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "../../../utils/axios";
import PulseLoader from "react-spinners/PulseLoader";
import cookie from "js-cookie";

const GroupMembersModal = (props) => {
	const [search, setSearch] = React.useState("");
	const [isUpLoading, setIsUpLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [participants, setGroupMembers] = React.useState(props.participants);
	const [groupinfo, setGroupInfo] = React.useState({
		conversationName: "",
		participants: [],
		conversationType: "group",
	});

	useEffect(() => {
		setGroupMembers(
			props.participants.filter((user) =>
				user?.fullName?.toLowerCase()?.includes(search.toLowerCase())
			)
		);
	}, [props.participants, search]);

	const isUserInGroup = (user) => {
		return groupinfo.participants.find((item) => item === user._id);
	};

	const createGroup = async () => {
		if (
			groupinfo.conversationName.trim() === "" ||
			groupinfo.participants.length === 0
		) {
			setError("Please fill all the fields");
			return;
		}
		setIsUpLoading(true);
		try {
			const res = await axios.post(
				"/conversations/createConversation",
				groupinfo,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			);
			if (res.data.status === "success") {
				setIsUpLoading(false);
				props.setShowCreateGroupModal(false);
			}
		} catch (err) {
			// console.log(err);
			setIsUpLoading(false);
		}
	};

	return (
		<div className="w-[380px] h-[520px] relative mx-auto mt-[20px] py-6 px-5 z-100 flex flex-col items-center bg-white rounded-md">
			<div className="absolute top-5 right-5">
				<span
					onClick={() => props.setShowCreateGroupModal(false)}
					className="text-xl text-[#5B5B5B] cursor-pointer"
				>
					✖
				</span>
			</div>
			<div className="w-full">
				<div className="w-full mt-3">
					<span className="text-[#5B5B5B] text-[15px]">Group Name</span>
					<input
						value={groupinfo.conversationName}
						placeholder="Your Group Name"
						name="conversationName"
						onChange={(e) => {
							setError("");
							setGroupInfo((prevState) => {
								prevState["conversationName"] = e.target.value;
								return { ...prevState };
							});
						}}
						type="text"
						className="w-full outline-none rounded-md border border-gray-300 py-2 px-4 text-sm"
					/>
				</div>
				<div className="w-full mt-3 flex items-center justify-between border py-1.5 px-3 border-gray-200 rounded text-sm mr-5 hover:ring-2 ring-indigo-500">
					<input
						type="text"
						placeholder="Search By Name"
						name="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="outline-none p-1 w-full focus:ring-0 border-none text-sm"
					/>
					<div
						title="Filter"
						className="hover:bg-slate-200 cursor-pointer hover:text-gray-700 rounded-full transition sm:p-1 text-[#8D8D8D] mx-0"
					>
						<BiSearch className="text-lg text-gray-600" />
					</div>
				</div>
				<div className="mt-3 h-[280px] overflow-y-auto">
					<div className="flex flex-col gap-1">
						{participants.map((user) => {
							return (
								<div
									key={user?._id}
									className="flex items-center justify-between py-1 px-1 hover:bg-slate-200"
								>
									<div className="flex">
										<div className="w-8 h-8 rounded-full bg-[#F2F2F2] overflow-hidden">
											<img
												src={user?.photo}
												alt="profile_image"
												className="w-8 h-8 object-cover rounded-full"
											/>
										</div>
										<div className="ml-3">
											<span className="text-sm">{user?.fullName}</span>
										</div>
									</div>
									<div
										onClick={() => {
											setError("");
											setGroupInfo((prevState) => {
												if (!isUserInGroup(user))
													prevState["participants"].push(user._id);
												return { ...prevState };
											});
										}}
										className={`${
											isUserInGroup(user)
												? "bg-sky-300 text-gray-300"
												: "cursor-pointer bg-sky-400 text-white"
										} rounded-md px-3 py-1 text-[12px]`}
									>
										{isUserInGroup(user) ? "Added" : "Add"}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="w-full flex gap-2 mt-4 justify-between">
					{error ? (
						<div className="text-rose-500 text-sm mt-1">{error}</div>
					) : (
						<>..</>
					)}
					<div className="flex justify-end gap-2">
						<div
							onClick={() => props.setShowCreateGroupModal(false)}
							className="border border-slate-300 px-2 py-1 rounded-[4px] cursor-pointer"
						>
							Cancel
						</div>
						<div
							onClick={() => {
								createGroup();
							}}
							className="border cursor-pointer border-[#19525A] bg-[#19525A] px-2 py-1 rounded-[4px] text-white"
						>
							{isUpLoading ? (
								<PulseLoader color="#ffffff" size={12} />
							) : (
								"Create"
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupMembersModal;
