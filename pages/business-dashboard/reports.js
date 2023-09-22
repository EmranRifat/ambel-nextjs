import React from "react";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";
import ReportsHome from "../../components/Reports/ReportsHome";

const reports = () => {
  return (
    <React.Fragment>
      <Title title="Reports" />
      <DashboardContainer pageSlug="report">
        <ReportsHome></ReportsHome>
      </DashboardContainer>
    </React.Fragment>
  );
};

export default reports;
