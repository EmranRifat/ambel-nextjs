import React from "react";
import Schedule from "../../components/Schedule/Schedule";
import DashboardContainer from "../../components/dashboard_container";
import Title from "../../components/Title";

const schedule = () => {
	return (
		<React.Fragment>
			<Title title="Your Schedules" />
			<DashboardContainer>
				<Schedule />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default schedule;
