import React from "react";
import Title from "../../components/Title";
import Staff from "../../components/Dashboard/Staffs/Staffs";
import DashboardContainer from "../../components/dashboard_container";

const Staffs = () => {
	return (
		<React.Fragment>
			<Title title="Staffs" />
			<DashboardContainer pageSlug="staffs">
				<Staff />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default Staffs;
