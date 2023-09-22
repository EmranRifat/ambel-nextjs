import { useState } from "react";
import styles from "../../setup.module.css";

const PayNowModal = ({ setShowPayNowModal, invoice }) => {
	const [tipAmount, setTipAmount] = useState("0");

	const paymentOptions = [
		"Balance",
		"Debit/Credit Card",
		"PayPal",
		"Local",
		"Tip",
	];
	const [selectetPaymentOption, setSelectetPaymentOption] = useState(
		paymentOptions[0]
	);

	const amountToPay = tipAmount
		? (parseFloat(invoice?.payAmount) + parseFloat(tipAmount)).toFixed(2)
		: (invoice?.payAmount).toFixed(2);

	return (
		<div className="relative w-[420px] h-[370px] mt-24 text-[#5B5B5B] bg-[#FFFFFF] rounded-[4px] border-[0.5px]">
			<div className="absolute top-2 right-2">
				<span
					onClick={() => setShowPayNowModal(false)}
					className="text-xl text-gray-600 cursor-pointer"
				>
					✖
				</span>
			</div>
			<div className="p-2 border-b bg-[#C8C8C833]">
				<h3 className="text-lg">Select a payment method</h3>
			</div>
			{
				<div className="h-[280px] ">
					<div className={`overflow-y-auto  ${styles.scrollbar} mr-2`}>
						{paymentOptions.map((item, index) =>
							item === "Tip" ? (
								<div
									key={index}
									className="flex justify-between items-center p-2 m-2 border rounded"
								>
									<span className="ml-2 text-sm">{item}</span>
									<div className="w-[70px] rounded h-[24px] flex items-center border border-[#5b5b5ba2]">
										<span className="w-4 text-sm px-[2px]">$</span>
										<input
											value={tipAmount}
											onChange={(e) => {
												setTipAmount(e.target.value);
											}}
											className="w-full h-full focus:outline-none px-[2px] py-1 mr-[1px] text-sm"
										/>
									</div>
								</div>
							) : (
								<label
									key={index}
									onClick={() => setSelectetPaymentOption(item)}
									className="flex items-center p-2 m-2 border rounded"
								>
									<input
										type="radio"
										checked={item === selectetPaymentOption}
										onChange={(e) => {
											if (e.target.checked) {
											} else {
											}
										}}
										className="form-radio h-[14px] w-[14px] text-[#FF5A5F] border-[1px] border-[#FF5A5F] rounded-[4px]"
									/>
									<span className="ml-2 text-sm">{item}</span>
								</label>
							)
						)}
					</div>
					<div className="text-lg mt-1 w-full text-end px-3 text-[#005a09] border-t border-slate-400">
						Total- ${amountToPay}
					</div>
					<div className="w-full flex justify-end items-center h-[40px] px-3">
						<div
							onClick={() => {
								// setShowPayNowModal(false);
							}}
							className="w-[70px] cursor-pointer h-7 text-sm rounded bg-[#19525A] text-white flex items-center justify-center"
						>
							Next
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default PayNowModal;
