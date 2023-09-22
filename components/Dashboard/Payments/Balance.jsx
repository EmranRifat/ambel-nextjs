import Image from "next/image";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddBankModal from "./AddBankModal";
import AddWithdrawalModal from "./AddWithdrawalModal";
import SelectWithdrawlModal from "./SelectWithdrawlModal";
import { getWalletBalance } from "../../../store/actions/wallet";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
const withdrawals = [
  {
    id: 1,
    date: "March 10,2022",
    detail: "#MS-415646",
    bankName: "Duct Bangla Bank",
    accountNo: "123456789",
    amount: "1000",
  },
  {
    id: 2,
    date: "March 10,2022",
    detail: "#MS-415646",
    bankName: "Duct Bangla Bank",
    accountNo: "123456789",
    amount: "1000",
  },
  {
    id: 3,
    date: "March 10,2022",
    detail: "#MS-415646",
    bankName: "Duct Bangla Bank",
    accountNo: "123456789",
    amount: "1000",
  },
  {
    id: 4,
    date: "March 10,2022",
    detail: "#MS-415646",
    bankName: "Duct Bangla Bank",
    accountNo: "123456789",
    amount: "1000",
  },
];

const Balance = (props) => {
  const [currentBalacne, setCurrentBalance] = useState(0);
  useEffect(() => {
    props.getWalletBalance();
  }, []);
  useEffect(() => {
    const amount = props.wallet?.info?.wallet?.amount;
    setCurrentBalance(amount);
  }, [props.wallet]);
  return (
    <>
      <div className="w-full pb-8">
        {/* account info */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-full">
            {/* balance div */}
            <div className="h-[238px] w-[500px] bg-white rounded-md flex flex-col items-center shadow-lg">
              <h1 className="text-[32px] text-[#19525A] mt-10">
                {` $${currentBalacne}`}
              </h1>
              <h3 className="text-[16px] text-[#5B5B5B]">
                Your available balance
              </h3>
              <h3 className="text-[16px] text-[#5B5B5B] mt-2">
                On your Ambel account
              </h3>
              <div className="flex justify-between w-[350px] mt-5">
                <button
                  className="h-[36px] w-[100px] rounded-[8px] bg-[#19525A] text-white text-[12px]"
                  onClick={() => {
                    props.setShowAddBalanceModal(true);
                  }}
                >
                  Add Balance
                </button>
                <button className="h-[36px] w-[100px] rounded-[8px] bg-[#19525A] text-white text-[12px]">
                  Send money
                </button>
                <AddWithdrawalModal />
              </div>
            </div>
            {/* expende and profit */}
            <div className="w-[500px] flex justify-between mt-5">
              <div className="h-[92px] w-[240px] flex flex-col items-center justify-center bg-white rounded-md shadow-md">
                <span className="text-[12px] text-[#5B5B5B]">Last month</span>
                <div className="flex items-center">
                  <span className="text-[16px]">Total Expense</span>
                  <span className="text-[10px] text-[#00AF31] ml-5">5%</span>
                </div>
                <span className="text-[#FF0000] text-[10px]">1000$ USD </span>
                <div className="flex w-full px-3 justify-end">
                  <span className="text-[#008BDA] text-[12px] cursor-pointer">
                    Learn more
                  </span>
                </div>
              </div>
              <div className="h-[92px] w-[240px] flex flex-col items-center justify-center bg-white rounded-md shadow-md">
                <span className="text-[12px] text-[#5B5B5B]">Last month</span>
                <div className="flex items-center">
                  <span className="text-[16px]">Total Profit</span>
                  <span className="text-[10px] text-[#00AF31] ml-3">5%</span>
                </div>
                <span className="text-[#00AF31] text-[10px]">1000$ USD </span>
                <div className="flex w-full px-3 justify-end">
                  <span className="text-[#008BDA] text-[12px] cursor-pointer">
                    Learn more
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full ml-2">
            <div className="h-[350px] w-[520px] flex flex-col bg-white rounded-md shadow-lg px-5 py-4">
              <span className="text-[#5B5B5B] text-[20px]">
                Last Withdrawls -
              </span>
              {withdrawals.map((withdraw) => (
                <div
                  key={withdraw.id}
                  className="w-full flex justify-between mt-2 text-[#5B5B5B]"
                >
                  <div className="flex flex-col">
                    <span>{withdraw.date}</span>
                    <span>{withdraw.detail}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>{withdraw.bankName}</span>
                    <span>AC : {withdraw.accountNo}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">$ {withdraw.amount}</span>
                    <Image
                      src="/icons/withdraw.png"
                      height="20px"
                      width="18px"
                      alt=""
                    />
                    {/* <span>{withdraw.detail}</span> */}
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-center mt-5 ">
                <button className="h-[25px] w-[70px] text-[10px] rounded-xl border-[1px] border-[#19525A] ">
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* payment method */}
        <div className="w-full bg-white py-5 px-8 rounded-md shadow-lg mt-5">
          <div className="w-full flex justify-between">
            <span className="text-[#5B5B5B] text-[20px] font-[500]">
              Payment Methods
            </span>
            <AddBankModal />
          </div>

          <div className="flex justify-between mt-5">
            <Image
              src="/icons/masterCard.png"
              alt=""
              height="240px"
              width="351px"
            />
            <Image
              src="/icons/VisaCard.png"
              alt=""
              height="240px"
              width="351px"
            />
            <Image
              src="/icons/PayPal-Logo1.png"
              alt=""
              height="150px"
              width="351px"
            />
          </div>
        </div>

        {/* withdraw method */}
        <div className="w-full bg-white py-5 px-8 rounded-md shadow-lg mt-5">
          <div className="w-full flex justify-between">
            <span className="text-[#5B5B5B] text-[20px] font-[500]">
              Withdraw Methods
            </span>
            <SelectWithdrawlModal />
          </div>
          <div className="flex justify-between mt-5">
            <Image
              src="/icons/withdrawal_1.png"
              alt=""
              height="240px"
              width="351px"
            />
            <Image
              src="/icons/withdrawal_2.png"
              alt=""
              height="240px"
              width="351px"
            />
            <Image
              src="/icons/withdrawal_3.png"
              alt=""
              height="190px"
              width="351px"
            />
          </div>
        </div>

        {/* billinginfo and current subscirptions */}

        <div className="w-full flex justify-center mt-5">
          {/* billing information.. */}
          <div className="w-full flex flex-col bg-white px-5 py-4 rounded-md shadow-lg">
            <div className="flex justify-between">
              <span className="text-[20x] text-[#5B5B5B] font-[500]">
                Billing Information
              </span>
              <button className="flex items-center justify-center rounded-md text-white bg-[#0F4556] h-[36px] w-[132px]">
                <span className="text-[30px] mr-3">+</span>
                <span className="text-[16px]">Add New</span>
              </button>
            </div>

            <div className="w-full flex justify-between mt-5">
              <div className="flex flex-col justify-center text-[#5B5B5B] text-[14px]">
                <span>Oliver Liam Company</span>
                <span>Name: Viking Burrito</span>
                <span>Email Address: oliver@burrito.com</span>
                <span>VAT Number: FRB1235476</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/edit.png"
                  alt="edit"
                  height={20}
                  width={20}
                />
                <span className="mx-3">Eid</span>
                <Image
                  src="/icons/delete.png"
                  alt="edit"
                  height={20}
                  width={20}
                />
              </div>
            </div>

            <div className="w-full flex justify-between mt-5">
              <div className="flex flex-col justify-center text-[#5B5B5B] text-[14px]">
                <span>Oliver Liam Company</span>
                <span>Name: Viking Burrito</span>
                <span>Email Address: oliver@burrito.com</span>
                <span>VAT Number: FRB1235476</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/edit.png"
                  alt="edit"
                  height={20}
                  width={20}
                />
                <span className="mx-3">Eid</span>
                <Image
                  src="/icons/delete.png"
                  alt="edit"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>

          {/* current subscriptions... */}
          <div className="w-full flex flex-col items-center bg-white h-[274px] ml-5 rounded-md shadow-lg">
            <span className="text-[16px] text-[#5B5B5B] mt-8">
              Your current subscription
            </span>
            <span className="text-[#19525A] text-[32px] mt-3">
              Professional Plus
            </span>
            <span className="text-[16px] text-[#5B5B5B] mt-3">
              Practitioner limit: 10
            </span>
            <span className="text-[16px] text-[#5B5B5B]">
              Expire on: 10 Aug, 2022
            </span>
            <div className="flex w-[300px] justify-between mt-5">
              <button className="h-[36px] w-[100px] rounded-[8px] bg-[#19525A] text-white text-[16px]">
                Renew
              </button>
              <button className="h-[36px] w-[100px] rounded-[8px] bg-[#19525A] text-white text-[16px]">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ wallet: state.wallet });

export default connect(mapStateToProps, { getWalletBalance })(Balance);
