import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import axios from "../../../utils/axios";
import cookie from "js-cookie";
// import {} from "@stripe/stripe-js"
export default function StripePaymentElement(props) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  const [clientSecret, setClientSecret] = useState({ clientSecret: "" });
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const { page, setPage, error, setError, amount, saveCard } = props;
  // const [saveCard, setSaveCard] = useState(true);

  const getIntent = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment/create-payment-intent`,
      {
        method: "POST",
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookie.get("jwt")}`,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          amount: props.amount,
          saveCard,
        }),
      }
    )
      .then((res) => res.json())
      .then((paymentIntent) => {
        setClientSecret((prevState) => {
          console.log(paymentIntent.client_secret);
          prevState["clientSecret"] = paymentIntent.client_secret;
          return { ...prevState };
        });
        // setPaymentIntentId(paymentIntent.id);
        // axios
        //   .patch(
        //     "/wallet/updatePaymentIntent",
        //     { payment_intent_id: paymentIntent.id },
        //     {
        //       withCredentials: true,
        //       headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
        //     }
        //   )
        //   .then((data) => {
        //     // console.log(paymentIntent);
        //     setClientSecret(paymentIntent.client_secret);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
      })
      .catch((e) => {
        // console.log(e) 
      });
  };
  // console.log(clientSecret);
  useEffect(() => {
    props.amount && getIntent();
    // console.log(clientSecret);
  }, [props, saveCard]);
  // useEffect(() => {
  //   getIntent();
  //   console.log(clientSecret);
  // }, [saveCard]);
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: clientSecret,
  // };
  // console.log(saveCard);
  return (
    <>
      {" "}
      <div className="w-full flex justify-end items-start">
        <span className="w-fit ml-auto mr-auto size text-xl text-[#19525A]">
          Pay Amount
        </span>
        <span
          onClick={() => {
            props.setShowAddBalanceModal(false);
          }}
          className="text-2xl text-[#5B5B5B] cursor-pointer"
        >
          ✖
        </span>
      </div>
      {clientSecret.clientSecret ? (
        <Elements options={clientSecret} stripe={stripePromise}>
          <StripePaymentForm
            page={page}
            setPage={setPage}
            error={error}
            setError={setError}
            amount={amount}
            payment_intent_id={paymentIntentId}
          // saveCard={saveCard}
          // setSaveCard={setSaveCard}
          // clientSecret={clientSecret}
          />
        </Elements>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
