/* eslint-disable react/jsx-key */
import Image from "next/image";
import React from "react";
import logo from "./ambelLogo.png";
import { ImCross } from "react-icons/im";
import topBarItems from "./TopBarItem";
import Link from "next/link";

const Sidebar = ({ setSideBarShow }) => {
	return (
		<>
			<div
				onClick={() => setSideBarShow(false)}
				className="h-screen w-full bg-gray-800 bg-opacity-30 fixed top-0 md:hidden "
			>
				<div className="bg-white h-screen w-1/2 transition ease-in-out delay-150">
					<div className="flex justify-between items-center p-3 px-3">
						<Image src={logo} alt="logo" height={80} width={150} />
						<ImCross
							onClick={() => setSideBarShow(false)}
							className="text-gray-500 text-xl mr-3 cursor-pointer"
						/>
					</div>
					<div className="">
						<ul
							className="py-1 text-sm text-gray-700"
							aria-labelledby="dropdownDefault"
						>
							{topBarItems().map((topbar) => (
								<li key={topbar.id} className="text-lg font-bold p-2">
									<Link href={topbar.link}>
										<a className="block px-4 py-2 hover:bg-gray-100">
											{topbar.name}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
