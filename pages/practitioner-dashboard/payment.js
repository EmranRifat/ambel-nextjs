import React from "react";
import Title from "../../components/Title";
import DashboardContainer from "../../components/dashboard_container";
import Payments from "../../components/Dashboard/Payments/Payments";

const Payment = () => {
  return (
    <React.Fragment>
      <Title title="Payment" />
      <DashboardContainer pageSlug="payment">
        <Payments />
      </DashboardContainer>
    </React.Fragment>
  );
};

export default Payment;
