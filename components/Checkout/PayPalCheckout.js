import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "../../utils/axios";
import cookie from "js-cookie";
export default function PayPalCheckout(props) {
  const [message, setMessage] = useState("");
  if (!props.amount) return <div>Invalid amount</div>;
  return (
    <div>
      <div
        style={{
          width: "380px",
          // border: "1px solid black",
          marginTop: "10px",
        }}
      >
        <PayPalScriptProvider
          options={{
            "client-id":
              "AdL6zjRId1MYjp8yH7yRYE7n9FTl2CS_x0NgkTrjMj20Jt2BE1p0tDk2UL1oYqE6iNSjNN7p8WhVKK4O",
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={() => {
              return axios
                .post(
                  `/paypal/create-order`,
                  {
                    value: props.amount,
                    currency_code: "USD",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${cookie.get("jwt")}`,
                    },
                  }
                )
                .then((response) => {
                  // console.log(response.data);
                  return response.data.id;
                })
                .catch((e) => {
                  setMessage(e);
                });
            }}
            onApprove={(data) => {
              return axios
                .post(
                  `/paypal/capture-order/${data.orderID}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${cookie.get("jwt")}`,
                    },
                  }
                )
                .then((response) => {
                  props.setShowAddBalanceModal(false);
                })
                .catch((e) => {
                  setMessage(e);
                });
            }}
          />
        </PayPalScriptProvider>
      </div>
      <div>
        <small style={{ color: "green" }}>{message}</small>
      </div>
    </div>
  );
}
