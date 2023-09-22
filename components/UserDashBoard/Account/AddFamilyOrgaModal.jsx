import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	updateFamilyOrg,
	getUserFamilyOrg,
} from "../../../store/actions/userFamilyOrg";

const AddFamilyOrgaModal = (props) => {
	// console.log(props.familyOrgData._id)
	const [familyOrgData, setFamilyOrgData] = useState({
		name: "",
		password: "",
	});
	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setFamilyOrgData({
			...familyOrgData,
			[name]: value,
		});
	};

	useEffect(() => {
		props.getUserFamilyOrg();
	}, []);

	return (
		<React.Fragment>
			<div className="w-[440px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
				<div className="w-full flex flex-col items-center bg-white rounded-md">
					{/* all fields... */}
					<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
						<span>Add a new Family or Organization</span>
					</div>
					<div className="w-full flex flex-col justify-center items-center p-3">
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">
								Name of the family or Organization
							</span>
							<input
								type="text"
								name="name"
								value={familyOrgData.name}
								onChange={onChangeValue}
								className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
							/>
						</div>
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">Password</span>
							<input
								type="password"
								name="password"
								value={familyOrgData.password}
								onChange={onChangeValue}
								className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
							/>
						</div>
						<div className="w-full flex justify-end items-end px-3 pt-10">
							<button
								onClick={() => props.setFamilyOrgaModal(false)}
								className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									props
										.updateFamilyOrg(
											familyOrgData,
											props.userReminder ? props.userReminder?._id : null
										)
										.then((res) => {
											// console.log(res);
											props.getUserFamilyOrg();
											props.setFamilyOrgaModal(false);
										});
								}}
								className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	// console.log(state.userFamilyOrg);
	return {
		familyOrgData: state?.userFamilyOrg?.info?.allFamilyOrg,
		loading: state?.userFamilyOrg?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserFamilyOrg,
	updateFamilyOrg,
})(AddFamilyOrgaModal);
