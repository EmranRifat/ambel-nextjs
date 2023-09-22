import React from "react";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";

const Shop = () => {
	return (
		<React.Fragment>
			<Title title="Shop" />
			<DashboardContainer pageSlug="shop">
				<h1 className="text-3xl">Shop</h1>
			</DashboardContainer>
		</React.Fragment>
	);
};

export default Shop;
