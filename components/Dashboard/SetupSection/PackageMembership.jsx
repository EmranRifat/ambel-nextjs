import React, { useEffect, useState } from "react";
import PackageMembershiModal from "./PackageMembershiModal";
import { getPackages } from "../../../store/actions/packageMembership";
import { connect } from "react-redux";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import MembershipModal from "./MembershipModal";
const PackageMembership = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [tax, setTax] = useState([]);
  const [service, setService] = useState([]);
  const [membership, setMembership] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      props.getPackages();
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(props.info);
    setTax(props?.info?.tax);
    setService(props?.info?.service);
    // setMembership(props.membership);
    setPackages(props?.info?.package);
  }, [props.info]);


  const editHandler = (id) => {
    console.log(id)
    setEditPackage(
      packages.filter((item) => item._id == id)[0]
    );
    setEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <div className="pb-10">
        <div className="flex justify-between mt-3">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Packages
          </span>
          <button
            className="text-[20px] w-[168px] h-[40px] bg-[#19525A] text-white rounded-[10px]"
            type="button"
            onClick={() => setShowModal(true)}
          >
            New Package
          </button>
          {showModal &&
            <PackageMembershiModal
              tax={tax}
              service={service}
              setShowModal={setShowModal}
              edit={edit}
              setEdit={setEdit}
              package={editPackage}
            />
          }
        </div>
        {/* 1st div */}
        {packages?.length == 0 && <p>No Packages Found</p>}

        <div className="w-full bg-white mt-3 rounded-[8px]">
          {packages?.length > 0 &&
            packages.map((fee, index) => (
              <div key={index} data-id={fee._id}>
                {index === 0 && <p className="pl-7 pt-5">Here you can setup packages</p>}
                <div className={`flex justify-between items-center border-b-[1px] border-gray-400 px-5 ${(packages.length === index + 1) && "last:border-b-[0px]"}`}>

                  <div className="flex p-5">
                    <span className="p-2 bg-[#C4DBCC] text-center h-10 w-10 rounded-full text-lg font-bold ">
                      {index + 1}
                    </span>
                    <div className="flex flex-col ml-5">
                      <span className="text-[20px] text-[#196947]">
                        {fee?.name}
                      </span>
                      <span className="text-[#5B5B5B]">{fee?.description}</span>
                      <p className="text-[#5B5B5B]">
                        Appointment length:
                        <span className="text-[#008AC5]">{fee?.expireAfter} minutes</span>
                      </p>
                      <span className="mt-3 text-[#5B5B5B]">
                        Service Fee: ${fee?.price}
                      </span>
                      <p className="text-[#5B5B5B]">
                        Payment: <span className="text-[#AF1010]">{fee?.paymentMethod}</span>
                      </p>
                      <span className="text-[#5B5B5B]">Capacity: {fee?.capacity} Person</span>

                      <span className="text-[#5B5B5B]">
                        Way of service: {fee?.wayOfService}
                      </span>
                      <span className="text-[#5B5B5B]">
                        Online Booking :<span className="text-[#00A811]">{fee?.allowOnlineBooking ? "Enable" : "Disable"}</span>
                      </span>
                      <p className="text-[#5B5B5B]">
                        Status : <span className="text-[#00A811]">{fee?.status}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex">
                    <button className="h-[36px] w-[77px] text-[16px] bg-[#19525A] text-white rounded-[8px]" onClick={() => editHandler(fee._id)}>
                      Edit
                    </button>
                    <button className="">
                      <FaRegTrashAlt className="text-rose-600 my-auto text-3xl mx-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
        </div>
        <div className="flex justify-between mt-10">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Memberships
          </span>
          <MembershipModal />
        </div>
        {/* 2nd div */}
        <div className="bg-white rounded-[8px] mt-4">
          <p className="pl-7 pt-5">Here you can setup memberships</p>
          <div className="w-full bg-white mt-3 rounded-[8px]">
            <div className="flex justify-between items-center border-b-[1px] border-gray-400 px-5">
              <div className="flex p-5">
                <span className="p-2 bg-[#C4DBCC] text-center h-10 w-10 rounded-full text-lg font-bold ">
                  1
                </span>
                <div className="flex flex-col ml-5">
                  <span className="text-[20px] text-[#196947]">
                    Cardiology consaltent
                  </span>
                  <span className="text-[#5B5B5B]">Normal Follow Up </span>
                  <p className="text-[#5B5B5B]">
                    Appointment length:
                    <span className="text-[#008AC5]">30 minutes</span>
                  </p>
                  <span className="mt-3 text-[#5B5B5B]">
                    Service Fee: $30 (Included GST, PST)
                  </span>
                  <p className="text-[#5B5B5B]">
                    Payment: <span className="text-[#AF1010]">Pre-Paid</span>
                  </p>
                  <span className="text-[#5B5B5B]">
                    Assign for 2 Practitioner and 2 supportive staff
                  </span>
                  <span className="text-[#5B5B5B]">Capacity: 1 Person</span>

                  <span className="text-[#5B5B5B]">Way of service: Online</span>
                  <span className="text-[#5B5B5B]">
                    Online Booking : <span className="text-[#00A811]">Enable</span>
                  </span>
                  <p className="text-[#5B5B5B]">
                    Status : <span className="text-[#00A811]">Active</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex">
                <button className="h-[36px] w-[77px] text-[16px] bg-[#19525A] text-white rounded-[8px]">
                  Edit
                </button>
                <button className="">
                  <FaRegTrashAlt className="text-rose-600 my-auto text-3xl mx-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-[8px] shadow-md">
            <div className="flex justify-between items-center border-b-[1px] border-gray-400 px-5">
              <div className="flex p-5">
                <span className="p-2 bg-[#C4DBCC] text-center h-10 w-10 rounded-full text-lg font-bold ">
                  2
                </span>
                <div className="flex flex-col ml-5">
                  <span className="text-[20px] text-[#196947]">
                    Cardiology consaltent
                  </span>
                  <span className="text-[#5B5B5B]">Normal Follow Up </span>
                  <p className="text-[#5B5B5B]">
                    Appointment length:
                    <span className="text-[#008AC5]">30 minutes</span>
                  </p>
                  <span className="mt-3 text-[#5B5B5B]">
                    Service Fee: $30 (Included GST, PST)
                  </span>
                  <p className="text-[#5B5B5B]">
                    Payment: <span className="text-[#AF1010]">Pre-Paid</span>
                  </p>
                  <span className="text-[#5B5B5B]">
                    Assign for 2 Practitioner and 2 supportive staff
                  </span>
                  <span className="text-[#5B5B5B]">Capacity: 1 Person</span>

                  <span className="text-[#5B5B5B]">Way of service: Online</span>
                  <span className="text-[#5B5B5B]">
                    Online Booking : <span className="text-[#00A811]">Enable</span>
                  </span>
                  <span className="text-[#5B5B5B]">Status: Active</span>
                  <p className="text-[#5B5B5B]">
                    Status : <span className="text-[#00A811]">Active</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex">
                <button className="h-[36px] w-[77px] text-[16px] bg-[#19525A] text-white rounded-[8px]" onClick={editHandler}>
                  Edit
                </button>
                <button className="">
                  <FaRegTrashAlt className="text-rose-600 my-auto text-3xl mx-4" />
                </button>
              </div>
            </div>
          </div>
        </div>




      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    info: state?.packageMembership?.info,
    loading: state?.packageMembership?.loading,
  };
};
export default connect(mapStateToProps, {
  getPackages,
})(PackageMembership);
