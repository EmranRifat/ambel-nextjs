import Link from "next/link";
import React from "react";
import { ScaleLoader } from "react-spinners";

export default function FinishUp(props) {
	React.useEffect(() => {
		props.uploadForm();
	}, []);

	return (
		<div className="container md:mt-10">
			<div className="flex flex-col items-center">
				{props.loading ? (
					<ScaleLoader color="#585ee8" height={40} width={4} />
				) : (
					<React.Fragment>
						<div className="mt-3 text-xl font-medium text-gray-700">
							Congratulations!
						</div>
						<div className="text-lg  text-gray-400">
							<h2 className="text-center">Your profile is up to date.</h2>
						</div>
						<Link href="/business-dashboard">
							<a className="mt-10">
								<button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-orange-500 hover:text-white hover:border-orange-500">
									Close
								</button>
							</a>
						</Link>
					</React.Fragment>
				)}
			</div>
		</div>
	);
}
