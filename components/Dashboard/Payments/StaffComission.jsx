import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import StaffComissionModal from "./StaffComissionModal";
import _ from "lodash";
import { PulseLoader } from "react-spinners";
const commissions = [];

const StaffComission = () => {
  const [availableBranches, setAvailableBranches] = useState([
    // { _id: "all", name: "All Branches" },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [applicableOn, setApplicableOn] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [StaffComissions, setStaffComissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comissionName, setComissionName] = useState("");
  const [practitioners, setPractitioners] = useState([]);
  let allServices = [
    { _id: 0, name: "Everything" },
    { _id: 1, name: "All Service" },
    { _id: 2, name: "All Product" },
    { _id: 3, name: "All Membership" },
    { _id: 4, name: "All Package" },
  ];
  const [allBranches, setAllBranches] = useState([]);
  const [status, setStatus] = useState("active");
  const [comissionType, setComissionType] = useState("Select Comission Type");
  const [defaultComissionRate, setDefaultComissionRate] = useState(0);
  const [defaultRefferalComissionRate, setDefaultRefferalComissionRate] =
    useState(0);
  const [selectedPractitioners, setSelectedPractitioners] = useState([]);
  // const [reRender,setReRender]
  // console.log(selectedServices);

  const createStaffComission = async () => {
    if (
      comissionName == "" ||
      selectedBranch.length == 0 ||
      selectedServices.length == 0 ||
      status == "Select Status" ||
      comissionType == "Select Comission Type" ||
      defaultComissionRate == 0 ||
      defaultRefferalComissionRate == 0 ||
      selectedPractitioners.length == 0
    ) {
      alert("Select All Necessary Information");
      return;
    }
    setLoading(true);
    const staffComission = {
      branches: selectedBranch.filter((e) => e != "all"),
      applicableOn: selectedServices
        .filter((e) => e != 0)
        .map((e) => {
          return applicableOn.filter((service) => {
            if (service._id == e) return service;
          })[0].name;
        }),
      status,
      comissionType,
      // @ts-ignore
      defaultComissionRate: parseFloat(defaultComissionRate),
      // @ts-ignore
      defaultReferralComissionRate: parseFloat(defaultRefferalComissionRate),
      name: comissionName,
      practitioners: selectedPractitioners.filter((e) => e != "all"),
    };
    console.log(staffComission);
    const response = await axios.post("/staffComissions", staffComission, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    });
    setShowModal(false);
    setLoading(false);
    // setStaffComissions([...[]]);
    // console.log(response.data);
    setStaffComissions((prev) => {
      prev.unshift(response.data);
      return [...prev];
    });
  };
  console.log(StaffComissions);
  const getStaffComissions = async () => {
    axios
      .get("/staffComissions", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        setStaffComissions(response.data);
      })
      .catch((e) => console.log(e));
  };

  const getPractitioners = async () => {
    axios
      .get("/practitioner", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        let { data } = response.data;

        data = data.map((e) => {
          return {
            ...e,
            id: e._id,
            name: e.user ? e.user.fullName : "Unknown Practitioner",
          };
        });

        data.unshift({ id: "all", name: "All Practitioners" });

        setPractitioners(data);
      })
      .catch((e) => console.log(e));
  };

  const getAllBranches = async () => {
    setLoading(true);
    axios
      .get("/branch", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        const { data } = response.data.data;

        setAllBranches(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    getStaffComissions();
    getAllBranches();
    getPractitioners();
  }, []);
  useEffect(() => {
    if (StaffComissions.length && allBranches.length && practitioners.length)
      setLoading(false);
  }, [StaffComissions, allBranches, practitioners]);

  useEffect(() => {
    // using lodash functions to merge the branches of all the staff comissions
    const usedBranches = _.flatten(
      _.map(
        _.filter(StaffComissions, (e) => e.status == "active"),
        "branches"
      )
    ).map((e) => e._id);
    const usedServices = _.flatten(
      _.map(
        _.filter(StaffComissions, (e) => e.status == "active"),
        "applicableOn"
      )
    ).map((e) => e._id);

    const filteredBranches = allBranches.map((e) => {
      return { ...e, id: e._id };
    });

    if (filteredBranches.length == allBranches.length)
      filteredBranches.unshift({ id: "all", name: "All Branches" });

    const filteredServices = allServices.map((e) => {
      return { ...e, id: e._id };
    });

    // @ts-ignore
    if (filteredBranches) {
      setAvailableBranches(filteredBranches);
    }
    if (filteredServices) setApplicableOn(filteredServices);
  }, [StaffComissions]);
  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <span className=" text-[#5B5B5B] text-[32px]">Staff Commission</span>
          {loading ? (
            <PulseLoader />
          ) : (
            <div>
              <button
                className="text-[16px] w-[144px] h-[32px] bg-[#19525A] text-white rounded-[8px]"
                type="button"
                onClick={() => setShowModal(true)}
              >
                New Commission
              </button>
              <StaffComissionModal
                comissionName={comissionName}
                setComissionName={setComissionName}
                branches={availableBranches}
                applicableOn={applicableOn}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                status={status}
                setStatus={setStatus}
                comissionType={comissionType}
                setComissionType={setComissionType}
                defaultComissionRate={defaultComissionRate}
                setDefaultComissionRate={setDefaultComissionRate}
                defaultRefferalComissionRate={defaultRefferalComissionRate}
                setDefaultRefferalComissionRate={
                  setDefaultRefferalComissionRate
                }
                createStaffComission={createStaffComission}
                selectedPractitioners={selectedPractitioners}
                setSelectedPractitioners={setSelectedPractitioners}
                practioners={practitioners}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          )}
        </div>
        {/* fees div */}
        <div className="w-full flex flex-col bg-white rounded-md shadow-lg pb-5">
          {StaffComissions.length &&
            StaffComissions.map((fee, i) => (
              <>
                <div className="flex justify-between items-center border-b-2 px-3 py-3">
                  <div className="flex items-center">
                    <div className="h-[53px] w-[53px] bg-[#C4DBCC] rounded-full flex items-center justify-center text-[20px]">
                      {i + 1}
                    </div>
                    <div className="flex flex-col ml-3">
                      <h3 className="text-[#19525A] text-[16px]">{fee.name}</h3>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {fee.defaultComissionRate}
                      </h4>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {fee.practitioners.length}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center mr-4">
                    <button className="h-[32px] w-[80px] bg-[#19525A] text-[16px] text-white rounded-md shadow-md mr-4">
                      Edit
                    </button>
                    <Image
                      src="/icons/delete.png"
                      height="28px"
                      width="28px"
                      alt="delete"
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

export default StaffComission;
