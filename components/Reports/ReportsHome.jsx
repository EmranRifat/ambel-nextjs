import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AppointmentReport from "./AppointmentReport";
import EmailReport from "./EmailReport";
import CustomerReport from "./CustomerReport";
import SaleSummaryReport from "./SaleSummaryReport";
import SalesReport from "./SalesReport";
import PractionerReport from "./PractionerReport";
import StuffReport from "./StuffReport";
import PaymentReport from "./PaymentReport";
import ProductReport from "./ProductReport";
import ServiceReport from "./ServiceReport";
import PackageReport from "./PackageReport";
import FeesReport from "./FeesReport";
import WaitlistReport from "./WaitlistReport";
import RequestlistReport from "./RequestlistReport";
import VideoandAudioReport from "./VideoandAudioReport";
import ReviewReport from "./ReviewReport";
import SupportReport from "./SupportReport";
import TransactionReport from "./TransactionReport";
import ActivityReport from "./ActivityReport";
import DueAmountReport from "./DueAmountReport";
import DashboardSideBar from "../Dashboard/SetupSection/DashboardSideBar";
import { reportsItem } from "./ReportsItem";

export default function ReportsHome() {
  const [show, setShow] = useState(1);
  const container = useRef(null);
  const router = useRouter();

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
      <div className="w-full flex justify-between">
        <div className="">
          <DashboardSideBar
            show={show}
            setShow={setShow}
            scrollToTop={scrollToTop}
            setUpOptions={reportsItem}
            iconFolder='reports'
            path={"reports"} />
        </div>
        <div
          ref={container}
          className={`w-full h-[74vh] pt-5 overflow-y-auto md:pl-5`}
        >
          <div className="mr-4">
            {show === 1 && <AppointmentReport></AppointmentReport>}
            {show === 2 && <SaleSummaryReport></SaleSummaryReport>}
            {show === 3 && <SalesReport></SalesReport>}
            {show === 4 && <DueAmountReport></DueAmountReport>}
            {show === 5 && <CustomerReport></CustomerReport>}
            {show === 6 && <EmailReport></EmailReport>}
            {show === 7 && <PractionerReport></PractionerReport>}
            {show === 8 && <StuffReport></StuffReport>}
            {show === 9 && <PaymentReport></PaymentReport>}
            {show === 10 && <ProductReport></ProductReport>}
            {show === 11 && <ServiceReport></ServiceReport>}
            {show === 12 && <PackageReport></PackageReport>}
            {show === 13 && <TransactionReport></TransactionReport>}
            {show === 14 && <FeesReport></FeesReport>}
            {show === 15 && <WaitlistReport></WaitlistReport>}
            {show === 16 && <RequestlistReport></RequestlistReport>}
            {show === 17 && <VideoandAudioReport></VideoandAudioReport>}
            {show === 18 && <ReviewReport></ReviewReport>}
            {show === 19 && <SupportReport></SupportReport>}
            {show === 20 && <ActivityReport></ActivityReport>}
          </div>
        </div>
      </div>
    </>
  );
}
