/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { FaHospitalUser } from "react-icons/fa";
import {
	MdWork,
	MdBusinessCenter,
	MdNotificationsActive,
	MdApps,
} from "react-icons/md";

import {
	core,
	booking,
	business_tools,
	advance_notification,
	apps,
} from "./FeatureCoreItems";

const FeatureDropdown = () => {
	return (
		<>
			<div
				className={`md:group-hover:block rounded-md group-hover:block hidden lg:shadow border-b-2 bg-white lg:absolute lg:top-28 lg:left-28 text-black pt-1`}
			>
				<div className="flex flex-col lg:flex-row p-3">
					<div className="p-2">
						<div className="flex items-center p-2">
							<FaHospitalUser className="text-3xl text-indigo-500 ml-2" />
							<span className="text-xl font-bold text-gray-700 ml-2">Core</span>
						</div>
						{core.map((cores) => (
							<li className="" key={cores.id}>
								<Link href="#" key={cores.id}>
									<a className="rounded-t  cursor-pointer hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
										{cores.name}
									</a>
								</Link>
							</li>
						))}
					</div>
					<div className=" lg:border-l-2 p-2">
						<div className="flex items-center p-2">
							<MdWork className="text-3xl text-yellow-500 ml-2" />
							<span className="text-xl font-bold text-gray-700 ml-2">
								Booking
							</span>
						</div>
						{booking.map((book, i) => (
							<li key={i}>
								<Link href="#">
									<a className="rounded-t  cursor-pointer hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
										{book.name}
									</a>
								</Link>
							</li>
						))}
					</div>
					<div className="lg:border-l-2 p-2">
						<div className="flex items-center p-2">
							<MdBusinessCenter className="text-3xl text-sky-500 ml-2" />
							<span className="text-xl font-bold text-gray-700 ml-2">
								Organization Tools
							</span>
						</div>
						{business_tools.map((tool) => (
							<li className="" key={tool.id}>
								<Link href="#" key={tool.id}>
									<a className="rounded-t  cursor-pointer hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
										{tool.name}
									</a>
								</Link>
							</li>
						))}
					</div>
					<div className="lg:border-l-2 p-2">
						<div className="flex items-center p-2">
							<MdNotificationsActive className="text-3xl text-orange-700 ml-2" />
							<span className="text-xl font-bold text-gray-700 ml-2">
								Advance Notification
							</span>
						</div>
						{advance_notification.map((advance) => (
							<li className="" key={advance.id}>
								<Link href="#" key={advance.id}>
									<a className="rounded-t  cursor-pointer hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
										{advance.name}
									</a>
								</Link>
							</li>
						))}
					</div>
					<div className="lg:border-l-2 p-2">
						<div className="flex items-center p-2">
							<MdApps className="text-3xl text-fuchsia-500 ml-2" />
							<span className="text-xl font-bold text-gray-700 ml-2">Apps</span>
						</div>
						{apps.map((app) => (
							<li className="" key={app.id}>
								<Link href="#" key={app.id}>
									<a className="rounded-t  cursor-pointer hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
										{app.name}
									</a>
								</Link>
							</li>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default FeatureDropdown;
