/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Dropdown from "../../Dropdown";
import DropdownWithId from "../../Dropdown/DropDownId";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";
import { getBranches } from "../../../StatelessAPI/branchApiCalls";
import { createDiscount, updateDiscount } from "../../../StatelessAPI/discountApiCalls";

const DiscountModal = (props) => {

  const [discount, setDiscount] = React.useState({
    name: "",
    discountTtype: "",
    amount: "",
    organization: props.businessId,
    couponCode: "",
    branches: [],
    applicableTo: "",
    note: ""
  });
  const [branches, setBranches] = useState([]);
  const [roleNameError, setRoleNameError] = useState("");

  const _getBranches = async () => {
    setBranches([]);
    const fetchBranches = await getBranches(props.businessId);
    setBranches((prevState) => [...prevState, ...fetchBranches]);
  };

  // console.log(branches);

  useEffect(() => {
    _getBranches();
  }, []);

  useEffect(() => {
    if (props.discount) {
      setDiscount(props.discount);
    }
  }, [props.discount]);



  const handleDiscountChange = (e) => {
    setDiscount({
      ...discount,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateDiscount = async (e) => {
    e.preventDefault();
    console.log(discount);
    if (discount.name === "") {
      setRoleNameError("Role name is required");
      return;
    }
    setRoleNameError("");
    // console.log(passedRole);
    const res = await createDiscount(discount);
    // @ts-ignore
    if (res.data.status === "success") {
      props.setShowDiscountModal(false);
      props.getDiscounts();
    }
  };

  const handleUpdateDiscount = async (e) => {
    e.preventDefault();
    console.log(discount);
    if (discount.name === "") {
      setRoleNameError("Role name is required");
      return;
    }
    setRoleNameError("");
    // @ts-ignore
    const res = await updateDiscount(discount, discount._id);
    // @ts-ignore
    if (res.data.status === "success") {
      props.setShowDiscountModal(false);
      props.getDiscounts();
    }
  };

  return (
    <div className="max-w-[440px] lg:min-w-[440px] h-fit flex flex-col items-center bg-white py-2 rounded-md">
      <div className="w-full flex justify-end items-start">
        <span
          onClick={() => props.setShowDiscountModal(false)}
          className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
        >
          ✖
        </span>
      </div>
      {/* all fields... */}
      <div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-3">
        <span className="text-[#19525A] text-[20px] font-[500]">
          Add a new Discount
        </span>
      </div>
      <div className="w-full flex flex-col justify-center items-center p-3">
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">
            Name of the Discount
          </span>
          <input
            name="name"
            onChange={handleDiscountChange}
            value={discount.name}
            type="text"
            className={`w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] ${roleNameError ? "border-rose-500" : "border-[#19525A80]"
              } mt-1 rounded-md shadow-md`}
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">
            Discount Type
          </span>
          <div className="w-full flex justify-center">
            <DropdownWithId
              items={[
                { id: 'overwrite', name: "Overwrite" },
                { id: 'percentage', name: "Percentage Discount" },
                { id: 'amount', name: "Amount Discount" },
              ]}
              selected={discount.discountTtype}
              width={"410px"}
              onSelected={(selected) => {
                setDiscount({
                  ...discount,
                  discountTtype: selected
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">
            Amount of the Discount
          </span>
          <input
            name="amount"
            value={discount.amount}
            onChange={handleDiscountChange}
            type="text"
            className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">
            Coupon Code
          </span>
          <input
            type="text"
            name="couponCode"
            value={discount.couponCode}
            onChange={handleDiscountChange}
            className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md"
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">Branches</span>
          <div className="w-full flex justify-center">
            <MultiSelectDropdown
              items={[
                { id: "-1", name: "Select All" },
                ...branches.map((branch) => ({
                  id: branch._id,
                  name: branch.name
                })),
              ]}
              selectedList={discount.branches}
              itemName="Branch"
              onSelectedItem={(selected) => {
                if (selected === "-1") {
                  if (discount.branches.length === branches.length) {
                    setDiscount({
                      ...discount,
                      branches: []
                    });
                    return;
                  } else {

                    setDiscount({
                      ...discount,
                      branches: branches.map((branch) => branch._id)
                    });
                    return;
                  }
                } else {
                  if (discount.branches.includes(selected)) {
                    setDiscount({
                      ...discount,
                      branches: discount.branches.filter((branch) => branch !== selected)
                    });
                    return;
                  } else {
                    setDiscount({
                      ...discount,
                      branches: [...discount.branches, selected]
                    });
                    return;
                  }
                }
              }}
              width={"410px"}
            />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">
            Application on
          </span>
          <div className="w-full flex justify-center">
            <DropdownWithId
              items={[
                { id: "everything", name: "Everything" },
                { id: 'products', name: "All products" },
                { id: 'services', name: "All services" },
              ]}
              selected={discount.applicableTo}
              width={"410px"}
              onSelected={(selected) => {
                setDiscount({
                  ...discount,
                  applicableTo: selected
                });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <span className="text-[16px] text-[#5B5B5B]">Note</span>
          <textarea name="note"
            onChange={handleDiscountChange}
            value={discount.note}
            className="w-[410px] h-[62px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md" />
        </div>
        <div className="w-full flex justify-end items-end px-3 mt-5">
          <button onClick={() => { props.setShowDiscountModal(false) }} className="h-[32px] w-[112px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4">
            Cancel
          </button>
          <button onClick={(e) => {
            if (props.discount) {
              handleUpdateDiscount(e)
            } else {
              handleCreateDiscount(e)
            }
          }} className="h-[32px] w-[112px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white">
            {props.discount ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
