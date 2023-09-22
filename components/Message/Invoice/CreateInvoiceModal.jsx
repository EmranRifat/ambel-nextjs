import { useEffect, useState } from "react";
import styles from "../../setup.module.css";
import { BiChevronDown, BiMinus, BiPlus } from "react-icons/bi";
import axios from "../../../utils/axios";
import cookie from "js-cookie";
import Dropdown from "../../Dropdown";
import DropdownButton from "antd/lib/dropdown/dropdown-button";
import PulseLoader from "react-spinners/PulseLoader";

const CreateReceipt = ({
	setShowCreateReceiptModal,
	receiptFor,
	practitioner,
	onSendMessage,
}) => {

	const [goneNext, setGoneNext] = useState(false);
	const [creating, setCreating] = useState(false);
	const [showDiscountItems, setShowDiscountItems] = useState(false);
	const [services, setServices] = useState([]);
	const [receipt, setReceipt] = useState({
		payAmount: "0",
		discountAmount: "0",
		selectedServices: [], //[{title: String, price: Number,quantity: Number,}],
	});

	useEffect(() => {
		_getSevices();
	}, []);

	useEffect(() => {
		setReceipt({ ...receipt, payAmount: getTotalAmount().toFixed(2) });
	}, [receipt.selectedServices, receipt.discountAmount]);

	const _getSevices = async () => {
		const url = "/service";
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
			// console.log(response.data.status)
			if (response?.data?.status === "success") {
				const srvcs = response?.data?.data?.data?.doc;
				// console.log(srvcs);
				setServices(srvcs);
			} else {
			}
		} catch (e) { }
	};

	const _createReceipt = async () => {
		setCreating(true);
		const url = "/payReceipt";
		const data = {
			receiptFor: receiptFor,
			practitioner: practitioner,
			payAmount: receipt.payAmount,
			discountAmount: receipt.discountAmount,
			selectedServices: receipt.selectedServices.filter((item) => {
				return item.price > 0 && item.quantity > 0;
			}),
		};

		try {
			const res = await axios.post(url, data, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
			if (res.data.status === "success") {
				const payload = {
					defaultPrevented: true,
					target: {
						invoice: res.data.data,
						messageType: "invoice",
						message: "New Invoice created",
					},
				};
				console.log('payload', payload)
				onSendMessage(payload);
			}
			setCreating(false);
			setShowCreateReceiptModal(false);
			// console.log(res.data);
		} catch (e) {
			setCreating(false);
			// console.log(e);
		}
	};

	const getTotalAmount = () => {
		const total = receipt.selectedServices.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		return total - parseFloat(receipt.discountAmount) || total || 0;
	};

	return (
		<div className="relative w-[420px] h-[370px] mt-24 text-[#5B5B5B] bg-[#FFFFFF] rounded-[4px] border-[0.5px]">
			<div className="absolute top-2 right-2">
				<span
					onClick={() => setShowCreateReceiptModal(false)}
					className="text-xl text-gray-600 cursor-pointer"
				>
					✖
				</span>
			</div>
			<div className="p-2 border-b bg-[#C8C8C833]">
				<h3 className="text-lg">Select Services and Packages</h3>
			</div>
			{!goneNext && (
				<div className="">
					<div
						className={`h-[280px] overflow-y-auto  ${styles.scrollbar} mr-2`}
					>
						{services.map((item, index) => (
							<label
								key={index}
								className="flex items-center p-2 m-2 border rounded"
							>
								<input
									type="checkbox"
									checked={receipt.selectedServices.some(
										(item2) => item2.id === item._id
									)}
									onChange={(e) => {
										if (e.target.checked) {
											setReceipt({
												...receipt,
												selectedServices: [
													...receipt.selectedServices,
													{
														id: item._id,
														title: item.name,
														price: item.price,
														quantity: 1,
													},
												],
											});
										} else {
											setReceipt({
												...receipt,
												selectedServices: receipt.selectedServices.filter(
													(item3) => item3.id !== item._id
												),
											});
										}
									}}
									className="form-checkbox h-[14px] w-[14px] text-[#FF5A5F] border-[1px] border-[#FF5A5F] rounded-[4px]"
								/>
								<span className="ml-2 text-sm">
									{item.name} ${item.price}
								</span>
							</label>
						))}
						<label className="flex items-center p-2 m-2 border rounded">
							<input
								type="checkbox"
								checked={receipt.selectedServices.some(
									(item2) => item2.id === "custom"
								)}
								onChange={(e) => {
									if (e.target.checked) {
										setReceipt({
											...receipt,
											selectedServices: [
												...receipt.selectedServices,
												{
													id: "custom",
													title: "Custom",
													price: 0,
													quantity: 1,
												},
											],
										});
									} else {
										setReceipt({
											...receipt,
											selectedServices: receipt.selectedServices.filter(
												(item3) => item3.id !== "custom"
											),
										});
									}
								}}
								className="form-checkbox h-[14px] w-[14px] text-[#FF5A5F] border-[1px] border-[#FF5A5F] rounded-[4px]"
							/>
							<span className="ml-2 text-sm">Custom</span>
						</label>
					</div>
					<div className="w-full flex justify-end items-center h-[40px] px-3">
						<div
							onClick={() => setGoneNext(true)}
							className="w-[70px] cursor-pointer h-7 text-sm rounded bg-[#19525A] text-white flex items-center justify-center"
						>
							Next
						</div>
					</div>
				</div>
			)}
			{goneNext && (
				<div className="">
					<div
						className={`h-[280px] overflow-y-auto  ${styles.scrollbar} mr-2`}
					>

						{receipt.selectedServices
							.sort((itm1) => {
								if (itm1.id === "custom") {
									return 1;
								} else return -2;
							})
							.map((item, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-2 m-2 border rounded"
								>
									<span className="ml-2 text-sm">
										{item.id !== "custom"
											? `${item.title} $${item.price}`
											: "Custom"}
									</span>
									{item.id !== "custom" && item.id !== "discount" && (
										<div className="flex items-center gap-[2px]">
											<div
												onClick={(e) => {
													if (item.quantity > 1) {
														setReceipt({
															...receipt,
															selectedServices: receipt.selectedServices.map(
																(item2) => {
																	if (item2.id === item.id) {
																		return {
																			...item2,
																			quantity: item2.quantity - 1,
																		};
																	}
																	return item2;
																}
															),
														});
													} else {
														setReceipt({
															...receipt,
															selectedServices: receipt.selectedServices.filter(
																(item3) => item3.id !== item.id
															),
														});
													}
												}}
												className="hover:bg-slate-200 p-[2px] cursor-pointer rounded-full"
											>
												<BiMinus />
											</div>
											<span>{item.quantity}</span>
											<div
												onClick={(e) => {
													setReceipt({
														...receipt,
														selectedServices: receipt.selectedServices.map(
															(item2) => {
																if (item2.id === item.id) {
																	return {
																		...item2,
																		quantity: item2.quantity + 1,
																	};
																}
																return item2;
															}
														),
													});
												}}
												className="hover:bg-slate-200 p-[2px] cursor-pointer rounded-full"
											>
												<BiPlus />
											</div>
										</div>
									)}
									{item.id === "custom" && (
										<div className="w-[70px] rounded h-[24px] flex items-center border border-[#5b5b5ba2]">
											<span className="w-4 text-sm px-[2px]">$</span>
											<input
												value={item.price}
												onChange={(e) => {
													setReceipt({
														...receipt,
														selectedServices: receipt.selectedServices.map(
															(item2) => {
																if (item2.id === item.id) {
																	return {
																		...item2,
																		price: e.target.value,
																	};
																}
																return item2;
															}
														),
													});
												}}
												className="w-full h-full focus:outline-none px-[2px] py-1 mr-[1px] text-sm"
											/>
										</div>
									)}
								</div>
							))}
						{
							<div className="flex justify-between items-center p-2 m-2 border rounded">
								<span className="ml-2 text-sm">Discount</span>
								<div
									onClick={(e) => {
										// setShowDiscountItems(!showDiscountItems);
									}}
									className="relative cursor-pointer w-[85px] justify-between rounded h-[24px] flex items-center border border-[#5b5b5ba2]"
								>
									<input
										value={receipt.discountAmount}
										onChange={(e) => {
											setReceipt({
												...receipt,
												discountAmount: e.target.value,
											});
										}}
										className="w-full h-full focus:outline-none px-[2px] py-1 ml-[1px] text-sm"
									/>
									<BiChevronDown className="text-xl ml-1 border-l text-[#5B5B5B]" />
									{showDiscountItems && (
										<div className="absolute z-50 w-[85px] top-6 bg-white border rounded">
											<div className="p-[2px]">10</div>
											<div className="p-[2px]">10</div>
											<div className="p-[2px]">10</div>
										</div>
									)}
								</div>
							</div>
						}
					</div>
					<div className="bg-[#C8C8C833] border-t">
						<div className="w-full flex justify-between items-center h-[40px] px-3">
							<div
								onClick={() => setGoneNext(false)}
								className="w-[70px] h-7 cursor-pointer text-sm rounded border border-slate-400 flex items-center justify-center"
							>
								Back
							</div>
							<div className="text-xl mt-1 px-3 text-[#005a09]">
								Total- ${getTotalAmount() ?? "0"}
							</div>
							<div
								onClick={(e) => {
									e.preventDefault();
									_createReceipt();
								}}
								className="w-[70px] h-7 cursor-pointer text-sm rounded bg-[#19525A] text-white flex items-center justify-center"
							>
								{creating ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									"Create"
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateReceipt;
