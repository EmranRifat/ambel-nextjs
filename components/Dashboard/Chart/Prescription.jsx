import { useState, forwardRef } from "react";
import {
  BsChevronDown,
  BsChevronUp,
  BsPinFill,
  BsStar,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../../Dropdown/DropDownId";
import FilterAllBranch from "../../FilterAllBranch";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionCard from "./PrescriptionCard";

// const QrCodeComponent = QrCode({ download: false, width: "90", height: "90" });
const Prescription = (props) => {
  const [hide, setHide] = useState(false);
  const [isAddNewPrescriptionOpen, setIsAddNewPrescriptionOpen] =
    useState(false);

  const CustomDateElement = () => {
    const customrange = ({ value, onClick }, ref) => {
      return (
        <div className="flex items-center ml-2 w-[125px] justify-around">
          <div className="flex px-2 py-2 bg-white focus:ring-sky-500 rounded-xl border-2">
            <div className="text-[rgb(91,91,91)] text-[14px] font-[500] mr-3 ">
              {value}
            </div>
            <div
              ref={ref}
              onClick={onClick}
              className="cursor-pointer my-auto flex"
            >
              <SlCalender size={15} />
            </div>
          </div>
        </div>
      );
    };
    customrange.displayName = "customrange";
    return forwardRef(customrange);
  };
  CustomDateElement.displayName = "CustomDateElement";
  const CustomDateComponent = CustomDateElement();

  return (
    <div className="bg-[#fff]">
      <div className="w-full flex justify-between items-center mt-2 pb-[10px] bg-[#f2f2f2]">
        <span className="text-[32px] font-bold text-[#5B5B5B]">
          Prescription
        </span>
        <button
          onClick={() => {
            if (isAddNewPrescriptionOpen) return;
            setIsAddNewPrescriptionOpen(true);
          }}
          className="h-[40px] w-[215px] rounded-md bg-[#19525A] text-[20px] text-white"
        >
          Add New Prescription
        </button>
      </div>
      <div className="w-full flex flex-col bg-[#F0F3FC] shadow-md ">
        {/* 1st part */}
        <div className="w-full flex justify-between p-4">
          <div className="bg-white h-[32px] w-[358px] flex justify-between items-center p-2 border-[1px] border-[#42424280] rounded-[50px] shadow-sm">
            <input
              type="text"
              placeholder="Search Prescription"
              className="outline-none border-none grow text-[16px] pl-[5px]"
            />
            <Image src="/search.png" height={12} width={12} alt="search" />
          </div>
          <div className="flex justify-between items-center w-[300px]">
            <div className="">
              <FilterAllBranch />
            </div>

            {hide ? (
              <BsChevronUp
                onClick={() => setHide(!hide)}
                className="text-xl text-[#5B5B5B] cursor-pointer"
              />
            ) : (
              <BsChevronDown
                onClick={() => setHide(!hide)}
                className="text-xl text-[#5B5B5B] cursor-pointer"
              />
            )}

            <BsThreeDotsVertical className="text-xl text-[#5B5B5B] cursor-pointer" />
          </div>
        </div>

        {/* hide part */}
        {hide && (
          <div className="w-full flex items-center justify-between border-t-[.2px] border-gray-300">
            <div className="flex items-center justify-between p-2 w-[150px]">
              <BsStar className="text-xl text-[#FF7A00]" />
              <div className="bg-[#C35E00] rounded-full text-white h-[24px] w-[24px] flex items-center justify-center">
                1
              </div>
              <BsPinFill className="text-xl" />
              <div className="bg-[#C35E00] rounded-full text-white h-[24px] w-[24px] flex items-center justify-center">
                1
              </div>
            </div>

            <div className="w-full flex justify-start items-center gap-5 ml-10 py-3">
              <Dropdown
                items={[
                  { name: "Patient", id: 1 },
                  { name: "Practitioner", id: 2 },
                  { name: "Staff", id: 3 },
                ]}
                selected={"All Department"}
                onSelected={(item) => console.log(item)}
                width="150px"
              />
              <Dropdown
                items={[
                  { name: "Patient", id: 1 },
                  { name: "Practitioner", id: 2 },
                  { name: "Staff", id: 3 },
                ]}
                selected={"All Stuff memeber"}
                onSelected={(item) => console.log(item)}
                width="170px"
              />
              <Dropdown
                items={[
                  { name: "7 days", id: 1 },
                  { name: "15 days", id: 2 },
                  { name: "1 month", id: 3 },
                ]}
                selected={"All Time"}
                onSelected={(item) => console.log(item)}
                width="120px"
              />{" "}
              <DatePicker
                selected={new Date()}
                customInput={
                  <CustomDateComponent value={undefined} onClick={undefined} />
                }
                dateFormat="dd-mm-yy"
                withPortal
              />
              <DatePicker
                selected={new Date()}
                customInput={
                  <CustomDateComponent value={undefined} onClick={undefined} />
                }
                dateFormat="dd-mm-yy"
                withPortal
              />
            </div>
          </div>
        )}
      </div>
      {isAddNewPrescriptionOpen && (
        <PrescriptionForm
          new={true}
          close={() => {
            setIsAddNewPrescriptionOpen(false);
          }}
        />
      )}
      <PrescriptionCard
        prescriptionList={[1, 2, 3]}
        setIsAddNewPrescriptionOpen={setIsAddNewPrescriptionOpen}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    businessId: state?.business?.info?.business?._id,
    practitionerId:
      state?.practitioner?.info?.practitioner?._id ??
      Cookies.get("actingUserType"),
  };
};

export default connect(mapStateToProps, {})(Prescription);
