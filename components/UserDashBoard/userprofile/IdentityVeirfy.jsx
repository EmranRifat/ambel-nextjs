import Image from "next/image";
import React, { useState } from "react";
const verifies = [
	{
		id: 1,
		title: "Government-Issued ID Card",
		photo: "/icons/govtID.png",
	},
	{
		id: 2,
		title: "Driver’s License",
		photo: "/icons/dlicence.png",
	},
	{
		id: 3,
		title: "Passport",
		photo: "/icons/passport.png",
	},
];
const IdentityVeirfy = ({ setVerification }) => {
	const [clicked, setClicked] = useState(0);

	return (
		<React.Fragment>
			<div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
				<span className="text-[#5B5B5B] text-[32px]">
					Identity Verification
				</span>
			</div>
			<div className="p-4">
				<span className="text-[#5B5B5B] text-[16px] font-[500]">
					Use a valid government-issued ID{" "}
				</span>
				<p className="text-[#5B5B5B] text-[14px] mt-3">
					Only the follwing documents listed below will be accepted. All other
					documents will be rejected
				</p>
			</div>
			<div>
				{verifies.map((verify, index) => (
					<div
						key={verify.id}
						className={`w-full flex flex-col items-center`}
						onClick={() => {
							// console.log(verify.id);
							// console.log(verifies[index + 1].title);
							setClicked(verify.id);
							// setVerification((prevState) => {
							//   const documentType = (id) => {
							//     if (id == 1) return "Government-Issued ID Card";
							//     else if (id == 2) return "Driver’s License";
							//     else if (id == 3) return "Passport";
							//   };

							//   return {
							//     ...prevState,
							//     documentType: documentType(verify.id),
							//   };
							// });
							setVerification((prevState) => {
								return {
									...prevState,
									documentType: verifies[verify.id - 1].title,
								};
							});
						}}
					>
						<div
							className={`w-[553px] h-[60px] flex items-center mt-4 bg-[#EFEFEF] px-4 ${
								clicked == verify.id ? "border-[2px] border-[#19525a]" : ""
							}`}
						>
							<Image src={verify.photo} height={20} width={25} alt="ids" />
							<span className="ml-3">{verify.title}</span>
						</div>
					</div>
				))}
			</div>
		</React.Fragment>
	);
};

export default IdentityVeirfy;
