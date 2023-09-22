import React, { useState } from "react";
import { useRouter } from 'next/router';
import AccountSidebar from "./AccountSidebar";
import BasicInfo from "./BasicInfo";
import Connect from "./Connect";
import FamilyOrganization from "./FamilyOrganization";
import Referral from "./Referral";
import Reminder from "./Reminder";
import Schedule from "./Schedule";
import Security from "./Security";
import styles from "../../setup.module.css";

const Account = () => {
  const [show, setShow] = useState(1);
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div className="pt-5">
          <AccountSidebar show={show} setShow={setShow} />
        </div>
        <div
          // ref={container}
          className={`w-full ${styles.scrollbar} h-[74vh] pt-5 mt-1 overflow-y-auto md:pl-5`}
        >
          <div className="mr-5 h-full">
            {show === 1 && <BasicInfo />}
            {show === 2 && <Schedule />}
            {show === 3 && <Security router={router} />}
            {show === 4 && <FamilyOrganization />}
            {show === 5 && <Reminder />}
            {show === 6 && <Referral />}
            {show === 7 && <Connect />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
