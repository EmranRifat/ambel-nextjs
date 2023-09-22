import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const BasicInfoLeftSide = dynamic(() => import("./BasicInfoLeftSide"), { ssr: false });
import ProfileCover from "./ProfileCover";
import Userprofileheader from "./Userprofileheader";
import BasinInfoRightSide from "./BasinInfoRightSide";
import PractitionerLeftSide from "./PractitionerLeftSide";
import PractitionerInfoRightSide from "./PractitionerInfoRightSide";
import { connect } from "react-redux";
import styles from "../../setup.module.css";
import Service from "./Service";
import {
	getUserInfo,
	onCancelAction,
	updateUserInfo,
} from "../../../store/actions/user";
const Profile = (props) => {
	const [profileHead, setProfileHead] = useState(1);
	const [userType, setUserType] = useState("User or Member");

	const [isChanged, setIsChanged] = React.useState(false);
	const [userData, setUserData] = useState({
		userName: "",
		address1: "",
		address2: "",
		country: "Select Your Country",
		city: "Select Your City",
		zipCode: "",
		phoneNumber: "",
		gender: "",
		userRole: "user",
		photo: "",
		registrationComplete: false,
		isPrivate: false,
		ocupation: "",
		aboutMe: "",
		phoneCode: "1",
	});

	useEffect(() => {
		if (props.user?.userType) setUserType(props.user?.userType);
		const f = async () => {
			await props.getUserInfo();
		};
		if (props.user) {
			setIsChanged(false);
			setUserData({ ...userData, ...props.user });
		} else f();
	}, [props.user]);

	const onChangeUserData = (event) => {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const onCancelEditing = () => {
		props.onCancelAction();
		setUserData({
			...userData,
			...props?.user,
		});
	};

	// const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	return (
		<div
			// ref={container}
			className={`w-full h-[74vh] ${styles.scrollbar} pt-5 mt-1 overflow-y-auto`}
		>
			<div className="max-w-[1343px] pb-3 my-1 mr-5 bg-white rounded-lg">
				<ProfileCover userData={userData} onChangeUserData={onChangeUserData} />
				{userType == "Practitioner" && (
					<Userprofileheader
						profileHead={profileHead}
						setProfileHead={setProfileHead}
					/>
				)}
				{profileHead === 1 && (
					<div className="w-full flex justify-between pb-10 space-x-6 px-10 mt-[30px]">
						<BasicInfoLeftSide
							userData={userData}
							onChangeUserData={onChangeUserData}
							updateUserInfo={props.updateUserInfo}
							onCancelAction={onCancelEditing}
						/>
						<BasinInfoRightSide
							userData={userData}
							onChangeUserData={onChangeUserData}
						/>
					</div>
				)}

				{profileHead === 2 && userType == "Practitioner" && (
					<div className="w-full flex justify-around pb-10 px-10 mt-[30px]">
						<PractitionerLeftSide />
						<PractitionerInfoRightSide />
					</div>
				)}
				{profileHead === 3 && (
					<div className="w-full flex justify-around pb-10 px-10 mt-[30px]">
						<Service />
					</div>
				)}
			</div>
			{/* {isChanged && (
				<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
					<span className="">Do you want to save changes?</span>
					<div>
						<button
							type="submit"
							onClick={() => {
								setIsChanged(false);
								// onCancelEditing();
								// setShowConfirmationModal(true);
							}}
							className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
						>
							<span>Cancel</span>
						</button>
						<button
							type="submit"
							onClick={() => {
								props.updateUserInfo(userData);
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
			)} */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user?.info?.user,
		loading: state.user.loading,
	};
};

export default connect(mapStateToProps, {
	updateUserInfo,
	getUserInfo,
	onCancelAction,
})(Profile);
