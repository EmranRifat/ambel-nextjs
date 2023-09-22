import React, { useState } from "react";
import Title from "../../Title";
import AccountRecom from "./AccountRecom";
import BackupAndStorage from "./BackupAndStorage";
import Branding from "./Branding";
import BusinessInfo from "./BusinessInfo";
import Department from "./Department";
import EmailFormat from "./EmailFormat";
import Intakeform from "./intakeform/Intakeform";
import MembershipAndPackage from "./PackageMembership";
import OnlineBooking from "./OnlineBooking";
import Reminder from "./Reminder";
import Schedule from "./Schedule";
import ServericesAndClass from "./ServericesAndClass";
import DashboardSideBar from "./DashboardSideBar";
import Subscriptions from "./Subscriptions";
import RatingsAndReviews from "./RatingsAndReviews";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FamilyAndOrganization from "./FamilyAndOrganization";
import GlobalPractice from "./GlobalPractice";
import styles from "../../setup.module.css";
import { useRef } from "react";
import Integration from "./Integration";
import { setUpOptions } from "./SidebarItems";

const SetupPage = () => {
  const [show, setShow] = useState(1);
  const router = useRouter();
  const [intakeDetails, setIntakeDetails] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    if (router.query && router.query.show) {
      // @ts-ignore
      setShow(parseInt(router.query.show) ?? router.query.show);
      scrollToTop();
    }
  }, [router.query, router.query.show]);

  const scrollToTop = () => {
    container.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Title title="Setup your organization" />

      <div className="w-full flex justify-between">
        <div className="">
          <DashboardSideBar
            show={show}
            setShow={setShow}
            scrollToTop={scrollToTop}
            setUpOptions={setUpOptions}
            iconFolder="settings"
            path={"setup"}
          />
        </div>
        <div
          ref={container}
          className={`w-full h-[74vh] ${styles.scrollbar} pt-6 overflow-y-auto md:pl-5`}
        >
          <div className="mr-4 h-full">
            {show === 1 && <AccountRecom />}
            {show === 2 && <Subscriptions />}
            {show === 3 && <BusinessInfo />}
            {show === 4 && <Branding />}
            {show === 5 && <EmailFormat />}
            {show === 6 && <OnlineBooking />}
            {show === 7 && <Reminder />}
            {show === 8 && <Schedule />}
            {show === 9 && <RatingsAndReviews />}
            {show === 10 && (
              <Intakeform
                intakeDetails={intakeDetails}
                setIntakeDetails={setIntakeDetails}
              />
            )}
            {show === 11 && <Department />}
            {show === 12 && <ServericesAndClass />}
            {show === 14 && <MembershipAndPackage />}
            {show === 15 && <FamilyAndOrganization />}
            {show === 16 && <GlobalPractice />}
            {show === 18 && <Integration />}
            {show === 19 && <BackupAndStorage />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupPage;
