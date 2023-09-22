import Image from "next/image";
import React, { useEffect } from "react";
import FeeModal from "./FeeModal";
import {
  finesCreate,
  getFines,
  deleteFines,
} from "../../../store/actions/fines";
import { connect } from "react-redux";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import FeeEditModal from "./FeeEditModal";
import { getPractitioners } from "../../../StatelessAPI/practitionerApiCalls";
const Fee = (props) => {
  const [fees, setFees] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [practitioners, setPractitioners] = React.useState([]);
  const [activeId, setActiveId] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  useEffect(() => {
    props.getFines();
    _getPractitioners();
  }, []);
  useEffect(() => {
    console.log(props.fines);
    setFees(props?.fines?.fines ?? []);
    setBranches(props?.fines?.branches ?? []);
  }, [props.fines]);

  const _getPractitioners = async () => {
    setPractitioners([]);
    const fetchedPractitioners = await getPractitioners(
      props.info?.business?._id
    );
    setPractitioners([...fetchedPractitioners]);
  };


  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <span className=" text-[#5B5B5B] text-[32px]">Fees</span>
          <FeeModal branches={branches} practitioners={practitioners} />
        </div>
        {editModal && (
          <FeeEditModal
            branches={branches}
            fee={fees?.find((tax) => tax._id === activeId)}
            show={editModal}
            setShowModal={setEditModal}
            updateTax={props.updateFines}
            getTax={props.getFines}
          />
        )}

        {/* fees div */}
        <div className="w-full flex flex-col bg-white rounded-md shadow-lg pb-5 mt-2">
          <div className="p-3">
            <p className="text-[#5B5B5B] text-[16px]">
              Fines are used in ambel to charge for no-shows or late
              cancellations of customers. Also, give compensation to customers
              if practitioners cannot meet with the customers due to the
              practitioners problem.
            </p>
          </div>
          {fees.length === 0 && (
            <div className="flex justify-center items-center h-[50vh]">
              <h3 className="text-[#5B5B5B] text-[30px]">No Fines Found.</h3>
            </div>
          )}
          {fees.length !== 0 &&
            fees.map((fee, i) => (
              <>
                <div className="flex justify-between items-center border-b-2 px-3 py-3">
                  <div className="flex items-center">
                    <div className="h-[53px] w-[53px] bg-[#C4DBCC] rounded-full flex items-center justify-center text-[20px]">
                      {i + 1}
                    </div>
                    <div className="flex flex-col ml-3">
                      <h3 className="text-[#19525A] text-[16px]">{fee.name}</h3>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {fee.amount}
                      </h4>
                      <h4 className="text-[#5B5B5B] text-[14px]">{fee.note}</h4>
                    </div>
                  </div>

                  <div className="flex items-center mr-4">
                    <button
                      className="h-[32px] w-[80px] bg-[#19525A] text-[16px] text-white rounded-md shadow-md mr-4"
                      onClick={() => {
                        setActiveId(fee._id);
                        setEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <Image
                      src="/icons/delete.png"
                      height="28px"
                      width="28px"
                      alt="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        props.deleteFines(fee._id).then(() => {
                          props.getFines();
                        })
                      }
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state?.fines?.loading,
    fines: state?.fines?.info,
    info: state?.business?.info,
  };
};
export default connect(mapStateToProps, {
  finesCreate,
  getFines,
  deleteFines,
})(Fee);
