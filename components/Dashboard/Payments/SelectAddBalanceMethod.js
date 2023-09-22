import React from "react";

export default function SelectAddBalanceMethod(props) {
  return (
    <>
      <div className="w-full flex justify-end items-start">
        <span className="w-fit ml-auto mr-auto size text-xl text-[#19525A]">
          Select a type of Payment method
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
      <div className="w-fit mr-auto mt-[30px]  ">
        <div className="w-full flex mr-aut ml-auto ]">
          <input
            type="radio"
            checked={props.selectedMethod == "card"}
            onChange={() => {
              props.setSelectedMethod("card");
            }}
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
          />
          <span className="text-[12px] text-[#5B5B5B] ml-1">
            Credit/Debit Card
          </span>
        </div>
        <div className="w-full flex mr-auto ml-auto mt-[10px]">
          <input
            type="radio"
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
            checked={props.selectedMethod == "paypal"}
            onChange={() => {
              props.setSelectedMethod("paypal");
            }}
          />
          <span className="text-[12px] text-[#5B5B5B] ml-1">PayPal</span>
        </div>
        <div className="w-full flex mr-auto ml-auto mt-[10px]">
          <input
            type="radio"
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
            checked={props.selectedMethod == "local_currency"}
            onChange={() => {
              props.setSelectedMethod("local_currency");
            }}
          />
          <span className="text-[12px] text-[#5B5B5B] ml-1">
            Local currency
          </span>
        </div>
        {props.error && <small>Select Payment Method</small>}
      </div>
    </>
  );
}
