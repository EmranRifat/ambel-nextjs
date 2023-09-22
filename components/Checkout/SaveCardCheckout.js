import { Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "../../utils/axios";
import cookie from "js-cookie";
export default function CardCheckout(props) {
  const checkout = async () => {
    try {
      props.setLoading(true);

      const response = await axios.post(
        "/payment/save-card",
        {
          success_url:
            "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
          cancel_url: "http://localhost:3000/failed",
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")}`,
          },
        }
      );
      props.setLoading(false);
      const url = response.data.session.url;
      props.setShowAddBalanceModal(false);

      // console.log(subscription);
      var left = screen.width;
      var top = screen.height;
      window
        .open(
          url,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        )
        .moveTo(left / 2, top / 2);
    } catch (e) {
      props.setLoading(false);
      props.setError("Add Amount more than 100");
      // console.log(e);
    }
  };
  // const CardName = elements.create("cardn")
  return (
    <div>
      <div>
        {props.loading ? (
          <PulseLoader />
        ) : (
          <button
            onClick={(e) => {
              checkout();
            }}
            className="w-[380px] h-[36px] bg-[#19525A] text-white rounded-md"
          >
            Pay With Card
          </button>
        )}
      </div>
    </div>
  );
}
