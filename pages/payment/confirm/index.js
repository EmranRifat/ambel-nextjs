import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../../components/CheckoutForm";
import CardCheckout from "../../../components/Checkout/CardCheckout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function PaymentSucceed() {
  return (
    <div className=" w-[440px]  left-auto right-auto rounded-[16px] ml-auto mr-auto  padding-[20px] bg-white pb-[5px] ">
      Payment successful
    </div>
  );
}
