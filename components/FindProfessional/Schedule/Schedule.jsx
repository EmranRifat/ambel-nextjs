import React, { useRef, useState } from "react";
import ScheduleSidebar from "./ScheduleSidebar";
import Title from "../../Title";
import styles from "../dashboard.module.css";
import ScheduleMain from "./ScheduleMain";

const Schedule = () => {
  const [show, setShow] = useState(1);
  const container = useRef(null);
  const scrollToTop = () => {
    container.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <React.Fragment>
      <Title title="Setup your organization" />
      <div className="w-full flex mt-5">
        <div className="w-0 md:w-[320px]">
          <ScheduleSidebar
            show={show}
            setShow={setShow}
            scrollToTop={scrollToTop}
          />
        </div>
        <div
          ref={container}
          className={`w-full h-[74vh] ${styles.scrollbar} overflow-y-scroll overflow-x-hidden md:w-[1350px] md:pl-5`}
        >
          <div className="mr-5 w-full">
            <ScheduleMain />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Schedule;
