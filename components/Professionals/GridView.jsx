/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { MdLocationOn, MdWork } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";
import Modal from "../Modal";
import ProfessionalDetailsModal from "./ProfessionalDetailsModal";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const GridView = ({ item }) => {
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
			<div className="bg-white rounded-lg border border-gray-200 shadow-md relative">
				<div className="flex flex-col items-end justify-center w-full absolute top-1 right-2">
					<div className="text-[12px] text-[#10B982] relative">
						{item?.isAvailable ? "Available" : "Not Available"}
					</div>
					<div className="text-[12px] text-gray-500 relative inline-flex items-center">
						<BsFillStarFill color="hsl(45.647058823529406, 100%, 50%)" className="size={18} mx-1" />
						4.7 (30)
					</div>
				</div>
				<div className="flex flex-col items-center py-[13px]">
					<img
						className="mb-3 w-[100px] h-[100px] rounded-full shadow-lg"
						src={`${
							item?.user?.photo || item?.user?.photo != ""
								? item?.user?.photo
								: "drImage.jpg"
						}`}
						alt={`${item?.user?.fullName}`}
					/>
					<h5 className="mb-1 text-[24px] font-medium text-[#5B5B5B]">
						{ item?.user?.fullName.length> 10 ? item?.user?.fullName.slice(0,16) +"...": item?.user?.fullName }
					</h5>
					<span className="text-[16px] font-[500] text-[#5B5B5B]">
						{/* {item?.degree?.map((item) => item.name).join(", ")} */}
						<h1 className="text- lg:text-[16px]   text-[#474747d2] text-[500] ">
						{/* {item?.degree?.map((item) => item.name).join(", ")} */}
						MBBS,FRCS,MSBC (UK)
					</h1>
					</span>
					<span className="text-sm  text-gray-500">{item.work}</span>

					<div className="flex justify-between items-center w-full px-[13px] mt-3">
						<div className="text-[12px] w-full font-[500] text-[#5B5B5B] inline-flex items-center">
							<MdWork size={16} color="#003F48" className="m-1" />
							{item.designation}
						</div>

						<div className="text-[12px] w-full font-[500] text-[#5B5B5B] inline-flex items-center">
							<MdLocationOn size={24} color="#D2000D" />
							{item.user?.address}, {item.user?.city}
						</div>
					</div>
					<div className="flex justify-between items-center w-full px-[13px] mt-1">
						<div className="text-[12px] w-full font-[500] text-[#5B5B5B] inline-flex items-center">
							<BiDollar size={18} color="#003F48" className="m-1" />
							{item.consultancyFee} USD/hr
						</div>

						<div className="text-[12px] w-full font-[500] text-[#5B5B5B] inline-flex items-center">
							<RiShieldCheckLine size={18} color="#10B982" />
							(1k Completed)
						</div>
					</div>
					<div className="flex mt-4  space-x-3">
						<button
							onClick={() => {
								if (cookie.get("jwt")) {
									createNewChat(item.user?._id);
								} else {
									router.push(
										"/" + `?requireLogin=true&from=professionals`,
										"/"
									);
								}
							}}
							className="w-[125px] h-[36px]  text-gray-600 justify-center inline-flex items-center py-2 px-4 text-sm font-medium text-center hover:bg-blue-800 rounded-full border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Contact Now
						</button>
						{/* <Link href={`/business/${item.toString()}`}> */}
						<button
							onClick={() => setOpenDetailsModal(!openDetailsModal)}
							className="w-[125px] h-[36px]  text-[#5B5B5B] justify-center inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
						>
							Details
						</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default GridView;
