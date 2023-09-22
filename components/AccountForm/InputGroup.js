import React from "react";

function InputGroup({
	className = "",
	label = "",
	name = "",
	type = "text",
	placeholder = "",
	error = false,
	errorText = "",
	defaultValue = "",
	description = "",
	horizontal = false,
	...newProps
}) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const hasError = error || errorText;
	const finalClass = `${className} ${newProps.disabled ? "cursor-not-allowed" : ""
		} z-20 w-full border ${hasError ? `border-rose-700` : `border-gray-300 invalid:border-rose-400`
		} invalid:border-rose-400 rounded-lg px-4 rounded-lg outline-none transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-[#19525A8C]`;

	return (
		<div className={horizontal ? "sm:flex sm:items-center" : ""}>
			{label && (
				<label
					className={`text-sm text-gray-600 ${hasError && "text-red-600"} ${horizontal && "sm:w-24"
						}`}
					htmlFor={name}
				>
					{label}
				</label>
			)}
			<div className={horizontal ? "sm:flex-1 relative" : "relative"}>
				<input
					type={type == "password" && !showPassword ? "password" : "text"}
					name={name}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={finalClass}
					placeholder={placeholder}
					{...newProps}
				/>
				{type == "password" && (
					<div
						onClick={() => {
							setShowPassword(!showPassword);
						}}
						className={`absolute py-1 right-3 cursor-pointer ${showPassword ? "top-8" : "top-7"
							}`}
					>
						{showPassword ? (
							<svg
								width="22"
								height="9"
								viewBox="0 0 22 9"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1C1 1 4.5 5 11 5C17.5 5 21 1 21 1M3 2.645L1 5M21 5L19.004 2.648M7.914 4.68L7 7.5M14.063 4.688L15 7.5"
									stroke="#5B5B5B"
									strokeOpacity="0.8"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg
								width="20"
								height="14"
								viewBox="0 0 20 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.8383 6.21891C17.7425 2.34453 14.0672 0 10 0C5.93284 0 2.25124 2.34453 0.174129 6.21891L0 6.51119L0.161692 6.8097C2.25746 10.6841 5.93284 13.0286 10 13.0286C14.0672 13.0286 17.7488 10.7152 19.8383 6.8097L20 6.51119L19.8383 6.21891ZM10 11.7537C6.49876 11.7537 3.28358 9.801 1.41791 6.51119C3.28358 3.22139 6.49876 1.26866 10 1.26866C13.5012 1.26866 16.6791 3.22761 18.5759 6.51119C16.6791 9.801 13.495 11.7537 10 11.7537Z"
									fill="#5B5B5B"
									fillOpacity="0.8"
								/>
								<path
									d="M10.1805 2.26379C9.33732 2.26994 8.51485 2.52584 7.81699 2.99916C7.11913 3.47248 6.57719 4.142 6.25961 4.92314C5.94204 5.70429 5.86308 6.56203 6.0327 7.38802C6.20233 8.21402 6.61293 8.97122 7.21264 9.56399C7.81236 10.1568 8.5743 10.5585 9.40221 10.7185C10.2301 10.8785 11.0869 10.7896 11.8643 10.4629C12.6417 10.1363 13.3048 9.58657 13.77 8.88325C14.2352 8.17992 14.4815 7.35452 14.4778 6.5113C14.4754 5.95 14.3622 5.39471 14.1447 4.87723C13.9273 4.35976 13.6099 3.89027 13.2107 3.49569C12.8115 3.10111 12.3383 2.78918 11.8184 2.57779C11.2984 2.3664 10.7418 2.25969 10.1805 2.26379ZM10.1805 9.55235C9.58492 9.54621 9.0044 9.36421 8.51188 9.02922C8.01937 8.69423 7.63682 8.22117 7.41227 7.66947C7.18773 7.11777 7.13122 6.51202 7.24982 5.92831C7.36842 5.34459 7.65686 4.80893 8.0789 4.38861C8.50094 3.96828 9.03777 3.68204 9.62197 3.56582C10.2062 3.4496 10.8117 3.50859 11.3625 3.73538C11.9132 3.96217 12.3847 4.34665 12.7177 4.84053C13.0507 5.33441 13.2303 5.91567 13.234 6.5113C13.2357 6.91217 13.1577 7.30938 13.0047 7.6799C12.8517 8.05042 12.6266 8.38687 12.3426 8.66975C12.0586 8.95264 11.7212 9.17631 11.3501 9.32782C10.9789 9.47932 10.5814 9.55564 10.1805 9.55235Z"
									fill="#5B5B5B"
									fillOpacity="0.8"
								/>
							</svg>
						)}
					</div>
				)}
				{description && (
					<div
						className={`w-full h-4 text-start -mt-1 pb-1 text-gray-600 text-[10px] transition ease-in-out ${isFocused ? "translate-y-2" : ""
							} duration-300`}
					>
						{isFocused && description}
					</div>
				)}
				{errorText && (
					<div className="py-1 px-1 text-start text-xs text-rose-700 rounded-sm">
						{errorText}
					</div>
				)}
			</div>
		</div>
	);
}

export default InputGroup;
