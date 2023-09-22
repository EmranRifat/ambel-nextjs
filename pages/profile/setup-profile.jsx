import React from "react";
import Title from "../../components/Title";
// import Profile from "../../components/Profile";
import { useEffect } from "react";
import store from "../../store";
import SetupProfile from "../../components/SetupProfile/SetupProfile";

const SetupProfilePage = () => {
	return (
		<>
			<Title title="Profile" />
			{/* <Navbar /> */}
			<div className="w-full h-[100vh] overflow-scroll m-auto">
				{/* <Profile /> */}
				<SetupProfile />
			</div>
			{/* <Footer /> */}
		</>
	);
};

export default SetupProfilePage;
