import React from "react";
import DashboardContainer from "../../components/dashboard_container";
import Schedule from "../../components/Schedule/Schedule";
import Title from "../../components/Title";

const schedule = () => {
	return (
		<React.Fragment>
			<Title title="Setup your Schedule" />
			<DashboardContainer pageSlug="schedule">
				<Schedule />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default schedule;
