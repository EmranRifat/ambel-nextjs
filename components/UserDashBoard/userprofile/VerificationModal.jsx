import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdClear, MdSubject } from "react-icons/md";
import axios from "../../../utils/axios";
import IdentityVeirfy from "./IdentityVeirfy";
import IdentityVerify2 from "./IdentityVerify2";
import IdentityVerify3 from "./IdentityVerify3";
import PersonalIfon2 from "./PersonalIfon2";
import PersonalInfo from "./PersonalInfo";
import VerifyMethod from "./VerifyMethod";
import cookie from "js-cookie";

const VerificationModal = (props) => {
	const [count, setCount] = useState(1);
	const [error, setError] = useState("");
	const [verification, setVerification] = useState({
		method: "Government Issued Id",
		firstName: "",
		middleName: "",
		lastName: "",
		dateOfBirth: "",
		nationality: "Bangladesh",
		address: "",
		city: "",
		postalCode: "",
		documentType: "",
		frontImageOfDocument: null,
		backImageOfDocument: null,
		openMouthImg: null,
		closeEyesImg: null,
		smileFaceImg: null,
		rsFaceImg: null,
		lsFaceImg: null,
		naturalFaceImg: null,
	});
	const changeCount = () => {
		if (count >= 6) {
			setCount(6);
		} else {
			setCount(count + 1);
		}
	};
	useEffect(() => {
		// console.log(verification);
	}, [verification]);

	// console.log(verification);

	const verificationHandler = async () => {
		const formData = new FormData();
		Object.keys(verification).map((item, index) => {
			if (verification[item]) {
				formData.append(item, verification[item]);
			}
		});
		try {
			const response = await axios.post(
				"/users/verificationphotoupload",
				formData,
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
						"content-type": "application/json",
					},
				}
			);

			// console.log(response.data);
			if ((response.data = "success")) {
				setError("");
				props.setVerifyModal(false);
			} else {
				setError("Something went wrong! Try again.");
			}
		} catch (err) {
			// console.log(err);
			setError("Something went wrong! Try again.");
		}
	};
	const verificationMailHandler = async () => {
		try {
			const response = await axios.post(
				"/users/sendmail",
				{
					subject: "Verification Schedule",
					body: "Your verification schedule at 9.00pm",
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
						"content-type": "application/json",
					},
				}
			);
			// console.log(response.data);
			if ((response.data = "success")) {
				setError("");
				props.setVerifyModal(false);
			} else {
				setError("Something went wrong! Try again.");
			}
		} catch (err) {
			// console.log(err);
			setError("Something went wrong! Try again.");
		}
	};
	return (
		<React.Fragment>
			<div className="w-[600px] h-[655px] flex flex-col justify-between z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
				<div>
					<div className="w-full flex justify-between items-center px-3">
						{count > 1 && (
							<AiOutlineArrowLeft
								onClick={() => setCount(count - 1)}
								className="font-bold text-xl cursor-pointer"
							/>
						)}
						<MdClear
							onClick={() => {
								props.setVerifyModal(false);
								setError("");
							}}
							className={`font-bold text-xl cursor-pointer ${
								count === 1 && "relative left-[97%]"
							}`}
						/>
					</div>

					{/* rendering components.. */}
					{count === 1 && <VerifyMethod setVerification={setVerification} />}
					{count === 2 && (
						<PersonalInfo
							verification={verification}
							setVerification={setVerification}
						/>
					)}
					{count === 3 && <PersonalIfon2 setVerification={setVerification} />}
					{count === 4 && <IdentityVeirfy setVerification={setVerification} />}
					{count === 5 && <IdentityVerify2 setVerification={setVerification} />}
					{count === 6 && <IdentityVerify3 setVerification={setVerification} />}
				</div>

				<div className="w-full px-4 flex justify-between items-center">
					<div className="flex">
						<div className="w-[25px] h-[5px] ml-2 rounded-sm bg-[#19525A]"></div>
						{verification.method != "Visual Verification" && (
							<>
								<div
									className={`w-[25px] h-[5px] ml-2 rounded-sm ${
										count >= 2 ? "bg-[#19525A]" : "bg-gray-400"
									}`}
								></div>
								<div
									className={`w-[25px] h-[5px] ml-2 rounded-sm  ${
										count >= 3 ? "bg-[#19525A]" : "bg-gray-400"
									}`}
								></div>
								<div
									className={`w-[25px] h-[5px] ml-2 rounded-sm  ${
										count >= 4 ? "bg-[#19525A]" : "bg-gray-400"
									}`}
								></div>
								<div
									className={`w-[25px] h-[5px] ml-2 rounded-sm  ${
										count >= 5 ? "bg-[#19525A]" : "bg-gray-400"
									}`}
								></div>
								<div
									className={`w-[25px] h-[5px] ml-2 rounded-sm  ${
										count >= 6 ? "bg-[#19525A]" : "bg-gray-400"
									}`}
								></div>
							</>
						)}
					</div>
					{verification.method != "Visual Verification" && count != 6 ? (
						<button
							onClick={changeCount}
							className="h-[36px] w-[140px] text-white bg-[#19525A] text-[16px] rounded-md"
						>
							Continue
						</button>
					) : (
						<button
							className="h-[36px] w-[140px] text-white bg-[#19525A] text-[16px] rounded-md"
							onClick={() => {
								//sendmail
								if (verification.method == "Visual Verification") {
									//send mail
									verificationMailHandler();
								} else {
									verificationHandler();
								}
							}}
						>
							{verification.method == "Visual Verification"
								? "Send Mail"
								: "Complete"}
						</button>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default VerificationModal;
