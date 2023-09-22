import React, { useEffect, useRef, useState } from "react";
import Title from "../../Title";
import PractitionerList from "./PractitionerList/PractitionerList";
import RoleandPermission from "./RoleandPermission";
import SidebarStaff from "./SidebarStaff";
import StaffList from "./StaffList/StaffList";
import Task from "./Task/Task";
import StuffSettings from "./StaffList/StaffSettings";
import styles from "../../setup.module.css";
import { useRouter } from "next/router";

const Staff = () => {
	const [show, setShow] = useState(1);
	const container = useRef(null);
	const router = useRouter();

	useEffect(() => {
		if (router.query && router.query.show) {
			// @ts-ignore
			setShow(parseInt(router.query.show) ?? router.query.show);
			scrollToTop();
		}
	}, [router.query, router.query.show]);
	const scrollToTop = () => {
		container.current.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<Title title="Setup your organization" />
			<div className="w-full flex justify-between">
				<div className="pt-4">
					<SidebarStaff
						show={show}
						setShow={setShow}
						scrollToTop={scrollToTop}
					/>
				</div>
				<div
					ref={container}
					className={`w-full h-[74vh] ${styles.scrollbar} pt-5 overflow-y-auto md:pl-5`}
				>
					<div className="mr-5">
						{show === 1 && <StaffList />}
						{show === 2 && <PractitionerList />}
						{show === 3 && <RoleandPermission />}
						{show === 4 && <Task />}
						{show === 5 && <StuffSettings />}
					</div>
				</div>
			</div>
		</>
	);
};

export default Staff;
