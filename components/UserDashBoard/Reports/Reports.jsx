import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import Documents from "./Documents";
import Email from "./Email";
import FollowUp from "./FollowUp";
import IntakeForms from "./IntakeForms";
import Services from "./Services";
import UpcomingAppointments from "./UpcomingAppointments";
// import styles from "./setup.module.css";

const Account = () => {
  const [show, setShow] = useState(1);

  return (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div className="pt-5">
          <AccountSidebar show={show} setShow={setShow} />
        </div>
        <div
          // ref={container}
          className={`w-full h-[74vh] pt-5 overflow-y-auto md:pl-5`}
        >
          <div className="mr-5 h-full">
            {show === 1 && <UpcomingAppointments />}
            {show === 2 && <Email />}
            {show === 3 && <IntakeForms />}
            {show === 4 && <Documents />}
            {show === 5 && <FollowUp />}
            {show === 6 && <Services />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
