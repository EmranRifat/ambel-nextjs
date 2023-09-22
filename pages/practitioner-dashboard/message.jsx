import React from "react";
import Message from "../../components/Message/Message";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";

const message = () => {
	return (
		<React.Fragment>
			<Title title="Messages" />
			<DashboardContainer pageSlug="message">
				<Message />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default message;
