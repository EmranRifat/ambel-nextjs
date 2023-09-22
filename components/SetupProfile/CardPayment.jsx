import React from "react";
import { Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
const CardPayment = ({ clientSecret }) => {
  // const elements = useElements();
  // const CardName = elements.create("cardn")

  if (!clientSecret) return <div>Loading</div>;

  return (
    <div className="w-full flex flex-col">
      <PaymentElement id="payment-element" />
    </div>
  );
};

export default CardPayment;
