import React from "react";
import styles from "../setup.module.css";
import ProfessionalContent from "./ProfessionalContent";
const AllProfessionals = () => {
	return (
		<React.Fragment>
			<div
				className={`w-full h-[80vh] ${styles.scrollbar} pt-5 overflow-y-auto md:pl-5`}
			>
				{/* need to make query in the database and then pass the data as the props in the professional content component  */}

				<ProfessionalContent  />
			</div>
		</React.Fragment>
	);
};

export default AllProfessionals;
