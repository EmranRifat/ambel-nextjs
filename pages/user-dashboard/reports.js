import React from "react";
import Reports from "../../components/UserDashBoard/Reports/Reports";
import DashboardContainer from "../../components/dashboard_container";
import Title from "../../components/Title";

const reports = () => {
	return (
		<React.Fragment>
			<Title title="User Reports" />
			<DashboardContainer>
				<Reports />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default reports;
