// import { Console } from "console";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "../../../utils/axios";

export default function SavedPaymentMethods(props) {
	const [loading, setLoading] = useState(false);
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [card, setCard] = useState("");
	const { page, setPage, error, setError } = props;
	const router = useRouter();
	useEffect(() => {
		setLoading(true);
		axios
			.get("/payment/saved-payment-methods", {
				headers: {
					Authorization: `Bearer ${cookie.get("jwt")}`,
				},
			})
			.then((response) => {
				setPaymentMethods(response.data);
				setLoading(false);
			});
	}, []);

	const makePayment = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(
				"/payment/create-payment-intent",
				{
					payment_method: card,
					amount: props.amount,
					off_session: true,
					saveCard: false,
					confirm: true,
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
					},
				}
			)
			.then((res) => {
				if (res.status == 200) {
					setLoading(false);
					// props.setShowAddBalanceModal(false);
					router.push(
						`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/payment/confirm`
					);
				}
			});
	};

	// const payAmount
	// console.log(paymentMethods);
	if (loading) return <div>Loading</div>;

	return (
		<>
			<div className="w-full flex justify-end items-start">
				<span className="w-fit ml-auto mr-auto size text-xl text-[#19525A]">
					Pay Amount
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
			<div className="w-fit mr-auto mt-[30px]">
				{paymentMethods.map((e) => (
					<div key={e.id} className="w-full flex mr-aut ml-auto ]">
						<input
							type="radio"
							value={`${e.id}`}
							checked={card == e.id}
							onChange={(event) => {
								// props.setSelectedPaymentMethod("saved cards");
								setCard(event.target.value);
							}}
							className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
						/>
						<label className="text-[12px] text-[#5B5B5B] ml-1">
							{`${e.card.brand} ${e.card.last4}`}
						</label>
					</div>
				))}
				{/* <div className="w-full flex mr-aut ml-auto ]">
          <input
            type="radio"
            value={`${e.fingerprint}`}
            checked={card == e.fingerprint}
            onChange={(event) => {
              // props.setSelectedPaymentMethod("saved cards");
              setCard(event.target.value);
            }}
            className="h-[14px] w-[14px] checked:bg-[#01261C] cursor-pointer"
          />
          <label className="text-[12px] text-[#5B5B5B] ml-1">
            {`${e.brand} ${e.last4}`}
          </label>
        </div> */}
				{/* Hello hi */}
			</div>
			<div className="mt-[20px] w-fit ml-auto flex flex-row">
				<div>
					<button
						className="border-2 border-blue-500 bg-white w-[86px] text-black text-center  p-2 text-[16px] rounded ml-2 "
						onClick={() => {
							props.setPage((prevState) => prevState - 1);
						}}
					>
						Prev
					</button>
				</div>
				<div>
					<button
						className="bg-[#19525A] max-w-fit min-w-[86px] text-white text-center  p-2 text-[16px] rounded ml-2"
						onClick={(e) => {
							makePayment(e);
						}}
					>{`pay ${props.amount}`}</button>
				</div>
			</div>
		</>
	);
}
