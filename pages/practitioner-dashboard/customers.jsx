import React from "react";
import Customers from "../../components/Dashboard/Patients/Customers";
import Title from "../../components/Title";

import DashboardContainer from "../../components/dashboard_container";

const patients = () => {
	return (
		<React.Fragment>
			<Title title="Cutomers" />
			<DashboardContainer pageSlug="customers">
				<Customers />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default patients;
