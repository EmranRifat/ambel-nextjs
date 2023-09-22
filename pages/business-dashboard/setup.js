import React from "react";
import dynamic from "next/dynamic";
const Title = dynamic(() => import("../../components/Title"), { ssr: false });
import DashboardContainer from "../../components/dashboard_container";
import PageLoader from "../../components/PageLoader";
const SetupPage = dynamic(() => import("../../components/Dashboard/SetupSection/SetupPage"), {
	ssr: false, loading: () => <PageLoader />
});
const SetUp = () => {
	return (
		<React.Fragment>
			<Title title="SetUp Your Organization" />
			<DashboardContainer pageSlug="settings">
				<SetupPage />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default SetUp;
