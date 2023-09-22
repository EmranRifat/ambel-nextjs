import React, { useState } from "react";
import Modal from "../../Modal";
import AddBalanceAmount from "./AddBalanceAmount";
import SavedPaymentMethods from "./SavedPaymentMethods";
import SelectAddBalanceMethod from "./SelectAddBalanceMethod";
import SelectPaymentMethod from "./SelectCard";
import StripePaymentElement from "./StrpePaymentElement";
import axios from "../../../utils/axios";
import cookie from "js-cookie";
import { PulseLoader } from "react-spinners";
import CardCheckout from "../../Checkout/CardCheckout";
import PayPalCheckout from "../../Checkout/PayPalCheckout";

export default function AddBalanceModal(props) {
  // const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const [selectedPaymentMethod, setSelectedPaymentMethod] =
  //   useState("New Card");
  // const [saveCard, setSaveCard] = useState(true);
  const [addMoneyValue, setAddMoneyValue] = useState("");

  return (
    <div className="w-[500px] h-fit  mt-[100px] z-100  flex flex-col items-center bg-white p-5 rounded-md">
      <AddBalanceAmount
        addMoneyValue={addMoneyValue}
        setAddMoneyValue={setAddMoneyValue}
        setShowAddBalanceModal={props.setShowAddBalanceModal}
      />
      {loading ? (
        <PulseLoader />
      ) : (
        <>
          <CardCheckout
            setError={setError}
            amount={addMoneyValue}
            setShowAddBalanceModal={props.setShowAddBalanceModal}
            loading={loading}
            setLoading={setLoading}
          />
          <PayPalCheckout
            amount={addMoneyValue}
            setError={setError}
            setShowAddBalanceModal={props.setShowAddBalanceModal}
          />
        </>
      )}
      <small className="text-red-100">{error}</small>
    </div>
  );
}
