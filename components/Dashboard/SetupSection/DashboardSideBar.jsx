import Image from "next/image";
import React, { useRef } from "react";
import styles from "../../setup.module.css";
import { useRouter } from "next/router";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useEffect } from "react";
import { connect } from "react-redux";
import { hasPermission } from "../../../utils/permissions";
import Cookies from "js-cookie";

const DashboardSideBar = ({ show, setShow, scrollToTop, user, setUpOptions, iconFolder, path }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const sidebar = useRef(null);
  const router = useRouter();
  const [tabItems, setTabItems] = React.useState([]);
  const [active, setActive] = React.useState(1);

  useEffect(() => {
    scrollToItem();
  }, [active]);

  const scrollToItem = () => {
    sidebar.current.scrollTo({
      top: active * 70 - 70,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    let items = setUpOptions.filter((itm) =>
      hasPermission(
        user?.userRoles.find(
          (itm) => itm._id == Cookies.get("actingUserType")
        )?.permissionRole?.permissions,
        itm.slug,
        "read"
      )
    );
    setTabItems(items);

    if (items.length > 0) {
      setShow(items[0].id);
      setActive(1);
    }
  }, []);

  return (
    <React.Fragment>
      <div
        ref={sidebar}
        className={`${styles.scrollbar} h-[74vh] pt-10 hidden md:block bg-[#F2F2F2] pb-2  pr-3 overflow-y-scroll `}
      >
        <div
          className={`bg-white ${collapsed ? "w-[100px]" : "w-[281px]"
            } shadow-md shadow-slate-200 border-[#19525a49] rounded-[9px] border-[1px]`}
        >
          {tabItems.map((setUpOption, idx) => (
            <div
              key={idx}
              className={`w-full cursor-pointer`}
              onClick={() => {
                setShow(setUpOption.id);
                scrollToTop();
                setActive(idx + 1);
                router.push(`/business-dashboard/${path}?show=${setUpOption.id}`)
              }}
            >
              {idx !== 0 && show + 1 !== setUpOption.id && (
                <div className="border-t-2 border-gray-300 mx-2"></div>
              )}

              <div
                key={setUpOption.id}
                className={
                  show === setUpOption.id
                    ?
                    // collapsed ? "bg-white flex justify-center items-center " :
                    `bg-[#003F48E5] text-white px-3 mx-[1px] rounded-lg flex justify-center relative`
                    : `hover:bg-[#929ea333] text-[#5B5B5B] px-2  flex justify-center ${collapsed ? "mx-auto" : "items-center"
                    } relative`


                }
              >
                <div className="h-full w-[10px]  bg-[#1A535B] rounded-r-[4px]">
                  <p className="h-full w-full">p</p>
                </div>
                <div className="h-[80px] inline-flex justify-center items-center  ">

                  <div className="h-[42px] mx-auto">

                    <Image
                      src={
                        show === setUpOption.id
                          ? !collapsed ? `/icons/${iconFolder}/light/${setUpOption.icon}.svg` : `/icons/${iconFolder}/dark/${setUpOption.icon}.svg`
                          : `/icons/${iconFolder}/dark/${setUpOption.icon}.svg`
                      }
                      height={42}
                      width={43}
                      alt="icons"
                      className="mx-auto"
                    />
                  </div>
                  {!collapsed && (
                    <div className="items-center w-[205px] pl-[18px] text-left font-normal text-[18px]">
                      <span>{setUpOption.title}</span>
                    </div>
                  )}
                </div>
                {show === setUpOption.id && (
                  <div
                    onClick={() => setCollapsed(!collapsed)}
                    className={`h-5 cursor-pointer ${collapsed
                      ? "transform rotate-180 absolute top-[2px] right-1 bg-[#1A535B]"
                      : " w-6 "
                      }`}
                  >
                    <HiChevronDoubleLeft />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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

export default connect(mapStateToProps)(DashboardSideBar);