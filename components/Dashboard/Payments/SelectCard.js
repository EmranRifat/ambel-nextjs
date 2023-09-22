import React from "react";

export default function SelectPaymentMethod(props) {
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
      <div className="w-fit mr-auto mt-[30px] ">
        <div className="w-full flex mr-aut ml-auto ]">
          <input
            type="radio"
            checked={props.selectedPaymentMethod == "new card"}
            onChange={() => {
              props.setSelectedPaymentMethod("new card");
            }}
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
          />
          <label className="text-[12px] text-[#5B5B5B] ml-1">New Card</label>
        </div>
        <div className="w-full flex mr-aut ml-auto ]">
          <input
            type="radio"
            checked={props.selectedPaymentMethod == "saved cards"}
            onChange={() => {
              props.setSelectedPaymentMethod("saved cards");
            }}
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
          />
          <label className="text-[12px] text-[#5B5B5B] ml-1">Saved Cards</label>
        </div>
      </div>
    </>
  );
}
