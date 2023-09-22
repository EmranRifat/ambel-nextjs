import React from "react";
import Header from "../Dashboard/Top/Header";
import TopBar from "../Dashboard/Top/TopBar";
const UserDashboardContainer = (props) => {
	return (
		<React.Fragment>
			<div className="max-w-[1440px] pl-[48px] pr-[20px] m-auto">
				<Header />
				<TopBar />
				{props.children}
			</div>
		</React.Fragment>
	);
};

export default UserDashboardContainer;
