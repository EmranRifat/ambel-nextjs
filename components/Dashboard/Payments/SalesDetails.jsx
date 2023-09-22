import React from "react";
import { BiDownArrow } from "react-icons/bi";
import { MdPlayArrow } from "react-icons/md";
import styles from "./payment.module.css";

const staffs = [
  {
    id: 1,
    date: "10 Aug, 022",
    time: "10.00 AM(EDT)",
    branch: "Sylhet",
    itemname: "General Consultancy",
    quantity: "x1",
    staff: "Md. Tazrul Islam",
    customer: "Abdul Kader Akash",
    price: "$1000",
    method: "Cash",
    ambelfee: "$100",
    tax: "$0.00",
    discount: "0.00",
    total: "1000.00 USD",
    status: ["Collected-$700", "Remain-$300"],
  },
  {
    id: 2,
    date: "10 Aug, 022",
    time: "10.00 AM(EDT)",
    branch: "Sylhet",
    itemname: "General Consultancy",
    quantity: "x1",
    staff: "Md. Tazrul Islam",
    customer: "Abdul Kader Akash",
    price: "$1000",
    method: "Cash",
    ambelfee: "$100",
    tax: "$0.00",
    discount: "0.00",
    total: "1000.00 USD",
    status: ["Collected-$700", "Remain-$300"],
  },
  {
    id: 3,
    date: "10 Aug, 022",
    time: "10.00 AM(EDT)",
    branch: "Sylhet",
    itemname: "General Consultancy",
    quantity: "x1",
    staff: "Md. Tazrul Islam",
    customer: "Abdul Kader Akash",
    price: "$1000",
    method: "Cash",
    ambelfee: "$100",
    tax: "$0.00",
    discount: "0.00",
    total: "1000.00 USD",
    status: ["Collected-$700", "Remain-$300"],
  },
  {
    id: 4,
    date: "10 Aug, 022",
    time: "10.00 AM(EDT)",
    branch: "Sylhet",
    itemname: "General Consultancy",
    quantity: "x1",
    staff: "Md. Tazrul Islam",
    customer: "Abdul Kader Akash",
    price: "$1000",
    method: "Cash",
    ambelfee: "$100",
    tax: "$0.00",
    discount: "0.00",
    total: "1000.00 USD",
    status: ["Collected-$700", "Remain-$300"],
  },
];
const SalesDetails = () => {
  return (
    <>
      <div className="bg-white h-[40vh] shadow-md mt-5 px-4 py-5 ">
        <span className="text-[#5B5B5B] text-[20px] font-[500]">
          Sales Details
        </span>
        <div className={`${styles.scrollbar} overflow-x-auto h-[35vh] mt-3`}>
          <table className="w-[1218px] text-sm text-left">
            <thead className="text-gray-600 border-b-2 border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="pr-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Date</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6  py-3 text-[#5B5B5B] font-normal text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Branch</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px] whitespace-nowrap"
                >
                  <div className="flex">
                    <p className="my-auto">Item Name</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Staff/Referred</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Customer</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Price</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  Method
                </th>
                <th className="px-6 py-3 text-[#5B5B5B] font-normal w-[160px] text-[16px] whitespace-nowrap">
                  Ambel Fee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  Tax
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  <div className="flex">
                    <p className="my-auto">Total</p>
                    <div className="ml-1">
                      <MdPlayArrow className="my-0  w-[15px] h-[16px] rotate-[270deg]" />
                      <BiDownArrow className="-mt-[2px] text-[11px] my-0 ml-[2px]" />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-normal text-[#5B5B5B] text-[16px]"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => {
                return (
                  <tr
                    className={`bg-white  border-b hover:bg-gray-50`}
                    key={index}
                  >
                    <td
                      scope="row"
                      className="pr-6 py-4 flex flex-col font-normal text-gray-700 w-[150px]"
                    >
                      <span> {staff.date}</span>
                      <span> {staff.time}</span>
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 w-[140px]"
                    >
                      {staff.branch}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4  font-normal text-gray-700 w-[180px]"
                    >
                      {staff.itemname}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.quantity}
                    </td>
                    <td
                      scope="row"
                      className="px-6  py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.staff}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.customer}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.method}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal w-[180px] text-gray-700 "
                    >
                      {staff.ambelfee}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.tax}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      {staff.discount}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      <span className="text-[#5B5B5B] text-[16px]">
                        $ {staff.total}
                      </span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                    >
                      <p>{staff.status[0]}</p>
                      <p>{staff.status[1]}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
          <button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
            Show all
          </button>
        </div> */}
      </div>
    </>
  );
};

export default SalesDetails;
