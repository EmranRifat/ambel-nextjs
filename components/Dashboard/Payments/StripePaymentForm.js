import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "../../../utils/axios";
import cookie from "js-cookie";

export default function StripePaymentForm(props) {
  const { page, setPage, error, setError } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // const [saveCard, setSaveCard] = useState(false);

  const makePayment = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
    const payload = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/payment/confirm`,
      },
    });
    if (payload.error) {
      alert(payload.error);
      // props.setIsLoading(false);
      setLoading(false);
    } else {
      // props.setIsLoading(false);
      setLoading(false);
      alert("Payement succeeded");
    }
  };
  // console.log(saveCard);
  // console.log(props);

  return (
    <div className="mt-[30px]">
      <PaymentElement />
      <div className="w-full p-2">
        <div className="mt-[20px] w-fit ml-auto flex flex-row">
          <div>
            <button
              className="border-2 border-blue-500 bg-white w-[86px] text-black text-center  p-2 text-[16px] rounded ml-2 "
              onClick={async () => {
                if (page == 1) props.setShowAddBalanceModal(false);
                else {
                  if (page == 4) {
                    setLoading(true);
                    await axios.delete(
                      `payment/cancel-transaction?payment_intent_id=${props.payment_intent_id}`
                    );
                    setLoading(false);
                  }
                  setPage((prevState) => {
                    return prevState - 1;
                  });
                }
              }}
            >
              {page == 1 ? (
                "Cancel"
              ) : loading ? (
                <PulseLoader />
              ) : page == 4 ? (
                "Cancel"
              ) : (
                "Prev"
              )}
            </button>
          </div>
          <div>
            <button
              className="bg-[#19525A] max-w-fit min-w-[86px] text-white text-center  p-2 text-[16px] rounded ml-2"
              onClick={(e) => {
                if (page == 1) {
                  if (props.selectedMethod == "Ambel") {
                    setError(true);
                    return;
                  } else {
                    setError(false);
                    setPage((prevState) => {
                      return prevState + 1;
                    });
                  }
                } else if (page == 2) {
                  setPage((prevState) => {
                    return prevState + 1;
                  });
                } else if (page == 4) {
                  makePayment(e);
                }
              }}
            >
              {page == 4 ? (
                loading ? (
                  <PulseLoader />
                ) : (
                  `Add ${props.amount}$`
                )
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
