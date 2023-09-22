import React, { useEffect, useState } from "react";
import { AiOutlinePhone, AiOutlineVideoCamera } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { getService } from "../../../store/actions/service";
import ServiceModal from "./ServiceModal";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import Cookies from "js-cookie";
import axios from 'axios';
import deleteIcon from '../../../assets/Delete 1.png'
import Image from "next/image";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServericesAndClass = (props) => {
  const [services, setServices] = React.useState([]);
  const [practitioners, setPractioners] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [taxs, setTaxs] = React.useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmationModal, setShowConfirmationModel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.getService();
  }, []);

  useEffect(() => {
    console.log(props.services);
    if (props.services) {
      console.log(props.services);
      setServices(props.services?.data?.services || []);
      setPractioners(props.services?.practitioners || []);
      setDepartments(props.services?.departments || []);
      setTaxs(props.services?.taxs || []);
    }
  }, [props.services]);

  const toastShow = (err, str) => {
    toast[err](str, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const deleteHandler = async (e) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/service/${selectedService}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
      });
      // console.log(response.data);
      if (response.data.status == "success") {
        props.getService();
        setShowConfirmationModel(false);
        setShowConfirmationModel(false);
        toastShow('success', 'Service delete successfully')
      } else {
        //something went wrong
        toastShow('error', 'something went wrong')
      }
    } catch (err) {
      toastShow('error', err?.response?.data.message)
    }
  };

  const editHandler = (e) => {
    const serviceId = e.target.parentNode.parentNode.getAttribute("data-id");
    setEditService(
      services.filter((item) => item._id == serviceId)[0]
    );
    setEdit(true);
    setShowModal(true);
  };

  // console.log(services);

  return (
    <>
      <div className="pb-10">
        <div className="flex justify-between mt-3">
          <span className="text-[#5B5B5B] h-[40px] w-[160px] text-[32px] font-[700]">
            Services
          </span>
          <button
            className="text-[18px] px-6 py-2 bg-[#19525A] text-white rounded-[10px]"
            type="button"
            onClick={() => {
              setEdit(false);
              setShowModal(true)
            }}
          >
            New Service
          </button>
          {showModal &&
            <ServiceModal
              departments={departments}
              practitioners={practitioners}
              taxs={taxs}
              setShowModal={setShowModal}
              edit={edit}
              setEdit={setEdit}
              service={editService}
            />
          }
        </div>
        {confirmationModal && (
          <ConfirmationModal
            title={"Delete Service"}
            message={"Are you sure you want to delete this service ?"}
            onConfirm={() => {
              deleteHandler();
            }}
            onCancel={() => {
              setShowConfirmationModel(false);
            }}
            setShowModal={setShowConfirmationModel}
          />
        )}
        {/* 1st div */}
        {services?.length == 0 ? (
          <div className="mr-5 h-[50vh] ml-2 flex justify-center items-center text-center text-3xl font-bold text-gray-500">
            No Service found
          </div>
        ) : (
          <div className="w-full bg-whitemt-4 rounded-[8px] mt-[22px] overflow-hidden">
            {services.map((service, idx) => {
              return (
                <div
                  key={idx}
                  className={`flex justify-between border-b-[1px]  px-5 bg-white ${idx !== services.length - 1 ? 'border-[#7676764D]' : ''}`}
                  data-id={service._id}
                >
                  <div className="flex px-1 py-6">
                    <div className="bg-[#C4DBCC] flex items-center justify-center h-[53px] w-[53px] rounded-full text-lg">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col ml-5 mt-4 leading-8">
                      <span className="text-[20px] text-[#196947]">
                        {service?.name}
                      </span>
                      <span className="mt-2 text-[#5B5B5B]">
                        {service?.description}
                      </span>
                      <span className="text-[#5B5B5B]">
                        Appointment length:{" "}
                        <span className="text-[#008AC5]">
                          {service?.allocatedTime} minutes
                        </span>
                      </span>
                      <span className="text-[#5B5B5B]">
                        Service fee:{" "}
                        <span className="text-[#19525A]">
                          ${service?.price}{" "}
                        </span>
                        {service?.tax?.length > 0 && (
                          <span>(Included {service?.tax?.length} taxs)</span>
                        )}
                      </span>
                      <span className="text-[#5B5B5B]">
                        Payment:{" "}
                        <span className="text-rose-600 capitalize">
                          {service?.payment}
                        </span>
                      </span>
                      <span className="text-[#5B5B5B]">
                        Assigned for {service?.practitioner?.length}{" "}
                        Practitioner
                      </span>
                      <span className="text-[#5B5B5B]">
                        Capacity:{" "}
                        <span className="text-[#000]">
                          {service?.capacity} Person
                        </span>
                      </span>
                      <span className="text-[#5B5B5B]">
                        Way of service:{" "}
                        <span className="text-[#115B05] capitalize">
                          {service?.wayOfService}
                        </span>
                      </span>
                      <span className="text-[#5B5B5B]">
                        Online Booking:{" "}
                        <span
                          className={`${service?.allowOnlineBooking
                            ? "text-[#00A811]"
                            : "text-[#AF1010]"
                            }`}
                        >
                          {service?.allowOnlineBooking ? "Enable" : "Disable"}
                        </span>
                      </span>
                      <span className="text-[#5B5B5B]">
                        Status:{" "}
                        <span
                          className={`${service?.status === "Active"
                            ? "text-[#00A811]"
                            : "text-[#fc9d29]"
                            }`}
                        >
                          {service?.status}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-[127px] flex ">
                    <button
                      className="h-[36px] w-[77px] text-[16px] bg-[#19525A] text-white rounded-[8px] mr-2"
                      onClick={editHandler}
                    >
                      Edit
                    </button>
                    <button
                      className="h-[36px]  text-rose-600"
                      onClick={() => {
                        setSelectedService(service._id)
                        setShowConfirmationModel(true);
                      }}
                    >
                      <Image
                        src={deleteIcon}
                        width='22'
                        height='28'
                        alt="deleteImg"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    services: state?.service?.info,
    loading: state?.service?.loading,
  };
};
export default connect(mapStateToProps, {
  getService,
})(ServericesAndClass);
