import React from "react";
import Header from "./Dashboard/Top/Header";
import TopBar from "./Dashboard/Top/TopBar";
import { hasPermission } from "../utils/permissions";
import NoPermissionPage from "../pages/no-permission";
import { connect } from "react-redux";
import Cookies from "js-cookie";

const DashboardContainer = (props) => {
	return (
		<React.Fragment>
			<div className="max-w-[1440px] pl-[48px] pr-[20px] m-auto">
				<Header />
				<TopBar />
				{hasPermission(
					props.user?.userRoles.find(
						(itm) => itm._id == Cookies.get("actingUserType")
					)?.permissionRole?.permissions,
					props.pageSlug,
					"read"
				) ? props.children : <NoPermissionPage />}</div>
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	// console.log(state.auth);
	return {
		info: state?.business?.info,
		user: state?.auth?.authUser,
	};
};

export default connect(mapStateToProps)(DashboardContainer);

