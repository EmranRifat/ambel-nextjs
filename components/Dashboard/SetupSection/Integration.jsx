import { indexOf } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { integrationElements } from "./IntegrationElements";
import { connect } from "react-redux";
import {
  onCancelAction,
  updateBusinessIntegration,
  getBusinessInfo,
} from "../../../store/actions/business";

const Integration = (props) => {
  const [existIntegration, setExistIntegration] = useState([]);

  useEffect(() => {
    props.getBusinessInfo();
  }, []);

  useEffect(() => {
    setExistIntegration(props.info?.business?.integrations);
  }, [props.info?.business]);

  const addIntegrations = (value) => {
    props
      .updateBusinessIntegration({ value }, props.info?.business?._id)
      .then((res) => {
        props.getBusinessInfo();
      });
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-start justify-start">
        <div className="w-full flex flex-col items-start justify-start">
          <span className="text-[32px] text-[#5B5B5B] font-bold">
            Integration
          </span>
        </div>

        {/* integration items.... */}
        {integrationElements.map((inteElements) => (
          <div
            key={inteElements.id}
            className="w-full flex justify-between items-center shadow-md rounded-md bg-white p-2 px-4 mt-5"
          >
            <Image
              src={`/${inteElements.image}.png`}
              height={68}
              width={60}
              alt="inte"
            />

            <div className="w-full flex flex-col items-start justify-start p-2 ml-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-[20px] text-[#5B5B5B] ">
                  {inteElements.name}
                </span>
                {inteElements.slug ==
                existIntegration.find(
                  (element) => element == inteElements.slug
                ) ? (
                  <button
                    onClick={() => addIntegrations(inteElements.slug)}
                    className="w-[140px] h-[40px] flex flex-col items-center justify-center text-[16px] text-white bg-[#DE0202] rounded-md"
                  >
                    Uninstall
                  </button>
                ) : (
                  <button
                    onClick={() => addIntegrations(inteElements.slug)}
                    className="w-[140px] h-[40px] flex flex-col items-center justify-center text-[16px] text-white bg-[#19525A] rounded-md"
                  >
                    Install
                  </button>
                )}
              </div>
              <p className="text-[#5B5B5B] text-[14px] mt-3">
                {inteElements.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state?.business?.info,
    loading: state?.business?.loading,
    // branchLoading:state?.busin
  };
};
export default connect(mapStateToProps, {
  updateBusinessIntegration,
  onCancelAction,
  getBusinessInfo,
})(Integration);
