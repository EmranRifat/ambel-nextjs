import React from "react";
import { useState } from "react";
import NewIntakeAppoinment from "./NewIntakeAppoinment";
import NewIntakeContents from "./NewIntakeContents";
import NewIntakeGeneral from "./NewIntakeGeneral";
import NewIntakeHeader from "./NewIntakeHeader";
import NewIntakeProfile from "./NewIntakeProfile";
import NewIntakeQuestinaries from "./NewIntakeQuestinaries";
import axios from "../../../../utils/axios";

const nextItemMap = {
	General: "Appointment type",
	"Appointment type": "Profile fields",
	"Profile fields": "Questionaries",
	Questionaries: "Consents",
};
const dummyProfile = {
	firstName: {
		include: false,
		required: false,
	},
	lastName: {
		include: false,
		required: false,
	},
	email: {
		include: false,
		required: false,
	},
	prefferedName: {
		include: false,
		required: false,
	},
	prefix: {
		include: false,
		required: false,
	},
	homePhone: {
		include: false,
		required: false,
	},
	mobilePhone: {
		include: false,
		required: false,
	},
	workPhone: {
		include: false,
		required: false,
	},
	faxPhone: {
		include: false,
		required: false,
	},
	address: {
		include: false,
		required: false,
	},
	dateOfBirth: {
		include: false,
		required: false,
	},
	gender: {
		include: false,
		required: false,
	},
	socialSecurityNumber: {
		include: false,
		required: false,
	},
	personalHealthNumber: {
		include: false,
		required: false,
	},
	gurdian: {
		include: false,
		required: false,
	},
	emergencyContact: {
		include: false,
		required: false,
	},
};

const dummyData = {
	general: {
		name: "",
		automatic: "",
		require: "",
		validFor: "",
		description: "",
	},
	appointment: "All appointment",

	questionaries: {},
	consents: {
		fullName: "",
		text: "",
		declaration: "",
		signature: "",
		disagreeOption: "",
		customerSignature: "",
	},
};

const NewIntake = () => {
	const [eleActive, setEleActive] = useState("General");
	const [general, setGeneral] = useState(
		JSON.parse(localStorage.getItem("newIntakeGeneral")) || dummyData.general
	);

	const [appointment, setAppointment] = useState(
		JSON.parse(localStorage.getItem("newIntakeAppointment")) ||
			dummyData.appointment
	);
	const [profile, setProfile] = useState(
		JSON.parse(localStorage.getItem("newIntakeProfile")) || dummyProfile
	);
	const [questionaries, setQuestionaries] = useState(
		JSON.parse(localStorage.getItem("newIntakeQuestionaries")) ||
			dummyData.questionaries
	);
	const [consents, setConsents] = useState(
		JSON.parse(localStorage.getItem("newIntakeConsents")) || dummyData.consents
	);
	const handleNext = (field) => {
		setEleActive(nextItemMap[field]);
	};
	const saveData = async () => {
		try {
			const data = {
				general: general,
				appointment: appointment,
				profile: profile,
				questionaries: questionaries,
				consents: consents,
			};
			const res = await axios.post("/intakeform", data);
			// console.log(res);
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<>
			{/* intake form create header */}
			<NewIntakeHeader eleActive={eleActive} setEleActive={setEleActive} />
			{eleActive === "General" && (
				<NewIntakeGeneral
					handleNext={handleNext}
					data={general}
					setdata={setGeneral}
				/>
			)}
			{eleActive === "Appointment type" && (
				<NewIntakeAppoinment
					handleNext={handleNext}
					data={appointment}
					setdata={setAppointment}
				/>
			)}
			{eleActive === "Profile fields" && (
				<NewIntakeProfile
					handleNext={handleNext}
					data={profile}
					setdata={setProfile}
				/>
			)}
			{eleActive === "Questionaries" && (
				<NewIntakeQuestinaries handleNext={handleNext} />
			)}
			{eleActive === "Consents" && (
				<NewIntakeContents
					data={consents}
					setData={setConsents}
					saveData={saveData}
				/>
			)}
		</>
	);
};

export default NewIntake;
