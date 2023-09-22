import Image from "next/image";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { PulseLoader } from "react-spinners";

export const FileUpload = ({
	temp,
	onFileChange,
	file,
	label,
	category,
	percentage,
}) => {
	return (
		<React.Fragment>
			<div className="w-[10%]"></div>
			<div className="w-[90%]">
				<p className="text-gray-500 font-base">{label}</p>
				<div className="rounded-md w-72 mt-1  h-44 relative">
					{file && (
						<Image
							src={file}
							width={288}
							alt="profile"
							height={176}
							layout="responsive"
							className="object-cover rounded-md"
						/>
					)}
					<label
						htmlFor={category}
						className={`top-0 rounded-md w-72 h-44 absolute flex justify-center items-center border cursor-pointer border-gray-200 hover:border-gray-200 ${
							file ? "hover:bg-gray-50/60 border-none" : "hover:bg-gray-50"
						} transition`}
					>
						{percentage > 0 && category === temp ? (
							<div>
								<PulseLoader size={10} color="#430bff" />
								<p className="font-bold text-sm text-orange-500">
									{percentage}%
								</p>
							</div>
						) : (
							<MdAddCircleOutline
								className={`h-8 w-8 ${file ? "fill-white" : "fill-gray-400"}`}
							/>
						)}
						<input
							id={category}
							type="file"
							name={category}
							accept=".png,.jpg,.jpeg"
							onChange={(event) => onFileChange(event, category)}
							className="hidden"
						/>
					</label>
				</div>
				<small className="text-gray-400">Not more then 2MB</small>
			</div>
		</React.Fragment>
	);
};
