/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { useEffect } from "react";
import topBarItems from "./TopBarItem";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styles from "./style.module.css";
import { hasPermission } from "../../../utils/permissions";
import Cookies from "js-cookie";

const TopBar = (props) => {
  const router = useRouter();
  const [items, setItems] = React.useState([]);

  const [businessData, setBusinessData] = React.useState({
    logo: "",
    name: "",
    prfileImage: "",
    shop: false,
    customerAlias: "Customers",
    serviceAlias: "Service",
  });

  useEffect(() => {
    if (props.info?.business) {
      setBusinessData({ ...businessData, ...props.info?.business });
    }
  }, [props.info]);

  useEffect(() => {
    if (router.isReady) {
      setItems(topBarItems(router.pathname));
    }
  }, [router.isReady]);

  // console.log(props.user);

  return (
    <React.Fragment>
      <div
        className={`overflow-x-auto ${styles.scrollbar} h-[74px] py-2 mb-[0.5px] mr-[26px] shadow-md items-center rounded-[10px] bg-white flex ring-[0.5px] ring-[#19525A]`}
      >
        {items
          .filter((itm) => {
            if (
              hasPermission(
                props.user?.userRoles.find(
                  (itm) => itm._id == Cookies.get("actingUserType")
                )?.permissionRole?.permissions,
                itm.slug,
                "read"
              )
            ) {
              if (
                itm.slug === "resources" &&
                props.info?.business?.integrations?.length == 0
              ) {
                return false;
              }
              return true;
            }
            return false;
          })
          .map((item, i) => {
            if (item.slug === "shop" && !businessData.shop) {
              return <div key={i}></div>;
            } else {
              return (
                <Link href={item.link} key={i}>
                  <a
                    className={`cursor-pointer ${router.pathname === item.link
                      ? "bg-[#19525A] text-white mx-[12px] ring-4 ring-[#b1c2c5] px-4 py-[5px]  "
                      : " text-[#5B5B5B] hover:text-[#0a3339] first:ml-[22px] px-[14px] "
                      }
                     py-[5px] first:ml-[20px]  text-[18px] rounded-[8px] transition-transform`}
                  >
                    {item.slug == "customers"
                      ? businessData.customerAlias ?? item.name
                      : item.name}
                  </a>
                </Link>
              );
            }
          })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.auth);
  return {
    info: state?.business?.info,
    user: state?.auth?.authUser,
  };
};

export default connect(mapStateToProps)(TopBar);
