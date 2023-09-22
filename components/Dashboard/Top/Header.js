import React, { useEffect, useState } from "react";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { deauthenticate, reavlidateUser } from "../../../store/actions/auth";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Modal from "../../Modal";
import ResetPassword from "../../AccountForm/ResetPassword";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { getBusinessInfo } from "../../../store/actions/business";
import { getPractitionerInfo } from "../../../store/actions/practitioner";
import Dropdown from "../../Dropdown/DropDownId";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetpasswordModal, setResetPasswordModal] = useState(false);
  const dropdown = React.useRef();
  const router = useRouter();

  const [dashboards, setDashboards] = useState([]);

  const [actingUserType, setActingUserType] = useState();

  const onChangeUserType = (dashboardId) => {
    setActingUserType(dashboardId);
    cookie.set("actingUserType", dashboardId);
    const dashboard = dashboards.find((item) => item._id === dashboardId);
    const permissionString = JSON.stringify(
      dashboard?.permissionRole?.permissions
    );
    if (permissionString) {
      localStorage.setItem("permissions", permissionString);
    }
    const roleType = dashboard?.organization
      ? "Organization"
      : dashboard?.user?.userType == "Organization"
        ? "Organization"
        : dashboard?.user?.userType == "Practitioner"
          ? "Practitioner"
          : "User";
    switch (roleType) {
      case "Organization":
        if (dashboard?.user?.userType == "Organization") {
          cookie.set("currentOrganization", dashboard?._id);
        } else {
          cookie.set("currentOrganization", dashboard?.organization?._id);
        }
        cookie.set("dashboardType", "Organization");
        router.push("/business-dashboard");
        break;
      case "Practitioner":
        cookie.set(
          "currentOrganization",
          dashboard?.organization ? dashboard?.organization._id : ""
        );
        cookie.set("currentPractitioner", dashboard?._id);
        cookie.set("dashboardType", "Practitioner");
        router.push("/practitioner-dashboard");
        break;
      default:
        cookie.set("currenUser", dashboard?._id);
        cookie.set("dashboardType", "User");
        router.push("/user-dashboard");
    }
  };

  useEffect(() => {
    console.log("Hello");
    props.reavlidateUser();

    if (cookie.get("dashboardType") === "Organization") {
      props.getBusinessInfo();
    } else if (cookie.get("dashboardType") === "Practitioner") {
      props.getPractitionerInfo();
    }
  }, [actingUserType]);

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
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.deauthenticate();
  };

  useEffect(() => {
    if (props.authUser) {
      const userRoles = props.authUser.userRoles;
      // console.log(userRoles);
      setDashboards([]);

      if (cookie.get("actingUserType")) {
        // console.log("Got cookie: " + cookie.get("actingUserType"));
        // @ts-ignore
        setActingUserType(cookie.get("actingUserType"));
      } else {
        setActingUserType(props.authUser._id);
        cookie.set("currenUser", props.authUser._id);
        cookie.set("actingUserType", props.authUser._id);
        cookie.set("dashboardType", "User");
      }
      setDashboards([props.authUser, ...userRoles]);
    }
  }, [props.authUser]);

  return (
    <React.Fragment>
      {resetpasswordModal && (
        <Modal onClick={setResetPasswordModal} closeOnOutsideClick={true}>
          <ResetPassword setResetPasswordModal={setResetPasswordModal} />
        </Modal>
      )}
      <div className="flex justify-between -ml-5  mr-8">
        <Link href="/">
          <a>
            <Image
              className="cursor-pointer"
              src={"/ambelLogo.png"}
              width={203}
              height={80}
              quality={100}
              alt="logo"
              priority
            />
          </a>
        </Link>
        {props.business && cookie.get("dashboardType") == "Organization" && (
          <div className="items-center p-2 hidden md:flex gap-2">
            <Image
              src={
                props.business?.logo
                  ? props.business?.logo
                  : "/icons/Ellipse75.png"
              }
              placeholder={"blur"}
              blurDataURL={"/icons/Ellipse75.png"}
              alt="img"
              height="40px"
              width="40px"
              className="rounded-md"
            />
            <div className="text-[32px] text-[#5b5b5b] font-[500]">
              {props.business?.name}
            </div>
          </div>
        )}
        <div className="flex justify-end items-center">
          {dashboards.length > 1 && (
            <Dropdown
              width="120px"
              height="30px"
              items={dashboards.map((item, idx) => {
                // console.log(item);
                return {
                  id: item._id,
                  name:
                    idx === 0
                      ? "User"
                      : item.organization?.name
                        ? item.organization?.name
                        : item.name || item.user?.fullName,
                };
              })}
              selected={actingUserType}
              onSelected={(selected) => {
                onChangeUserType(selected);
              }}
            />
          )}
          <div
            title="Notifications"
            className=" text-2xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:p-2.5 text-gray-500"
          >
            <IoIosNotifications />
          </div>
          <div
            title="Settings"
            className="ml-1 text-2xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:p-2.5 text-gray-500"
          >
            <IoMdSettings />
          </div>

          <div ref={dropdown} className="flex items-center">
            <div
              className="ml-2 w-[48px] h-[48px] rounded-full border-2 border-white"
              onClick={(_) => setIsOpen(!isOpen)}
            >
              <Image
                src={props.user?.photo ? props.user?.photo : "/default.jpg"}
                alt="avatar"
                height={48}
                placeholder={"empty"}
                width={48}
                className="rounded-full object-cover"
              />
            </div>
            {isOpen && (
              <div className="z-10 top-7 absolute bg-white divide-y mt-10 mr-10 -ml-10 divide-gray-100 rounded shadow w-30">
                <ul
                  className="py-1 text-sm text-gray-700"
                  aria-labelledby="dropdownDefault"
                >
                  <li
                    onClick={() => {
                      setResetPasswordModal(true);
                    }}
                  >
                    <a className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Reset password
                    </a>
                  </li>
                  <li onClick={handleLogout}>
                    <a className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    business: state?.business?.info?.business,
    practitioner: state?.practitioner?.info?.practitioner,
    authUser: state?.auth?.authUser,
    user: state.user?.info?.user,
  };
};

export default connect(mapStateToProps, {
  deauthenticate,
  reavlidateUser,
  getBusinessInfo,
  getPractitionerInfo,
})(Header);
