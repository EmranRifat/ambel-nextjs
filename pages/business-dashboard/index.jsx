import Cards from "../../components/Dashboard/Home/Cards/Cards";

import Title from "../../components/Title";
import React from "react";
import DashboardContainer from "../../components/dashboard_container";
import styles from "./dashboard.module.css";

const BusinessDashboard = () => {
	return (
		<React.Fragment>
			<Title title="Ambel Dashboard" />
			<DashboardContainer pageSlug="dashboard">
				<div className={`h-[74vh] ${styles.scrollbar} pt-10 overflow-y-auto`}>
					<div className="mr-4">
						<Cards />
					</div>
				</div>
			</DashboardContainer>
		</React.Fragment>
	);
};

export default BusinessDashboard;
