import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Dropdown from "../../../Dropdown";
import { BiDotsVerticalRounded, BiEdit } from "react-icons/bi";
import AddPractitionerModal from "./PractitionersModal";
import Modal from "../../../Modal";
import { useState } from "react";
import ActivitiesModal from "../ActivitiesModal";
import ServicesModal from "../ServicesModal";
import { getPractitioners } from "../../../../StatelessAPI/practitionerApiCalls";
import { getBranches } from "../../../../StatelessAPI/branchApiCalls";
import { getBusinessInfo } from "../../../../store/actions/business";
import { connect } from "react-redux";
import moment from "moment";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "../../../../utils/axios";

const PractitionerList = (props) => {
	const [openPractitionerModal, setOpenPractitionerModal] = useState(false);
	const [openActivitiesModal, setOpenActivitiesModal] = useState(false);
	const [openServicesModal, setOpenServicesModal] = useState(false);
	const [practitioners, setPractitioners] = useState([]);
	const [branchs, setBranches] = useState([]);
	const [selectedBranch, setSelectedBranch] = useState("All Branches");
	const [prev, setPrev] = useState([]);
	const editOptions = useRef(null);
	const [showEditOptions, setShowEditOptions] = useState(false);
	const [clicked, setClicked] = useState(-1);
	const router = useRouter();
	const _getPractitioners = async () => {
		setPractitioners([]);
		const fetchedPractitioners = await getPractitioners(
			props.info?.business?._id
		);
		setPractitioners([...fetchedPractitioners]);
		setPrev([...fetchedPractitioners]);
	};

	const getAllBranches = async () => {
		const fetchBranches = await getBranches(props.info?.business?._id);
		setBranches([...fetchBranches]);
	};

	useEffect(() => {
		if (!props.info?.business) props.getBusinessInfo();
		_getPractitioners();
		getAllBranches();
	}, []);

	const handleBranchSearch = (item) => {
		setSelectedBranch(item);
		if (item.includes("All Branches")) {
			setPrev(practitioners);
		} else if (branchs.length > 0 && practitioners.length > 0) {
			setPrev(
				practitioners.filter((s) => {
					let sb = [];
					sb = s.branches.filter((b) =>
						b.name.toLowerCase().includes(item.toLowerCase())
					);
					if (sb.length > 0) return s;
					else[];
				})
			);
		}
	};

	const handleNameSearch = (e) => {
		let val = e.target.value;
		setPrev(
			practitioners.filter((p) =>
				p.user.fullName.toLowerCase().includes(val.toLowerCase())
			)
		);
	};

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
		<div className="w-full h-[60vh]">
			<div className="w-full flex justify-between">
				{openPractitionerModal && (
					<Modal onClick={setOpenPractitionerModal}>
						<AddPractitionerModal
							setOpenPractitionerModal={setOpenPractitionerModal}
							getPractitioners={_getPractitioners}
							businessId={props.info?.business?._id}
						/>
					</Modal>
				)}

				{openActivitiesModal && (
					<Modal onClick={setOpenActivitiesModal} closeOnOutsideClick={true}>
						<ActivitiesModal setOpenActivitiesModal={setOpenActivitiesModal} />
					</Modal>
				)}
				{openServicesModal && (
					<Modal onClick={setOpenServicesModal} closeOnOutsideClick={true}>
						<ServicesModal setOpenServicesModal={setOpenServicesModal} />
					</Modal>
				)}
				<span className="text-[32px] font-[700] text-[#5B5B5B]">
					All Practitioner
				</span>
				<button
					onClick={() => {
						setOpenPractitionerModal(true);
					}}
					className="w-[172px] h-[40px] bg-[#19525A] text-[20px] text-white rounded-md"
				>
					New practitioner
				</button>
			</div>
			<div className="w-full flex justify-between bg-[#F0F3FC] shadow-xl p-3 mt-3 rounded-md">
				<div className="flex justify-between gap-3">
					<Dropdown
						items={
							branchs.length > 0 && [
								"All Branches",
								...branchs.map((b) => b.name),
							]
						}
						selected={selectedBranch}
						onSelected={(item) => handleBranchSearch(item)}
						width={"136px"}
					/>
					<Dropdown
						items={["Patient", "Practitioner", "Staff"]}
						selected={"All Staffs"}
						onSelected={(item) => {
							// console.log(item);
						}}
						width={"136px"}
					/>
				</div>
				<div className="flex justify-between items-center">
					<input
						type="text"
						placeholder="Search name"
						className="w-[358px] h-[32px] rounded-2xl px-2 outline-none focus:border-gray-400 border-[1px] border-[#42424280]"
						onChange={handleNameSearch}
					/>
					<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
				</div>
			</div>
			<div className="w-full bg-white shadow-md mb-4 py-1 h-full">
				<div className="w-full">
					<table className="w-full text-sm text-left">
						<thead className="text-gray-600 border-b-2 border-gray-200">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Branch
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Services
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Task
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Resources
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Employed
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Activities
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{prev.map((practitioner, index) => {
								let bgColor = "";
								switch (practitioner.status) {
									case "pending":
										bgColor = "bg-orange-50 hover:bg-orange-100";
										break;
									case "active":
										bgColor = "bg-emerald-50 hover:bg-emerald-100";
										break;
									case "inactive":
										bgColor = "bg-rose-50 hover:bg-rose-100";
										break;
									default:
										bgColor = "bg-gray-50 hover:bg-gray-100";
										break;
								}
								return (
									<tr
										className={`${bgColor} border-b hover:bg-gray-50`}
										key={index}
									>
										<td
											scope="row"
											className="px-6 py-4 font-normal text-gray-700"
										>
											<div className="flex w-full items-center h-full">
												{practitioner?.user?.photo ? (
													<Image
														src={practitioner?.user?.photo}
														alt="patient"
														height={40}
														width={40}
														className="object-cover rounded-full"
													/>
												) : (
													<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
														{practitioner?.user

															? (practitioner?.user?.fullName ?? "Ambel Practitioner")[0].toUpperCase()
															: (practitioner?.name ??
																"Ambel Practitioner")[0].toUpperCase()}

													</div>
												)}
												<div className="mx-2 w-[120px] overflow-hidden">
													<p className="text-md font-normal text-gray-700">
														{practitioner?.user
															? practitioner?.user?.fullName ?? "Ambel Practitioner"
															: practitioner?.name ?? "Ambel Practitioner"}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 font-normal text-gray-700">
											{practitioner?.branches?.map((branch, index) => {
												return (
													<span
														className="py-1 text-sm font-medium text-gray-700"
														key={index}
													>
														{branch?.name}
													</span>
												);
											})}
										</td>

										<td
											onClick={() => {
												setOpenServicesModal(true);
											}}
											scope="row"
											className="px-6 py-4 cursor-pointer font-normal text-[#008BDA] text-[14px] whitespace-nowrap"
										>
											View
										</td>
										<td
											scope="row"
											className="px-6 py-4 cursor-pointer font-normal text-[#008BDA] text-[14px]  whitespace-nowrap"
										>
											View
										</td>
										<td
											scope="row"
											className="px-6 py-4 cursor-pointer font-normal text-[#008BDA] text-[14px]  whitespace-nowrap"
										>
											View
										</td>
										<td
											className={`py-4 font-normal ${practitioner.status == "pending"
												? "text-orange-500"
												: "text-gray-700"
												}  text-center`}
										>
											{practitioner.status == "pending"
												? "Pending"
												: moment(
													practitioner.createdAt,
													moment.ISO_8601
												).format("D MMM, YYYY")}
										</td>
										<td
											onClick={() => {
												setOpenActivitiesModal(true);
											}}
											scope="row"
											className="px-6 py-4 cursor-pointer font-normal text-[#008BDA] text-[14px]  whitespace-nowrap"
										>
											View
										</td>
										<td className="relative">

											{showEditOptions &&
												clicked == index &&
												clicked !== -1 && (
													<div className="absolute flex flex-col top-0 right-11 h-fit rounded-md w-[150px] bg-white shadow border">
														<div
															onClick={(e) => {
																createNewChat(practitioner.user?._id);
															}}
															className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
														>
															Message
														</div>
														<div
															onClick={(e) => {
																// console.log("clicked change branch");
															}}
															className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
														>
															Change Branch
														</div>
														<div
															onClick={(e) => {
																// console.log("clicked pause activity");
															}}
															className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
														>
															Pause Activity
														</div>
														<div
															onClick={(e) => {
																// console.log("clicked remove staff");
															}}
															className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
														>
															Remove Practitioner
														</div>
													</div>
												)}

											<div
												ref={editOptions}
												onClick={(event) => {
													setClicked(index);
													setShowEditOptions(!showEditOptions);
												}}
												className="py-6 cursor-pointer font-normal flex items-center justify-center text-gray-700 hover:text-sky-400"
											>
												<BiEdit />
												<span className="ml-1"> Edit</span>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* <div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
          <button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
            Show all
          </button>
        </div> */}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
		authUser: state?.auth?.authUser,
		// branchLoading:state?.busin
	};
};
export default connect(mapStateToProps, {
	getBusinessInfo,
})(PractitionerList);
