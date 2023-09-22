import React from "react";
import Message from "../../components/Message/Message";
import DashboardContainer from "../../components/dashboard_container";
import Title from "../../components/Title";
const message = () => {
	return (
		<React.Fragment>
			<Title title="Messages" />
			<DashboardContainer>
				<Message />
			</DashboardContainer>
		</React.Fragment>
	);
};

export default message;
