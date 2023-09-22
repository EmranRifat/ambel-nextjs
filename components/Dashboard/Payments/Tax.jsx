import Image from "next/image";
import React from "react";
import TaxModal from "./TaxModal";
import { getTax, deleteTax, updateTax } from "../../../store/actions/tax";
import { connect } from "react-redux";
import { useEffect } from "react";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { BsDot } from "react-icons/bs";
import TaxEditModal from "./TaxEditModal";
const Tax = (props) => {
  const [taxs, setTaxs] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  useEffect(() => {
    props.getTax();
  }, []);
  useEffect(() => {
    console.log(props.tax);
    setTaxs(props?.tax?.tax?.taxs);
    setBranches(props?.tax?.tax?.branches);
  }, [props.tax]);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <span className=" text-[#5B5B5B] text-[32px]">Taxs</span>
          <TaxModal branches={branches} />
        </div>

        {/* fees div */}
        <div className="w-full flex flex-col bg-white rounded-md shadow-lg pb-5">
          {showModal && (
            <ConfirmationModal
              title={"Delete Tax"}
              message={"Are you sure you want to delete this Tax ?"}
              onConfirm={() => {
                props.deleteTax(selectedId).then((_) => {
                  props.getTax();
                  setShowModal(false);
                });
              }}
              onCancel={() => {
                setShowModal(false);
              }}
              setShowModal={setShowModal}
            />
          )}
          {editModal && (
            <TaxEditModal
              branches={branches}
              tax={taxs?.find((tax) => tax._id === selectedId)}
              show={editModal}
              setShowModal={setEditModal}
              updateTax={props.updateTax}
              getTax={props.getTax}
            />
          )}
          {taxs?.length === 0 && (
            <div className="flex justify-center items-center h-[60vh]">
              <h3 className="text-[#5B5B5B] text-[30px]">No Tax Found.</h3>
            </div>
          )}
          {taxs?.length !== 0 &&
            taxs?.map((fee, i) => (
              <>
                <div
                  className={`flex justify-between items-center border-b-2 px-3 py-3 ${!fee.activeStatus ? "bg-gray-200" : "  "
                    }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-[53px] w-[53px] bg-[#C4DBCC]   rounded-full flex items-center justify-center text-[20px]`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex flex-col ml-3">
                      <h3 className="text-[#19525A] text-[16px]">{fee.name}</h3>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {fee.rate}%
                      </h4>
                      <h4 className="text-[#5B5B5B] text-[14px]">{fee.note}</h4>
                    </div>
                  </div>
                  <div className="flex items-center mr-4">
                    <BsDot
                      className={`text-6xl ${fee.activeStatus ? "text-[#19525A]" : "text-[#5B5B5B]"
                        } `}
                    />
                    <button
                      className="h-[32px] w-[80px] bg-[#19525A] text-[16px] text-white rounded-md shadow-md mr-4"
                      onClick={() => {
                        setSelectedId(fee._id);
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
                      onClick={() => {
                        setSelectedId(fee._id);
                        setShowModal(true);
                      }}
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
const mapStateToProps = (state) => ({ tax: state.tax });

export default connect(mapStateToProps, { getTax, deleteTax, updateTax })(Tax);
