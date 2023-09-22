import React from "react";
import Message from "../../components/Message/Message";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";
import styles from "./dashboard.module.css";

const message = () => {
	return (
		<React.Fragment>
			<Title title="Message using Ambel" />
			<DashboardContainer pageSlug="message">

				<div className={`h-[74vh] ${styles.scrollbar} pt-10 overflow-y-auto`}>
					<div className="mr-4">
						<Message />
					</div>
				</div>
			</DashboardContainer>
		</React.Fragment>
	);
};

export default message;
