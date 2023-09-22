import React from "react";
import UserDashboardContainer from "../../components/UserDashBoard/UserDashboardContainer";
import Profile from "../../components/UserDashBoard/userprofile/Profile";

const userprofile = () => {
  return (
    <React.Fragment>
      <UserDashboardContainer>
      <Profile/>
      </UserDashboardContainer>
    </React.Fragment>
  );
};

export default userprofile;
