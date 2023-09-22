import React from "react";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";
import SetupPage from "../../components/Dashboard/SetupSection/SetupPage";

const SetUp = () => {
	return (
		<React.Fragment>
			<Title title="SetUp" />
			<DashboardContainer pageSlug="settings">
				<SetupPage />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default SetUp;
