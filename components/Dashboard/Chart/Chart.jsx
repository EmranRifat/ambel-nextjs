import React, { useEffect, useRef, useState } from "react";
import ChartSidebar from "./ChartSidebar";
import styles from "../../setup.module.css";
import ChartMain from "./ChartMain";
import Prescription from "./Prescription.jsx";
import ChartVideo from "./ChartVideo";
import { connect } from "react-redux";
import { getBusinessInfo } from "../../../store/actions/business";

const Chart = (props) => {
  const container = useRef(null);
  const [show, setShow] = useState(1);
  const scrollToTop = () => {
    container.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    props.getBusinessInfo();
  }, [])


  return (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div className="pt-4">
          <ChartSidebar
            show={show}
            setShow={setShow}
            scrollToTop={scrollToTop}
          />
        </div>
        <div
          ref={container}
          className={`w-full h-[74vh] ${styles.scrollbar} pt-5 overflow-y-auto md:pl-5`}
        >
          <div className="mr-4">
            {show === 1 && <ChartMain />}
            {show === 3 && <Prescription />}
            {show === 4 && <ChartVideo />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state?.business?.loading,
    info: state?.business?.info,
    // branchLoading:state?.busin
  };
};

export default connect(mapStateToProps, {
  getBusinessInfo,
})(Chart);
