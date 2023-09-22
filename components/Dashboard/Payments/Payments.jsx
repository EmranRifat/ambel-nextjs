import React, { useRef, useState } from "react";
import Title from "../../Title";
import styles from "../../setup.module.css";
import Balance from "./Balance";
import Discount from "./Discount";
import Fee from "./Fee";
import PaymentSettings from "./PaymentSettings";
import Referral from "./Referral";
import Refund from "./Refund";
import Sales from "./Sales";
import StaffComission from "./StaffComission";
import StaffPayments from "./StaffPayments";
import Tax from "./Tax";
import Transactions from "./Transactions";
import AddBalanceModal from "./AddBalanceModal";
import { paymentItems } from './PaymentItems';
import Modal from "../../Modal";
import DashboardSideBar from "../SetupSection/DashboardSideBar";

const Payments = (props) => {
  const [show, setShow] = useState(1);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  // const [selectedMethod, setSelectedMethod] = useState("Ambel");

  const container = useRef(null);

  const scrollToTop = () => {
    container.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Title title="Setup your organization" />
      <div className="w-full flex justify-between">
        <div className="w-0 md:w-[320px]">
          <DashboardSideBar
            show={show}
            setShow={setShow}
            scrollToTop={scrollToTop}
            setUpOptions={paymentItems}
            iconFolder={"payments"}
            path={"payment"} />
        </div>
        <div
          ref={container}
          className={`w-full h-[74vh] ${styles.scrollbar} pt-10 overflow-y-auto md:w-[1150px] md:pl-5`}
        >
          <div>
            {showAddBalanceModal && (
              <Modal
                onClick={setShowAddBalanceModal}
                closeOnOutsideClick={false}
              >
                <AddBalanceModal
                  // addMoneyValue={addMoneyValue}
                  // setAddMoneyValue={setAddMoneyValue}
                  setShowAddBalanceModal={setShowAddBalanceModal}
                // selectedMethod={selectedMethod}
                // setSelectedMethod={setSelectedMethod}
                // submitAmount={submitAmount}
                />
              </Modal>
            )}
          </div>
          <div className="mr-5">
            {show === 1 && (
              <Balance setShowAddBalanceModal={setShowAddBalanceModal} />
            )}
            {show === 2 && <Sales />}
            {show === 3 && <StaffPayments />}
            {show === 4 && <Transactions />}
            {show === 5 && <Fee />}
            {show === 6 && <Tax />}
            {show === 7 && <Discount />}
            {show === 8 && <Refund />}
            {show === 9 && <StaffComission />}
            {show === 10 && <Referral />}
            {show === 11 && (
              <PaymentSettings
                // @ts-ignore
                userType={props.userType}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
