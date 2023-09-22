import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	addFaimlyOrgMember,
	getUserFamilyOrg,
} from "../../../store/actions/userFamilyOrg";

const AddMemberModal = (props) => {
	// console.log(props.getId);
	const [member, setMember] = useState({
		name: "",
		email: "",
		password: "",
	});
	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setMember({
			...member,
			[name]: value,
		});
	};

	useEffect(() => {
		props.getUserFamilyOrg();
	}, []);

	return (
		<div className="w-[440px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
			<div className="w-full flex flex-col items-center bg-white rounded-md">
				{/* all fields... */}
				<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
					<span>Add a new member in Family 1</span>
				</div>
				<div className="w-full flex flex-col justify-center items-center p-3">
					<div className="flex flex-col mb-3">
						<span className="text-[16px] text-[#5B5B5B]">
							Name of the family member
						</span>
						<input
							type="text"
							name="name"
							value={member.name}
							onChange={onChangeValue}
							className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
						/>
					</div>
					<div className="flex flex-col mb-3">
						<span className="text-[16px] text-[#5B5B5B]">Email</span>
						<input
							type="text"
							name="email"
							value={member.email}
							onChange={onChangeValue}
							className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
						/>
					</div>
					<div className="flex flex-col mb-3">
						<span className="text-[16px] text-[#5B5B5B]">Password</span>
						<input
							type="password"
							name="password"
							value={member.password}
							onChange={onChangeValue}
							className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
						/>
					</div>
					<div className="w-full flex justify-end items-end px-3 pt-10">
						<button
							onClick={() => props.setAddMemberModal(false)}
							className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								props.addFaimlyOrgMember(member, props.getId).then((res) => {
									// console.log(res);
									props.getUserFamilyOrg();
									props.setAddMemberModal(false);
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
	);
};

const mapStateToProps = (state) => {
	return {
		familyOrgData: state?.userFamilyOrg?.info?.allFamilyOrg,
		loading: state?.userFamilyOrg?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserFamilyOrg,
	addFaimlyOrgMember,
})(AddMemberModal);
