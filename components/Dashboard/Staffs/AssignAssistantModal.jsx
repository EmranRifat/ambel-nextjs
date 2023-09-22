import { useState } from "react";
import DropdownWithId from "../../Dropdown/DropDownId";
import { RxCrossCircled } from "react-icons/rx";
import { getStaffs } from "../../../StatelessAPI/staffApiCall";
import { getPractitioners } from "../../../StatelessAPI/practitionerApiCalls";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
import PulseLoader from "react-spinners/PulseLoader";

const AssignAssistantModal = (props) => {
  const [assignedStaffs, setAssignedStaffs] = useState([]);
  const [removeStaffs, setRemoveStaffs] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState("Select Practitioner");
  const [selectedStaff, setSelectedStaff] = useState("Select Staff");
  const [selectedPractitionerError, setSelectedPractitionerError] = useState(false);
  const [selectedStaffError, setSelectedStaffError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const testFieldDeleteHandler = (index, staffId) => {
    setAssignedStaffs((prevState) => {
      const newArr = prevState;
      newArr.splice(index, 1);
      return [...newArr];
    });
    setRemoveStaffs((prevState) => {
      const newArr = prevState;
      if (staffId && !newArr.includes(staffId))
        newArr.push(staffId);
      return [...newArr];
    });
  };

  const getPractitionerById = (id) => {
    const practitioner = practitioners.find((p) => p._id === id);
    return practitioner;
  };

  const getStaffById = (id) => {
    const staff = staffs.find((s) => s._id === id);
    return staff;
  };

  const _getAsignedAssistant = async (businessId) => {
    setAssignedStaffs([])
    try {
      const res = await axios.get(`/roleAndPermissions/getAllAssistants?organization=${businessId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
      });
      if (res.data.status === "success") {
        setAssignedStaffs([...res.data.data.assistants]);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const _getStaffs = async () => {
    setStaffs([]);
    const fetchStaffs = await getStaffs(props.businessId);
    setStaffs([...fetchStaffs]);

  };

  const _getPractitioners = async () => {
    setPractitioners([]);
    const fetchedPractitioners = await getPractitioners(
      props.businessId
    );
    setPractitioners([...fetchedPractitioners]);
  };

  useEffect(() => {
    _getStaffs();
    _getPractitioners();
    _getAsignedAssistant(props.businessId);
  }, []);

  const staffAssignHandler = () => {
    if (selectedPractitioner === "Select Practitioner") {
      setSelectedPractitionerError(true);
      return;
    }
    if (selectedStaff === "Select Staff") {
      setSelectedStaffError(true);
      return;
    }
    setAssignedStaffs((prevState) => {
      const newArr = prevState;
      newArr.push({
        practitioner: selectedPractitioner,
        staff: selectedStaff,
        permissionRole: getPractitionerById(selectedPractitioner).permissionRole,
      });
      return [...newArr];
    });
    setSelectedPractitioner("Select Practitioner");
    setSelectedStaff("Select Staff");
  }

  const _assignAssistantPost = async () => {
    setCreating(true);

    if (assignedStaffs.length === 0) {
      setCreating(false);
      setErrorMessage("Please assign at least one assistant");
      return;
    }

    const uploadData = assignedStaffs.filter(itm => !itm._id).map(assigned => {
      return {
        organization: props.businessId,
        assgnedBy: props.authUser._id,
        practitioner: assigned.practitioner,
        staff: assigned.staff,
        permissionRole: assigned.permissionRole,
      }
    })

    try {
      const res = await axios.post("/roleAndPermissions/assignAssistant", { createArray: uploadData, deleteArray: removeStaffs },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        });
      if (res.data.status === 'success') {
        setCreating(false);
        props.setOpenAssistantModal(false);
      }
      setCreating(false);
    } catch (err) {
      setCreating(false);
      console.log(err);
    }

  }

  return (
    <div className="max-w-[440px] sm:min-w-full lg:min-w-[440px] h-fit mt-5 mb-3 mx-auto bg-white py-2 rounded-md">
      <div className="w-full flex justify-end items-start">
        <span
          onClick={() => props.setOpenAssistantModal(false)}
          className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
        >
          ✖
        </span>
      </div>
      {/* all fields... */}
      <div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-3">
        <span>Assign Assistant to Practitioner</span>
      </div>
      <div className="w-full flex flex-col justify-center items-center p-3">

        <div className="flex flex-col">
          <span className="text-[16px] text-[#5B5B5B]">Role Name</span>
          <input
            type="text"
            value={"Assistant"}
            disabled
            className={`w-[410px] h-[40px] text-[16px] cursor-not-allowed px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-md`}
          />
        </div>

        <div className="mt-4 border-b-[2px] w-full border-gray-300 px-2 py-2 flex justify-between">
          <span className="text-[16px] text-[#0D0D0D]  font-[500]">
            Practitioner
          </span>
          <div className="text-[16px] text-[#0D0D0D]  font-[500]">
            Staffs/Assistant
          </div>
        </div>
        {assignedStaffs.map((assigned, index) => {
          return (<div key={index} className="w-full text-sm py-2 px-2 gap-6 flex justify-between">
            <p>{getPractitionerById(assigned.practitioner)?.user?.fullName}</p>
            <p>-</p>
            <div className="flex gap-2 justify-end items-center">
              <p>{getStaffById(assigned.staff)?.user?.fullName} </p>
              <RxCrossCircled
                size={16}
                className="text-[red]"
                onClick={() => {
                  testFieldDeleteHandler(index, assigned?._id);
                }}
              />
            </div>

          </div>)
        })
        }
        <div className="w-full py-2 gap-1 items-center flex justify-between">

          <div className="w-full flex justify-end gap-6 items-center">
            <DropdownWithId borderColor={`${selectedPractitionerError ? "border-rose-300" : "border-gray-300"}`} placeHolder="Select Practitioner" width={"w-full"} height="30px"
              items={practitioners.filter(itm => !assignedStaffs.map(assigned => assigned?.practitioner).includes(itm._id)).map(prtnr => {
                return { id: prtnr._id, name: prtnr.user?.fullName }
              })} selected={selectedPractitioner}
              onSelected={(selected) => {
                setSelectedPractitionerError(false);
                setSelectedPractitioner(selected)
              }} />
            <DropdownWithId borderColor={`${selectedStaffError ? "border-rose-300" : "border-gray-300"}`} placeHolder="Select Staff" width={"w-full"} height="30px"
              items={staffs.map(prtnr => {
                return { id: prtnr._id, name: prtnr.user?.fullName }
              })} selected={selectedStaff} onSelected={(selected) => {
                setSelectedStaffError(false);
                setSelectedStaff(selected);
              }} />

          </div>

          <AiOutlinePlusCircle
            size={16}
            className="top-[7px] text-[#1a525a]"
            onClick={() => {
              staffAssignHandler();
            }}
          />
        </div>
        {errorMessage && <div className="w-full flex justify-center items-center">
          <span className="text-[12px] text-[#FF0000]">{errorMessage}</span>
        </div>}

        <div className="w-full flex justify-end items-end px-3 pt-10">
          <button
            onClick={(e) => {
              props.setOpenAssistantModal(false);
            }}
            className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              _assignAssistantPost();
            }}
            className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
          >{creating ? (
            <PulseLoader color="#ffffff" size={12} />
          ) : (
            <span>Assign</span>
          )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignAssistantModal;