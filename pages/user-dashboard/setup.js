import React from "react";
import Account from "../../components/UserDashBoard/Account/Account";
import DashboardContainer from "../../components/dashboard_container";
import Title from "../../components/Title";

const setup = () => {
	return (
		<React.Fragment>
			<Title title="Setup Your Profile" />
			<DashboardContainer>
				<Account />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default setup;
