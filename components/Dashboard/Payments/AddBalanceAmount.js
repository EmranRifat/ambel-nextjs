import React, { useState } from "react";

export default function AddBalanceAmount(props) {
  return (
    <>
      <div className="w-full flex justify-end items-start">
        <span className="w-fit ml-auto mr-auto size text-xl text-[#19525A]">
          Select Amount
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
      <div className="w-full mr-auto mt-[30px]  ">
        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            value={props.addMoneyValue}
            onChange={(e) => {
              props.setAddMoneyValue(e.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="text"
            placeholder="Give your amount"
          />
        </div>
      </div>
    </>
  );
}
