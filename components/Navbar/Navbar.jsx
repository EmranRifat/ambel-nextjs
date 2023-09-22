 import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "../../components/Modal";
import Login from "../AccountForm/login";
import Signup from "../AccountForm/signup";
import ResourceDropdown from "./ResourceDropdown";
import Verification from "../AccountForm/verification";
import SolutionDropDown from "./SolutionDropDown";
import HelpDropdown from "./HelpDropdown";
import { CustomDropdown1, CustomDropdown2 } from "./CustomDropdown";
import FeatureDropdown from "./FeatureDropdown";
import { connect } from "react-redux";
import cookie from "js-cookie";
import { getCookie } from "cookies-next";
import Router, { useRouter } from "next/router";
import ForgotPassword from "../AccountForm/ForgotPassword";
import { decrypt } from "../../utils/utility";
import {
	reavlidateUser,
	removeCookie,
	setCookie,
} from "../../store/actions/auth";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { SocketContext } from "../../pages/_app";

const Navbar = (props) => {
	const [state, setState] = useState(false);
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [openSignupModal, setOpenSignupModal] = useState(false);
	const [openForgotPassModal, setOpenForgotPassModal] = useState(false);
	const [openVerificationModal, setOpenVerificationModal] = useState(false);
	const [email, setEmail] = useState("");
	const [invitaionObject, setInvitaionObject] = useState(null);
	const { socket, setSocket } = useContext(SocketContext);
	const navRef = useRef();
	const router = useRouter();
	const [allActiveUsers, setAllActiveUsers] = useState([])
	useEffect(() => {
		socket?.emit('add_new_user', { userId: props.authUser?._id })
	}, [props.authUser?._id, socket])

	useEffect(() => {
		socket?.on('get_all_active_user', data => {
			console.log('allActiveUser', data)
			setAllActiveUsers(data)
		})
	}, [props.authUser?._id, socket])




	useEffect(() => {
		props.reavlidateUser();
	}, []);

	useEffect(() => {
		const body = document.body;

		// Disable scrolling
		const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
		if (state) body.classList.add(...customBodyStyle);
		// Enable scrolling
		else body.classList.remove(...customBodyStyle);

		// Sticky strick
		const customStyle = ["sticky-nav", "fixed", "border-b"];
		// window.onscroll = () => {
		//   if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
		//   else navRef.current.classList.remove(...customStyle);
		// };
		if (
			openLoginModal ||
			openSignupModal ||
			openVerificationModal ||
			openForgotPassModal
		)
			body.classList.add("overflow-hidden");
		else body.classList.remove("overflow-hidden");
	}, [
		state,
		openLoginModal,
		openSignupModal,
		openVerificationModal,
		openForgotPassModal,
	]);

	// removing the token
	const logout = () => {
		axios
			.get("users/signout", {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			.then(() => {
				toast.warn("Previuos Login session expired", {
					position: "top-right",
					autoClose: 2000,
				});
				removeCookie("jwt");
			})
			.catch((err) => {
				// console.log(err);
				removeCookie("jwt");
			});
	};

	useEffect(() => {
		// console.log("user: ", props.user);
		if (!router.isReady) return;

		const { requireLogin, invitation_token, newUser, social, auth_token } =
			router.query;
		if (social && auth_token) {
			setCookie("jwt", auth_token);
			router.push("/user-dashboard");
		}
		if (invitation_token) {
			if (cookie.get("jwt")) {
				logout();
			}
			const invitation = JSON.parse(decrypt(invitation_token));
			setInvitaionObject(invitation);
		}

		if (newUser == "true") {
			setOpenSignupModal(true);
		} else if (newUser == "false") {
			setOpenLoginModal(true);
		}

		if (requireLogin == "true") {
			setOpenLoginModal(true);
		}
	}, [router.isReady]);

	return (
		<nav
			ref={navRef}
			className="bg-[#FAFAFA] h-[70px] shadow-md w-full mx-auto top-0 z-20 fixed"
		>
			{openLoginModal && (
				<Modal onClick={setOpenLoginModal} closeOnOutsideClick={false}>
					<Login
						setSignupModal={setOpenSignupModal}
						setLoginModal={setOpenLoginModal}
						email={email}
						invitation={invitaionObject}
						setEmail={setEmail}
						setOpenVerificationModal={setOpenVerificationModal}
						setOpenForgotPassModal={setOpenForgotPassModal}
					/>
				</Modal>
			)}
			{openSignupModal && (
				<Modal onClick={setOpenSignupModal} closeOnOutsideClick={false}>
					<Signup
						setSignupModal={setOpenSignupModal}
						setLoginModal={setOpenLoginModal}
						email={email}
						invitation={invitaionObject}
						setEmail={setEmail}
						setOpenVerificationModal={setOpenVerificationModal}
					/>
				</Modal>
			)}
			{openVerificationModal && (
				<Modal onClick={setOpenVerificationModal}>
					<Verification
						setOpenVerificationModal={setOpenVerificationModal}
						email={email}
						setEmail={setEmail}
						invitation={invitaionObject}
					/>
				</Modal>
			)}

			{openForgotPassModal && (
				<Modal onClick={setOpenVerificationModal}>
					<ForgotPassword
						setLoginModal={setOpenLoginModal}
						setOpenForgotPassModal={setOpenForgotPassModal}
						email={email}
						setEmail={setEmail}
					/>
				</Modal>
			)}
			<div className="items-center px-4 mx-auto lg:w-[90%] lg:flex lg:px-2">
				<div className="flex items-center justify-between py-1 pb-8 lg:block">
					<Link href="/">
						<a>
							<Image
								className=" cursor-pointer"
								src={"/ambelLogo.png"}
								width={180}
								height={50}
								quality={100}
								alt="logo"
								priority
							/>
						</a>
					</Link>
					<div className="lg:hidden">
						<button
							className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
							onClick={() => setState(!state)}
						>
							{state ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 8h16M4 16h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
				<div
					className={`flex-1 justify-between flex-row lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 h-[70px] ${state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
						}`}
				 >
					<div className="flex-1 ">
						<ul className="justify-center items-center lg:flex lg:space-x-6 ">
							<CustomDropdown1 child={<FeatureDropdown />} title="Features" />
							<Link href="/plans">
								<a>
									<CustomDropdown2 title="Plans" />
								</a>
							</Link>
							<CustomDropdown1 child={<SolutionDropDown />} title="Solutions" />
							<CustomDropdown1 child={<ResourceDropdown />} title="Resources" />
							<Link
								href={{ pathname: "/professionals", query: { type: "All" } }}
							>
								<a>
									<CustomDropdown2 title="Find professinal" />
								</a>
							</Link>
							<CustomDropdown1 child={<HelpDropdown />} title="Help" />
						</ul>
					</div>




					<div className="flex mb-8">
						<ul className="flex items-center justify-between  space-x-0 lg:space-x-3 flex-row">
							{getCookie("jwt") === "" || getCookie("jwt") === undefined ? (
								<React.Fragment>
									<li
										key={8}
										className=" lg:mt-0"
										onClick={() => {
											setOpenSignupModal(true);
										}}
									>
										<a className="cursor-pointer px-5 py-2.5  text-center w-full text-white bg-[#003F48] hover:bg-[#13262e] rounded-md transform block lg:inline">
											Sign Up
										</a>
									</li>
									<li
										key={7}
										className=" "
										onClick={() => {
											setOpenLoginModal(true);
										}}
									>
										<a className="ml-5 lg:ml-0 cursor-pointer px-5 py-2.5 text-center border text-[#595959] hover:text-gray-900 rounded-md block lg:inline lg:border-0">
											Sign in
										</a>
									</li>
								</React.Fragment>
							) : (
								<a
									onClick={() => {
										const dashboardType = cookie.get("dashboardType");

										if (dashboardType === "Organization") {
											Router.push("/business-dashboard");
										} else if (dashboardType === "Practitioner") {
											Router.push("/practitioner-dashboard");
										} else {
											Router.push("/user-dashboard");
										}
									}}
									className="cursor-pointer p-2 text-center text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow block lg:inline"
								>
									Dashboard
								</a>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state?.auth?.isAuthenticated,
		user: state.user.info,
		authUser: state?.auth?.authUser,
	};
};
export default connect(mapStateToProps, { reavlidateUser })(Navbar);
