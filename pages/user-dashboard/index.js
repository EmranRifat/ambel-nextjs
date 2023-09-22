import React from "react";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("../../components/UserDashBoard/userprofile/Profile"), {
	ssr: false, loading: () => <PageLoader />
});
import DashboardContainer from "../../components/dashboard_container";
import PageLoader from "../../components/PageLoader";
import Title from "../../components/Title";

const index = () => {
	return (
		<React.Fragment>
			<Title title="Account" />
			<DashboardContainer>
				<Profile />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default index;
