import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import Toggle from "../../Toggle";
import {
	onCancelAction,
	familyOrganiztionInfo,
	familyOrganizationUpdate,
} from "../../../store/actions/familyOrganization";

const FamilyAndOrganization = (props) => {
	const [isChanged, setIsChanged] = useState(false);
	const [changes, setChanges] = useState([]);
	const [familyOrganizationData, setFamilyOrganizationData] = useState({
		allowTogetherService: false,
		allowAutomaticGroup: false,
		maximumFamilyMember: "",
		appointmentBookingType: "Free booking",
		billingCycle: "Instant",
		allowedPractitioner: "Tazul Islam",
		serviceType: "All services",
	});

	useEffect(() => {
		props.familyOrganiztionInfo();
	}, []);

	useEffect(() => {
		if (props.familyOrganizationData) {
			setFamilyOrganizationData({
				...familyOrganizationData,
				...props.familyOrganizationData,
			});
			setChanges([]);
		}
	}, [props.familyOrganizationData]);

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setFamilyOrganizationData({
			...familyOrganizationData,
			[name]: value,
		});
		if (props.familyOrganizationData?.[name] !== value) {
			changes.push(name);
			setChanges([...changes]);
		} else {
			changes.pop();
			setChanges([...changes]);
		}
	};
	useEffect(() => {
		if (changes.length > 0) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [changes]);
	return (
		<>
			<div className="w-full">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Family and Organization
				</span>
				<div className="bg-white flex flex-col mt-5 shadow-md">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow familly and organization to take service together
						</span>
						<Toggle
							checked={familyOrganizationData.allowTogetherService}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "allowTogetherService", value: checked },
								});
							}}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Create automatic group for the family members and organizations
						</span>
						<Toggle
							checked={familyOrganizationData.allowAutomaticGroup}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "allowAutomaticGroup", value: checked },
								});
							}}
						/>
					</div>

					<div className="w-full flex justify-between items-center py-5 px-8 border-b-[2px] border-gray-300">
						<p className="text-[16px] text-[#5B5B5B]">
							Allow maximum number of family and organization members
							<span className="text-rose-600">*</span>
						</p>
						<div className="flex items-center text-center">
							<input
								type="text"
								required
								placeholder="1"
								name="maximumFamilyMember"
								value={familyOrganizationData.maximumFamilyMember}
								onChange={onChangeValue}
								className="outline-none rounded-l-[8px] border-2 border-gray-400 py-2 px-2 w-[165px] h-[40px]"
							/>
							<div className="h-[40px] w-[75px] bg-[#19525A] text-center text-[16px] text-white rounded-r-md flex items-center justify-center">
								Members
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Appointment booking type
						</span>
						<Dropdown
							width={"240px"}
							items={[
								"Free Booking",
								"Pre-paid Booking",
								"Post-paid Booking",
								"According to service",
							]}
							selected={familyOrganizationData.appointmentBookingType}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "appointmentBookingType", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Billing cycle for the family and organization
						</span>
						<Dropdown
							width={"240px"}
							items={[
								"Instant",
								"Weekly",
								"Monthly",
								"After 3 month",
								"After 6 month",
								"Yearly",
							]}
							selected={familyOrganizationData.billingCycle}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "billingCycle", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Practitioners that you allow for familly and organization
						</span>
						<Dropdown
							width={"240px"}
							items={["Tazul Islam", "Delwar Hossain"]}
							selected={familyOrganizationData.allowedPractitioner}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "allowedPractitioner", value: selected },
								});
							}}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Services that you allow for familly and organization
						</span>
						<Dropdown
							width={"240px"}
							items={["All services", "Single services"]}
							selected={familyOrganizationData.serviceType}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "serviceType", value: selected },
								});
							}}
						/>
					</div>
				</div>

				{isChanged && (
					<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
						<span className="">Do you want to save changes?</span>
						<div>
							<button
								type="submit"
								onClick={() => {
									props.onCancelAction();
									setIsChanged(false);
									setFamilyOrganizationData({
										...familyOrganizationData,
										...props.familyOrganizationData,
									});
								}}
								className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
							>
								<span>Cancel</span>
							</button>
							<button
								type="submit"
								onClick={() => {
									props.familyOrganizationUpdate(
										familyOrganizationData,
										props.familyOrganizationData
											? props.familyOrganizationData._id
											: null
									);
								}}
								className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
							>
								{props.loading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Save</span>
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	// console.log("Data ", state.familyOrganization.info);
	return {
		info: state?.business?.info,
		familyOrganizationData: state?.familyOrganization?.info,
		loading: state?.familyOrganization?.loading,
	};
};
export default connect(mapStateToProps, {
	familyOrganiztionInfo,
	familyOrganizationUpdate,
	onCancelAction,
})(FamilyAndOrganization);
