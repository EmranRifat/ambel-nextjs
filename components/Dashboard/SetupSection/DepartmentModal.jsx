import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
  departmentUpdate,
  getDepartments,
  onCancelAction,
  createDepartment,
} from "../../../store/actions/department";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import MultiSelectDropDown from "../../Dropdown/MultiSelectDropdown";
import { uploadAFile } from "../../../utils/fileUpload";
import { useState } from "react";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bytesToSize } from "../../../utils/utility";
const DepartmentModal = (props) => {
  const { setShowModal, setEdit } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [fileName, setFileName] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imgUrl, setImgUrl] = useState('')
  const [departmentData, setDepartmentData] = React.useState({
    name: "",
    description: "",
    practitioners: [],
    branches: [],
    allowOnlineBooking: false,
    coverOrIcon: imgUrl,
    status: "Active",
  });
  const { practioners } = props;
  const { branches } = props;
  const practitionerOptions = practioners.map((practioner) => ({
    name: practioner.name ? practioner.name : "Ambel User",
    id: practioner._id,
  }));
  const branchesOptions = branches.map((branch) => ({
    name: branch?.name ? branch.name : "Ambel Branch",
    id: branch._id,
  }));
  const [branchError, setBranchError] = useState(null)
  const [practitionerError, setPractitionerError] = useState(null)

  useEffect(() => {
    if (props.edit && props?.department) {
      if (props.department.coverOrIcon)
        setFileName(
          decodeURI(
            props.department?.coverOrIcon.split("/").at(-1)
          )
        );

      setDepartmentId(props.department._id);
      setDepartmentData({
        name: props.department.name,
        description: props.department.description,
        practitioners: props.department.practitioners ?? [],
        branches: props.department.branches ?? [],
        allowOnlineBooking: props.department.allowOnlineBooking,
        coverOrIcon: props.department.coverOrIcon,
        status: props.department.status,
      });
    }
  }, []);

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

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setError("");
    setDepartmentData({
      ...departmentData,
      [name]: value,
    });
  };




  const isValidFileUploaded = (file) => {
    const validExtensions = ['png', 'jpeg', 'jpg', 'webp', 'JPG', 'PNG']
    const fileExtension = file?.type?.split('/')[1]

    return validExtensions?.includes(fileExtension)
  }

  const uploadImage = (file) => {

    if (!isValidFileUploaded(file)) {
      setFileName('')
      return toastShow('error', "Only jpg/jpeg/png/JPG/PNG and webp files are allowed!");
    }
    if (parseInt(bytesToSize(file.size)) > 5) {
      setFileName('')
      return toastShow("error", "Max file size limit is 3 MB");
    }
    console.log(file)
    // @ts-ignore
    uploadAFile({
      // @ts-ignore
      fileName: "image",
      // @ts-ignore
      folder: 'department',
      file,
      onProgress: (progress) => console.log(progress),
      onSetDownloadUrl: (url) => {
        console.log(url)
        departmentData.coverOrIcon = url
        setImgUrl(url)
      }
    });
  }


  const saveServiceData = async (e) => {

    setLoading(true);
    departmentData.name = e.name

    if (departmentData?.branches.length == 0) {
      setBranchError('error')
    } else {
      setBranchError(null)
    }
    if (departmentData?.practitioners.length == 0) {
      setPractitionerError('error')
    } else setPractitionerError(null)

    departmentData.coverOrIcon = imgUrl
    try {
      // createing new department
      if (!props?.edit && departmentData?.branches.length != 0 && departmentData?.practitioners.length != 0) {
        props
          .createDepartment(departmentData)
          .then((res) => {
            // console.log(res);
            props.getDepartments();
            setError("");
            setLoading(false);
            setShowModal(false);
            toastShow('success', 'New department created successfully')
          }).catch(err => {
            setLoading(false);
            toastShow('error', err?.response?.data.message)
          })
      } else {
        // updating existing department details 
        if (props?.edit && departmentData?.branches.length != 0 && departmentData?.practitioners.length != 0) {
          props
            .departmentUpdate(departmentData, departmentId)
            .then((res) => {
              props.getDepartments();
              setError("");
              setLoading(false);
              setShowModal(false);
              toastShow('success', 'Department updated successfully')
            }).catch(err => {
              setLoading(false);
              toastShow('error', err?.response?.data.message)
            })
        }
      }
    } catch (error) {
      setLoading(false);
      toastShow('error', error?.response?.data.message)
    }

    setLoading(false);

    // if (
    //   departmentData.coverOrIcon &&
    //   typeof departmentData.coverOrIcon == "object"
    // ) {
    //   // console.log("file url...");
    //   // @ts-ignore
    //   const err = uploadAFile({
    //     fileName: departmentData.coverOrIcon.name,
    //     folder: "deparmentCoverOrIcon",
    //     file: departmentData.coverOrIcon,
    //     onProgress: () => { },
    //     onSetDownloadUrl: (url) => {
    //       if (props.edit) {
    //         props
    //           .departmentUpdate(
    //             { ...departmentData, coverOrIcon: url },
    //             departmentId
    //           )
    //           .then((res) => {
    //             props.getDepartments();
    //             setError("");
    //             setLoading(false);
    //             setShowModal(false);
    //           });
    //       } else {
    //         props
    //           .createDepartment({ ...departmentData, coverOrIcon: url })
    //           .then((res) => {
    //             // console.log(res);
    //             props.getDepartments();
    //             setError("");
    //             setLoading(false);
    //             setShowModal(false);
    //           });
    //       }
    //     },
    //   });
    //   // if (err) {
    //   //   console.log(err);
    //   //   setError("File uloading problem");
    //   //   return;
    //   // }
    // } else {
    //   if (props.edit) {
    //     props
    //       .departmentUpdate({ ...departmentData }, departmentId)
    //       .then((res) => {
    //         props.getDepartments();
    //         setError("");
    //         setLoading(false);
    //         setShowModal(false);
    //       });
    //   } else {
    //     props
    //       .createDepartment({ ...departmentData })
    //       .then((res) => {
    //         props.getDepartments();
    //         setError("");
    //         setLoading(false);
    //         setShowModal(false);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // }
    setDepartmentData({
      name: "",
      description: "",
      practitioners: [],
      branches: [],
      allowOnlineBooking: false,
      coverOrIcon: null,
      status: "Active",
    });
    setEdit(false);
    setFileName("");
    setDepartmentId(null);
    setLoading(false);
  };


  return (

    <>

      <form onSubmit={(e) => {
        if (departmentData?.branches.length == 0) {
          setBranchError('error')
        } else {
          setBranchError(null)
        }
        if (departmentData?.practitioners.length == 0) {
          setPractitionerError('error')
        } else setPractitionerError(null)
        handleSubmit(saveServiceData)(e)
      }}>

        <div className="justify-center items-center flex absolute overflow-y-scroll h-[100vh] inset-0 z-50 outline-none focus:outline-none">
          <div className="max-w-[680px] absolute top-[20%] m-auto justify-center items-center flex inset-5 z-50 outline-none focus:outline-none">
            <div className="w-full bg-white rounded-md border-b-2">
              <div className="w-full flex justify-end items-start pt-2 px-3">
                <div
                  onClick={() => {
                    setShowModal(false), setError("");
                    setEdit(false);
                    setFileName("");
                    setDepartmentId(null);
                    setDepartmentData({
                      name: "",
                      description: "",
                      practitioners: [],
                      branches: [],
                      allowOnlineBooking: false,
                      coverOrIcon: null,
                      status: "Active",
                    });
                  }}
                  className="text-2xl text-[#100e0e] cursor-pointer"
                >
                  ✖
                </div>
              </div>
              <div className="flex w-full justify-center border-b-2 border-gray-300 pb-5">
                <span className="text-[#19525A] font-[700] text-[24px] mt-5">
                  {props.edit ? "Edit Department" : "Add A New Department"}
                </span>
              </div>
              <div className="flex w-full justify-between items-center py-5 px-3 border-b-[2px] border-gray-300">
                <span className="text-[16px] text-[#5B5B5B]">
                  Name<b className="text-rose-600">*</b>
                </span>
                <input
                  type="text"
                  name="name"
                  defaultValue={props?.department?.name ? props?.department?.name : ""}
                  placeholder="Department Name"
                  className={`outline-none w-[240px] rounded-[8px] border-2 py-2 px-4 ${errors?.name && 'border-red-500 border-[0.5px]'}`}
                  {...register("name", {
                    required: {
                      value: true,
                      message: 'Name is Required'
                    },
                  })}
                />
              </div>
              <div className="w-full flex justify-between border-b-[2px] border-gray-300 py-5 px-3">
                <span className="text-[16px] text-[#5B5B5B]">Description</span>
                <textarea
                  name="description"
                  onChange={onChangeValue}
                  value={departmentData?.description}
                  cols={22}
                  rows={3}
                  className={`outline-none w-[240px] rounded-[8px] mt-2 border-2 py-2 px-4 `}
                />
              </div>
              <div className="w-full flex justify-between items-center py-5 px-3 border-b-[2px] border-gray-300">
                <p className="text-[16px] text-[#5B5B5B]">
                  Branch <span className="text-rose-600">*</span>
                </p>

                <MultiSelectDropDown
                  items={[{ id: "-1", name: "Select All" }, ...branchesOptions]}
                  selectedList={departmentData.branches}
                  itemName="Branch"
                  branchError={branchError}
                  onSelectedItem={(selected) => {
                    if (selected === "-1") {
                      if (departmentData.branches.length === 0) {
                        let newValue = branchesOptions.map((branch) => {
                          return branch.id;
                        });
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      } else {
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: [],
                          },
                        });
                      }
                    } else {
                      if (!departmentData.branches.includes(selected)) {
                        let newValue = departmentData.branches;
                        newValue.push(selected);
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      } else {
                        let newValue = departmentData.branches;
                        newValue.splice(newValue.indexOf(selected), 1);
                        onChangeValue({
                          target: {
                            name: "branches",
                            value: newValue,
                          },
                        });
                      }
                    }
                  }}
                  width={"240px"}
                />
              </div>
              <div className="w-full flex justify-between items-center py-5 px-3 border-b-[2px] border-gray-300">
                <p className="text-[16px] text-[#5B5B5B]">
                  Add practitioner <span className="text-rose-600">*</span>
                </p>

                <MultiSelectDropDown
                  items={[
                    { id: "-1", name: "Select All" },
                    ...practitionerOptions,
                  ]}
                  selectedList={departmentData.practitioners}
                  itemName="Practitioners"
                  practitionerError={practitionerError}
                  onSelectedItem={(selected) => {
                    if (selected === "-1") {
                      if (departmentData.practitioners.length === 0) {
                        let newValue = practitionerOptions.map((branch) => {
                          return branch.id;
                        });
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: newValue,
                          },
                        });
                      } else {
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: [],
                          },
                        });
                      }
                    } else {
                      if (!departmentData.practitioners.includes(selected)) {
                        let newValue = departmentData.practitioners;
                        newValue.push(selected);
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: newValue,
                          },
                        });
                      } else {
                        let newValue = departmentData.practitioners;
                        newValue.splice(newValue.indexOf(selected), 1);
                        onChangeValue({
                          target: {
                            name: "practitioners",
                            value: newValue,
                          },
                        });
                      }
                    }
                  }}
                  width={"240px"}
                />
              </div>

              <div className="flex w-full justify-between items-center py-5 px-3 border-b-[2px] border-gray-300">
                <span className="text-[16px] text-[#5B5B5B]">
                  Allow booking online<b className="text-rose-600">*</b>
                </span>
                <Toggle
                  checked={departmentData.allowOnlineBooking}
                  setChecked={(value) => {
                    setError("");
                    onChangeValue({
                      target: {
                        name: "allowOnlineBooking",
                        value: value,
                      },
                    });
                  }}
                />
              </div>
              <div className="w-full flex justify-between border-b-[2px] border-gray-300 py-5 px-3">
                <span className="text-[16px] text-[#5B5B5B]">
                  Add Cover or Icon{" "}
                  <span className="text-[12px] italic">
                    (Min 60X60 px Max 280X120 px)
                  </span>
                </span>
                <label>
                  <div className="w-[240px] h-[36px] px-[10px] bg-[#19525A] text-[#fff] rounded-[8px] text-center">
                    <p
                      className="relative top-[7px] overflow-hidden"
                      style={{ cursor: "pointer" }}
                    >
                      {fileName ? fileName : "Upload"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {

                      setError("");
                      setFileName(e.target.files[0]?.name);
                      uploadImage(e.target.files[0])
                    }}
                  />
                </label>
              </div>
              <div className="w-full flex justify-between items-center py-5 px-3 border-b-[2px] border-gray-300">
                <p className="text-[16px] text-[#5B5B5B]">
                  Status<span className="text-rose-600">*</span>
                </p>

                <Dropdown
                  items={["Active", "Inactive"]}
                  selected={departmentData.status}
                  onSelected={(selected) => {
                    setError("");
                    onChangeValue({
                      target: {
                        name: "status",
                        value: selected,
                      },
                    });
                  }}
                  width={"240px"}
                />
              </div>
              {error && (
                <div className="w-full text-center text-[#ff0000] mt-[20px]">
                  <p>{error}</p>
                </div>
              )}

              <div className="w-full flex justify-end items-end py-5 px-3">
                <button
                  onClick={() => {
                    props.onCancelAction();
                    setError("");
                    setShowModal(false);
                    setEdit(false);
                    setFileName("");
                    setDepartmentId(null);
                    setDepartmentData({
                      name: "",
                      description: "",
                      practitioners: [],
                      branches: [],
                      allowOnlineBooking: false,
                      coverOrIcon: null,
                      status: "Active",
                    });
                  }}
                  className="px-8 py-2 text-[20px] border-2 border-gray-500 bg-white rounded-[8px] mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 text-[20px]  bg-[#1A535B] rounded-[8px] border-2 border-gray-500 text-white"
                >
                  {loading ? (
                    <PulseLoader color="#ffffff" size={12} />
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 py-5 px-3 z-40 bg-black"></div>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // department: state?.department?.info,
    loading: state?.department?.loading,
  };
};
export default connect(mapStateToProps, {
  departmentUpdate,
  onCancelAction,
  getDepartments,
  createDepartment,
})(DepartmentModal);
