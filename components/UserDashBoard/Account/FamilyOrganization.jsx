// @ts-nocheck
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../../Modal";
import AddFamilyOrgaModal from "./AddFamilyOrgaModal";
import AddMemberModal from "./AddMemberModal";
import MemberSettingsModal from "./MemberSettingsModal";
import { connect } from "react-redux";
import {
	updateFamilyOrg,
	getUserFamilyOrg,
	deleteFaimlyOrgMember,
	getUserFamilyOrgMember,
} from "../../../store/actions/userFamilyOrg";

const member = [
	{
		name: "Delawar Hossain",
		reg: "brother",
	},
	{
		name: "Delawar Hossain",
		reg: "brother",
	},
	{
		name: "Delawar Hossain",
		reg: "brother",
	},
	{
		name: "Delawar Hossain",
		reg: "brother",
	},
];
const FamilyOrganization = (props) => {
	const [familyOrgaModal, setFamilyOrgaModal] = useState(false);
	const [addMemberModal, setAddMemberModal] = useState(false);
	const [memberSettingsModal, setMemberSettingsModal] = useState(false);
	const [memberId, setMemeberId] = useState(null);
	const [familyOrgId, setFamilyOrgId] = useState(null);
	const [getId, setGetId] = useState(null);

	useEffect(() => {
		props.getUserFamilyOrg();
		// props.getUserFamilyOrgMember();
	}, []);

	const GetId = (id) => {
		setGetId(id);
	};

	return (
		<React.Fragment>
			<div className="pb-8 flex flex-col">
				{familyOrgaModal && (
					<Modal onClick={setFamilyOrgaModal}>
						<AddFamilyOrgaModal setFamilyOrgaModal={setFamilyOrgaModal} />
					</Modal>
				)}
				{addMemberModal && (
					<Modal onClick={setAddMemberModal}>
						<AddMemberModal
							getId={getId}
							setAddMemberModal={setAddMemberModal}
						/>
					</Modal>
				)}
				{memberSettingsModal && (
					<Modal onClick={setMemberSettingsModal}>
						<MemberSettingsModal
							memberId={memberId}
							familyOrgId={familyOrgId}
							setMemberSettingsModal={setMemberSettingsModal}
						/>
					</Modal>
				)}
				<div className="flex justify-between items-center">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Family and Organiztion
					</span>
					<button
						onClick={() => setFamilyOrgaModal(true)}
						className="w-[112px] h-[36px] bg-[#19525A] text-white rounded-[8px] text-[14px]"
					>
						Add new
					</button>
				</div>
				<div className="bg-white p-5 text-[#5B5B5B] flex flex-col w-full rounded-lg shadow-md mt-5 pb-8">
					<p>
						Through a single profile, family members may now make appointments
						on each other&apos;s behalf. Simply said, one family member may use
						their patient profile to schedule individual visits for the whole
						family.
					</p>
				</div>
				{props.familyOrgData &&
					props.familyOrgData.map((familyOrg) => (
						<div key={familyOrg._id}>
							<div className="flex justify-between items-center mt-8">
								<div>
									<span className="text-[#5B5B5B] text-[32px] font-[700] mr-4">
										{familyOrg.name}
									</span>
									<Image
										src="/icons/famlywrite.png"
										height={"25px"}
										width="20px"
										alt="family"
									/>
								</div>

								<button
									onClick={() => {
										setAddMemberModal(true);
										GetId(familyOrg._id);
									}}
									className="w-[112px] h-[36px] bg-[#19525A] text-white rounded-[8px] text-[14px]"
								>
									Add new
								</button>
							</div>
							{familyOrg?.members?.length > 0 ? (
								<div className="bg-white shadow-md py-1 h-full mt-3">
									<div className="overflow-x-auto">
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
														Relation
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-[#5B5B5B] text-[16px]"
													>
														Settings
													</th>
												</tr>
											</thead>
											<tbody>
												{familyOrg.members.map((member) => (
													<tr
														key={member._id}
														className={`bg-white  border-b hover:bg-gray-50`}
													>
														<td
															scope="row"
															className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
														>
															{member.name}
														</td>
														<td
															scope="row"
															className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
														>
															{member.relationWithUser}
														</td>
														<td
															scope="row"
															className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
														>
															<div className="flex items-center">
																<div
																	onClick={() => {
																		props
																			.deleteFaimlyOrgMember(
																				member._id,
																				familyOrg._id
																			)
																			.then((res) => {
																				// console.log(res);
																				props.getUserFamilyOrg();
																			});
																	}}
																	className="mr-3 cursor-pointer"
																>
																	<Image
																		src="/icons/delete.png"
																		height={"27px"}
																		width="25px"
																		alt="family"
																	/>
																</div>
																<div
																	onClick={() => {
																		setMemberSettingsModal(true);
																		setFamilyOrgId(familyOrg._id);
																		setMemeberId(member._id);
																	}}
																>
																	<Image
																		src="/icons/settings.png"
																		height={"23px"}
																		width="23px"
																		alt="family"
																	/>
																</div>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							) : (
								<Image
									src="/loading.gif"
									height={30}
									width={30}
									alt="loading"
								/>
							)}
						</div>
					))}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		familyOrgData: state?.userFamilyOrg?.info?.allFamilyOrg,
		loading: state?.userFamilyOrg?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserFamilyOrg,
	updateFamilyOrg,
	deleteFaimlyOrgMember,
	getUserFamilyOrgMember,
})(FamilyOrganization);
