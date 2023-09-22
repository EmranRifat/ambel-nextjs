import React from "react";
import { useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

const PhoneCodeDropdown = ({ items, selected, onSelected, width }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdown = React.useRef();
	const [phoneCodes, setPhoneCodes] = useState(items);

	const filterItems = (event) => {
		var pnItems = items.filter((item) => {
			return item.phonecode.includes(event.target.value);
		});
		setPhoneCodes(pnItems);
	};

	React.useEffect(() => {
		document.addEventListener("click", handleClickOutside, false);
		return () => {
			document.removeEventListener("click", handleClickOutside, false);
		};
	}, []);
	const handleClickOutside = (event) => {
		// @ts-ignore
		if (dropdown.current && !dropdown.current.contains(event.target)) {
			setIsOpen(false);
			setPhoneCodes(items);
		}
	};

	return (
		<div ref={dropdown} className="h-[40px] shadow-sm" style={{ width: width }}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				style={{ width: width }}
				className={` border h-[40px] border-gray-300 text-[14px] text-black bg-[#E8F0FE]
				rounded-lg gap-1 focus:ring-2 focus:ring-[#19525A8C] flex justify-between pl-[8px] items-center`}
				type="button"
			>
				<span className="w-full">
					<img
						src={`/flags/${items
							.find((item) => item.phonecode === selected)
							?.isoCode.toLowerCase()}.svg`}
						height={20}
						width={28}
						className="rounded-sm"
					/>
				</span>
				{selected}
				<BiChevronDown size={20} className="w-full text-[#5B5B5B]" />
			</button>
			{isOpen && (
				<div
					style={{ width: width }}
					className="relative mb-4 z-10 w-full bg-[#19525A] rounded divide-y divide-gray-100 shadow"
				>
					<ul
						className="max-h-[200px] overflow-y-auto text-sm text-gray-700"
						aria-labelledby="all"
					>
						<input
							className="w-0 h-0 outline-none text-[0px] absolute"
							type="text"
							autoFocus
							id="myInput"
							onKeyUp={filterItems}
						/>
						{phoneCodes.map((item, i) => {
							return (
								<li key={i}>
									<a
										onClick={() => {
											onSelected(item.phonecode);
											setIsOpen(false);
										}}
										className={`block py-2 px-2 text-[12px] cursor-pointer ${
											item.phonecode === selected ? "bg-[#0089C9]" : ""
										} text-white hover:bg-[rgb(0,137,201)]`}
									>
										<div className="flex items-center justify-between gap-1">
											{item.phonecode === selected ? (
												<BiCheck size={25} />
											) : (
												<span className="w-full">
													<img
														src={`/flags/${item.isoCode.toLowerCase()}.svg`}
														height={18}
														width={28}
														className="rounded-sm"
													/>
												</span>
											)}
											{item.phonecode}
										</div>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PhoneCodeDropdown;
