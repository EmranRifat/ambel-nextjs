import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CardPayment from "./CardPayment";
import NumericInput from "react-numeric-input";
import PaypalPayment from "./PaypalPayment";
import Link from "next/link";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import SubscriptionCheckout from "../Checkout/SubscriptionCheckout";
import Dropdown from "../Dropdown";
import axios from "../../utils/axios";
import Cookies from "js-cookie";
const Finish = (props) => {
  // const stripe = useStripe();
  // const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackageName, setSelectedPackageName] =
    useState("Select A Package");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [amount, setAmount] = useState(0);
  const [practionerNum, setPractionerNum] = useState(1);
  const [show, setShow] = useState("1");
  const [interval, setInterval] = useState("month");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedStyle =
    "text-sm text-white bg-[#19525A] rounded-full py-3 px-5";
  const unSelectdStyle = "text-sm pl-4 pr-6 py-3 bg-gray-300 rounded-full";

  useEffect(() => {
    if (!selectedPackage) {
      setAmount(0);
      return;
    }
    // @ts-ignore
    const { basePrice, intermediatePrice, advancePrice } = selectedPackage;
    if (selectedPackageName == "Enterprise") {
      if (practionerNum > 0 && practionerNum <= 10) {
        setAmount(practionerNum * basePrice);
      } else if (practionerNum > 10 && practionerNum <= 20) {
        setAmount(practionerNum * intermediatePrice);
      } else if (practionerNum > 20) {
        setAmount(advancePrice * practionerNum);
      }
    } else if (selectedPackageName == "Basic") {
      setAmount(basePrice);
    }
    if (interval == "year") setAmount(amount * 12);
  }, [practionerNum, selectedPackage, interval]);

  const getPackages = async () => {
    axios
      .get("/adminPackage", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => setPackages(response.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getPackages();
  }, []);

  const selectPayMethod = (e) => {
    props.setSelectPayMethod(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col ">
        <div className="w-full flex justify-center items-center mb-4">
          <span className="text-[#19525A] text-[20px] font-[500]">
            {`First month is free. Total amount ${amount}$`}
          </span>
        </div>
        <div className="flex mb-[20px]">
          <div className="bg-gray-300 flex rounded-full mx-auto">
            <button
              onClick={() => {
                setShow("1");
                setInterval("month");
              }}
              className={show === "1" ? selectedStyle : unSelectdStyle}
            >
              MONTLY
            </button>
            <button
              onClick={() => {
                setShow("2");
                setInterval("year");
              }}
              className={show === "2" ? selectedStyle : unSelectdStyle}
            >
              YEARLY
            </button>
          </div>
        </div>
        <div className="mb-[20px]">
          <Dropdown
            width={"400px"}
            items={packages.map((e) => e.name)}
            // @ts-ignore
            selected={selectedPackageName}
            disabled={false}
            onSelected={(selected) => {
              setSelectedPackageName(selected);
              if (selectedPackageName != "Enterprise") setPractionerNum(1);
              setSelectedPackage(packages.filter((e) => e.name == selected)[0]);
            }}
          />
          <div>
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/plans`}>
              <a
                className="text-[#19525A]"
                target="_blank"
                rel="noopener noreferrer"
              >
                See package details
              </a>
            </Link>
          </div>

          <small>{errorMessage}</small>
          <div className="w-fit mt-[10px]">
            {selectedPackageName == "Enterprise" && (
              <>
                <span>Practitioner Number: </span>
                <input
                  style={{
                    width: "40px",
                    marginLeft: "5px",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                  type={"number"}
                  value={practionerNum}
                  step={1}
                  min={1}
                  onChange={(e) => {
                    // @ts-ignore
                    setPractionerNum(e.target.value);
                  }}
                />
              </>
            )}
          </div>
        </div>

        <p className="text-[#5B5B5B] py-1">Select a payment method</p>
        <div className="w-full border-[1px] broder-[#00000080]">
          <div className="w-full flex flex-col  border-b-[1px] p-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="Payment"
                  value="stripe"
                  checked={props.selectPayMethod === "stripe"}
                  onChange={selectPayMethod}
                  className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
                />
                <span className="text-[12px] text-[#5B5B5B] ml-1">
                  Credit or debit card
                </span>
              </div>
              <div className=" flex items-center">
                <Image
                  src="/img/mastercard.png"
                  height={20}
                  width={33}
                  alt="img"
                />
                <Image src="/img/visa.png" height={20} width={33} alt="img" />
                <Image src="/img/Dinner.png" height={20} width={33} alt="img" />
                <Image src="/img/Jcb.png" height={20} width={33} alt="img" />
                <Image
                  src="/img/discover.png"
                  height={20}
                  width={33}
                  alt="img"
                />
                <Image
                  src="/img/america_express.png"
                  height={20}
                  width={33}
                  alt="img"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col border-b-[1px] p-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="Payment"
                  value="paypal"
                  checked={props.selectPayMethod === "paypal"}
                  onChange={selectPayMethod}
                  className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
                />
                <span className="text-[12px] text-[#5B5B5B] ml-1">Paypal</span>
              </div>
              <div className=" flex items-center">
                <Image src="/img/paypal.png" height={20} width={77} alt="img" />
              </div>
            </div>
            {props.selectPayMethod === "paypal" && <PaypalPayment />}
          </div>

          <div className="w-full flex justify-between items-center border-b-[1px] p-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="Payment"
                value="ambel"
                checked={props.selectPayMethod === "ambel"}
                onChange={selectPayMethod}
                className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
              />
              <span className="text-[12px] text-[#5B5B5B] ml-1">
                Local currency
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-5">
          {props.selectPayMethod === "stripe" && (
            <SubscriptionCheckout
              loading={isLoading}
              setLoading={setIsLoading}
              selectedPackage={selectedPackage}
              interval={interval}
              practitionerNum={practionerNum}
              setErrorMessage={setErrorMessage}
              updateBusiness={() => {
                props.upadateBusiness(
                  props.userType,
                  props.userData,
                  props.businessId,
                  props.practitionerId
                );
              }}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Finish;
