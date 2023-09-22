import React from "react";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";
import ChartPage from "../../components/Dashboard/Chart/Chart";

const Chart = () => {
	return (
		<React.Fragment>
			<Title title="Resources" />
			<DashboardContainer pageSlug="resources">
				<ChartPage />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default Chart;
