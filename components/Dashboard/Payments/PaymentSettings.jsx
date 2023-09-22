import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
import { PulseLoader } from "react-spinners";
import { notifySuccess } from "../../../utils/toast";

const PaymentSettings = (props) => {
  const [enableOnlinePayment, setEnableOnlinePayment] = useState(false);
  const [enableStaffComission, setEnableStaffComission] = useState(false);
  const [enableTips, setEnableTips] = useState(false);
  const [paymentType, setPaymentType] = useState("Comission");
  const [accountingMethod, setAccountingMethod] = useState("Online");
  const [billingMethod, setBillingMethod] = useState("Automatic");
  const [billingCycle, setBillingCycle] = useState("Instant");
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [tipComission, setTipComission] = useState("");
  const [showSave, setShowSave] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    const settings = {
      invoicePrefix: "",
      accountingMethod: "",
      paymentType: "",
      billingMethod: "",
      billingCycle: "",
      tipComission: "",
    };
    if (enableOnlinePayment) {
      if (invoicePrefix == "") {
        alert("Provide a prefix");
        return;
      }
      settings["invoicePrefix"] = invoicePrefix;

      if (enableStaffComission) {
        settings["paymentType"] = paymentType;
        settings["accountingMethod"] = accountingMethod;
        settings["billingMethod"] = billingMethod;
        settings["billingCycle"] = billingCycle;
      }
      if (enableTips) settings["tipComission"] = tipComission;
    }
    setLoading(true);
    const response = await axios.post("/paymentSettings/save", settings, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    });
    setLoading(false);
    notifySuccess("Payment Settings Updated");
    console.log(response);
  };

  const getSettings = async () => {
    axios
      .get("/paymentSettings", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        const {
          paymentType,
          accountingMethod,
          billingMethod,
          billingCycle,
          invoicePrefix,
          tipComission,
        } = response.data;

        if (invoicePrefix) setEnableOnlinePayment(true);
        if (paymentType) setEnableStaffComission(true);
        setPaymentType(paymentType);
        setAccountingMethod(accountingMethod);
        setBillingMethod(billingMethod);
        setBillingCycle(billingCycle);
        setInvoicePrefix(invoicePrefix);
        setTipComission(tipComission);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <>
      <div className="pb-8 flex flex-col">
        <div className="flex justify-between">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Payment Settings
          </span>
          <span>
            {showSave &&
              (loading ? (
                <PulseLoader />
              ) : (
                <button
                  className="w-[80px] h-[36px] bg-[#19525A] text-[14px] text-white rounded-l-md"
                  onClick={() => {
                    saveSettings();
                  }}
                >
                  Save
                </button>
              ))}
          </span>
        </div>
        <div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-lg mt-5">
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Do you allow online payment
            </span>
            <Toggle
              checked={enableOnlinePayment}
              setChecked={(checked) => {
                setEnableOnlinePayment(checked);
                setShowSave(true);
              }}
            />
          </div>
          {enableOnlinePayment && (
            <>
              <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
                <span className="text-[16px] text-[#5B5B5B]">
                  Do you allow staff payment here
                </span>
                <Toggle
                  checked={enableStaffComission}
                  setChecked={(checked) => {
                    setEnableStaffComission(checked);
                    setShowSave(true);
                  }}
                />
              </div>
              {enableStaffComission && (
                <>
                  <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
                    <span className="text-[16px] text-[#5B5B5B]">
                      Type fo practitioner payment
                    </span>
                    <div className=" flex justify-center ml-5">
                      <Dropdown
                        items={["Comission", "Single Payment"]}
                        selected={paymentType}
                        width={"160px"}
                        onSelected={(selected) => {
                          setShowSave(true);
                          setPaymentType(selected);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
                    <span className="text-[16px] text-[#5B5B5B]">
                      Accounting method
                    </span>
                    <div className=" flex justify-center ml-5">
                      <Dropdown
                        items={["Online", "Offline"]}
                        selected={accountingMethod}
                        width={"160px"}
                        onSelected={(selected) => {
                          setShowSave(true);
                          setAccountingMethod(selected);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
                    <span className="text-[16px] text-[#5B5B5B]">
                      Billing method
                    </span>
                    <div className=" flex justify-center ml-5">
                      <Dropdown
                        items={["Automatic", "Selft control"]}
                        selected={billingMethod}
                        width={"160px"}
                        onSelected={(selected) => {
                          setShowSave(true);
                          setBillingMethod(selected);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
                    <span className="text-[16px] text-[#5B5B5B]">
                      Billing cyle
                    </span>
                    <div className=" flex justify-center ml-5">
                      <Dropdown
                        items={["Instant", "Few times"]}
                        selected={billingCycle}
                        width={"160px"}
                        onSelected={(selected) => {
                          setBillingCycle(selected);
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center px-8 py-4">
                <span className="text-[16px] text-[#5B5B5B]">
                  Start invoice prefix
                </span>
                <div className=" flex justify-center ml-5">
                  <button className="w-[80px] h-[36px] bg-[#19525A] text-[14px] text-white rounded-l-md">
                    Invoice
                  </button>
                  <input
                    onChange={(e) => {
                      setShowSave(true);
                      setInvoicePrefix(e.target.value);
                    }}
                    type="text"
                    value={invoicePrefix}
                    placeholder="e.g.abc"
                    className="h-[36px] w-[80px] outline-none border-2 px-1 rounded-r-md"
                  />
                </div>
              </div>
              <>
                <div className="flex justify-between items-center px-8 py-4 border-t-[2px] border-b-[2px] border-gray-300">
                  <span className="text-[16px] text-[#5B5B5B]">
                    Enable Tips
                  </span>
                  <Toggle
                    checked={enableTips}
                    setChecked={(checked) => {
                      setEnableTips(checked);
                    }}
                  />
                </div>
                {enableTips && (
                  <div className="flex justify-between items-center px-8 py-4">
                    <span className="text-[16px] text-[#5B5B5B]">
                      Tip Commission
                    </span>
                    <div className=" flex justify-center ml-5 border-2 border-[#19525A] rounded-lg">
                      <input
                        value={tipComission}
                        onChange={(e) => {
                          setShowSave(true);
                          setTipComission(e.target.value);
                        }}
                        type="text"
                        placeholder="Select Amount"
                        className="h-[36px] w-[120px] outline-none  px-2 my-auto rounded-lg"
                      />
                      <p className="my-auto text-[#19525A] bg-white text-[14px]  rounded-l-md mx-2">
                        %
                      </p>
                    </div>
                  </div>
                )}
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentSettings;
