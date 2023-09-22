
import React from 'react'
import profile from "./images/profile.png";
import photo1 from "./images/photo-1.avif";
import mijanur from "./images/mijanur.jpg";
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';

const Payments = () => {
    const [payments, setPayments] = React.useState([
        {
            id: 0,
            userInfo: {
                name: "Bonnie Green",
                image: profile,
            },
            invoice: "#123456789",
            staff: "Dr. Mijanur Rahman",
            date: "2020/06/01",
            amount: "200",
            tax: "10",
            discount: "10",
            status: "Paid",
            total: "200",
        },
        {
            id: 1,
            userInfo: {
                name: "Bonnie Green",
                image: photo1,
            },
            invoice: "#123456789",
            staff: "Dr. Mijanur Rahman",
            date: "2020/06/01",
            amount: "200",
            tax: "10",
            discount: "10",
            status: "UnPaid",
            total: "200",
        },
        {
            id: 2,
            userInfo: {
                name: "Bonnie Green",
                image: photo1,
            },
            invoice: "#123456789",
            staff: "Dr. Mijanur Rahman",
            date: "2020/06/01",
            amount: "200",
            tax: "10",
            discount: "10",
            status: "Paid",
            total: "200",
        },
        {
            id: 3,
            userInfo: {
                name: "Bonnie Green",
                image: mijanur,
            },
            invoice: "#123456789",
            staff: "Dr. Mijanur Rahman",
            date: "2020/06/01",
            amount: "200",
            tax: "10",
            discount: "10",
            status: "UnPaid",
            total: "200",
        },
        {
            id: 4,
            userInfo: {
                name: "Bonnie Green",
                image: profile,
            },
            invoice: "#123456789",
            staff: "Dr. Mijanur Rahman",
            date: "2020/06/01",
            amount: "200",
            tax: "10",
            discount: "10",
            status: "Paid",
            total: "200",
        },
    ]);

    return <div className='mt-8'>
        <div className="bg-white shadow-md rounded-lg mb-4 px-4 py-1">
            <div className='my-3 mb-5 flex justify-between items-center'>
                <div>
                    <h6 className='text-lg text-gray-900'>Payment</h6>
                </div>
                <div className='sm:w-80 w-[70%]'>
                    <div className="w-full flex items-center justify-between border py-1 px-3 border-gray-200 rounded-3xl text-sm mr-5 hover:ring-1">
                        <input
                            type="text"
                            placeholder="Search ID or name..."
                            className="outline-none p-1 w-full "
                        />
                        <BiSearch className="text-xl opacity-70 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-600 bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Patients
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Invoice
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Staff
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tax
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => {
                            return <tr className={`bg-white  border-b hover:bg-gray-50`
                            } key={payment.id}>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    <div className="flex items-center h-full">
                                        <Image
                                            src={payment.userInfo.image}
                                            alt="patient"
                                            height={40}
                                            width={40}
                                            className='object-cover rounded'
                                        />
                                        <div className="ml-3 truncate">
                                            <p className="text-md font-normal text-gray-700">{payment.userInfo.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    {payment.invoice}
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    {payment.staff}
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    {payment.date}
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    ${payment.amount}
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    {payment.tax}%
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    ${payment.discount}
                                </td>
                                <td scope="row" className="px-6 py-4  font-normal  whitespace-nowrap">
                                    <span className='bg-orange-100 px-2 py-1 rounded text-gray-600'>{payment.status}</span>
                                </td>
                                <td scope="row" className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap">
                                    ${payment.total}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='mt-5 mb-2 text-sm flex w-full items-center justify-center'>
                <button className='py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full'>
                    Show all
                </button>
            </div>
        </div>
    </div>
}

export default Payments;