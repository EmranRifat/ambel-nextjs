import React from "react";
import Title from "../../components/Title";
import { PageContainer } from "../../components/page_conatainer";
import AllProfessionals from "../../components/Professionals";
import Navbar from "../../components/Navbar/Navbar";

const ProfePage = () => {
	return (
		<React.Fragment>
			<Title title="Ambel - Your Appointment Solution" />
			<Navbar />
			<PageContainer>
				<AllProfessionals />
			</PageContainer>
		</React.Fragment>
	);
};

export default ProfePage;
