/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { MdLocationOn, MdWork } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import Modal from "../Modal";
import ProfessionalDetailsModal from "./ProfessionalDetailsModal";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { TbBriefcase } from "react-icons/Tb";

const ListView = ({ item }) => {
	console.log(item)
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
	const router = useRouter();

	const createNewChat = async (recieverId) => {
		try {
			const url = "/conversations/createConversation";
			const res = await axios.post(
				url,
				{
					conversationType: "oneToOne",
					participants: [recieverId],
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
					},
				}
			);

			const conversationId =
				res.data.conversationId ?? res.data.conversation?._id;

			router.push(
				`/business-dashboard/message?conversationId=${conversationId}`,
				"/business-dashboard/message"
			);
		} catch (error) {
			//console.log(error.response.data.message);
		}
	};
	return (
		<>
			{openDetailsModal && (
				<Modal onClick={setOpenDetailsModal}>
					<ProfessionalDetailsModal setOpenDetailsModal={setOpenDetailsModal} />
				</Modal>
			)}
			<div className="w-full py-6 flex justify-between items-center bg-white border-b-2">
				<div className="flex w-[180px] flex-col items-center mb-6">
					<img
						className="w-[100px] h-[100px] rounded-full shadow-lg"
						src={`${item?.user?.photo || item?.user?.photo != ""
							? item?.user?.photo
							: "drImage.jpg"
							}`}
						alt={`${item?.user?.fullName}`}
					/>
					<div className="text-[12px] mt-8 text-[#10B982] relative">
						{item?.isAvailable ? "Available" : "Not Available"}
					</div>
					<div className="text-[14px] text-gray-500  relative inline-flex items-center">
						<BsFillStarFill color="#FFC200" className="mx-0.5" />
						4.7 (30)
					</div>
				</div>
				<div className="flex flex-col w-full text-left">
					<div className="flex items-center w-full">
						<h1 className="text-sm lg:text-[28px] mr-3  text-[#5B5B5B]">
							{item?.user?.fullName}
						</h1>
						<div className="text-[12px] font-[500] text-[#5B5B5B] inline-flex items-center">
							<RiShieldCheckLine size={18} color="#10B982" />
							(1k Completed)
						</div>
					</div>
					<h1 className="text-sm lg:text-[16px]   text-[#474747e5] text-[700] mt-2">
						{/* {item?.degree?.map((item) => item.name).join(", ")} */}
						MBBS,FRCS,MSBC (UK)
					</h1>
					<h1 className="text-sm lg:text-[16px]  text-[#5B5B5B] mt-2">
						Works on <span className="text-[#0372BA]">Dhaka Medical Collage </span>
					</h1>
					<div className="flex justify-between items-start pt-16">
						<div className="text-[14px] w-full ml-4 font-[500] text-[#5B5B5B] inline-flex items-center">
							<TbBriefcase size={16} color="#09424b" className="m-1" />
							{item.myType}
						</div>

						<div className="text-[12px] w-full font-[500] text-[#5B5B5B]">
							<div className="inline-flex">
								<MdLocationOn size={16} color="#D2000D" />
								{item.user?.address}, {item.user?.city}
							</div>
							<div className="ml-4">
								{item.user?.country}
							</div>
						</div>


						<div className="text-[12px] w-full font-[500] text-[#5B5B5B] inline-flex items-center">
							<BiDollar size={18} color="#003F48" className="m-1" />
							{item.consultancyFee} USD/hr
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-[200px] items-center">
					<button
						onClick={() => {
							if (cookie.get("jwt")) {
								createNewChat(item.user?._id);
							} else {
								router.push("/" + `?requireLogin=true&from=professionals`, "/");
							}
						}}
						className="w-[132px] py-2 px-4 text-md font-medium text-center text-white bg-[#19525A] rounded-full "
					>
						Chat Now
					</button>
					{/* <Link href={`/business/${item.toString()}`}> */}
					<button
						onClick={() => setOpenDetailsModal(!openDetailsModal)}
						className="w-[132px] py-2 px-4 text-md font-medium text-center text-white bg-[#10B982] rounded-full border border-gray-300"
					>
						Details
					</button>
					{/* </Link> */}
				</div>
			</div>
		</>
	);
};

export default ListView;
