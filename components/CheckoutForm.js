import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      console.log(payload.error);

      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("Payement succeeded");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <PaymentElement
        options={{
          layout: "accordion",
        }}
        id="payment-element"
      />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
