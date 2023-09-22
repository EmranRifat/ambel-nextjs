import { useState, useEffect } from "react";
import Image from "next/image";
import { BsTelephoneFill } from "react-icons/bs";
import {IoClose} from "react-icons/io5"

function CallToast({ call, setCurrentCall }) {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		if (!call) {
			setIsVisible(false);
			return;
		}
		setIsVisible(true);
		// const timeout = setTimeout(() => {
		// 	setIsVisible(false);
		// 	setCurrentCall(null);
		// }, 10000);
		// return () => clearTimeout(timeout);
	}, [call]);

	return (
		<div
			className={`h-[100%] w-full  flex justify-center items-center ${
				isVisible ? "visible" : "hidden"
			}`}
		>
			<div className="h-[200px] w-[230px] md:h-[250px] md:w-[300px] lg:h-[300px] lg:w-[350px] bg-white rounded-md shadow-xl fixed top-[25%] p-[25px] flex flex-col items-center">
				<img
					src={"/default.jpg"}
					alt="avatar"
					// height={60}
					// placeholder={"empty"}
					// width={60}
					className="rounded-full object-cover h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] md:h-[80px] md:w-[80px]"
				/>
				<div className="text-[12px] md:text-[1rem] lg:text-[1.2rem]">
					Incoming Video Call
				</div>
				<div className="text-[14px] md:text-[1rem] lg:text-[1.5rem]">
					<b>{call.from}</b>
				</div>
				<div className="w-full flex justify-around mt-4">
					<div
						onClick={() => {
							call.decline();
							setIsVisible(false);
							setCurrentCall(null);
						}}
						className="rounded-full cursor-pointer felx justify-center items-center bg-[#f80202] text-white p-[10px]"
					>
						<IoClose size={25}/>
					</div>
					<div
						onClick={() => {
							call.accept();
							setIsVisible(false);
							setCurrentCall(null);
						}}
						className="rounded-full cursor-pointer flex justify-center items-center bg-[#00b87c] text-white p-[15px]"
					>
						<BsTelephoneFill />
					</div>
				</div>
			</div>
		</div>
	);
}
export default CallToast;
