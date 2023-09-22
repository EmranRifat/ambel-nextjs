import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
  getService,
  onCancelAction,
  serviceUpdate,
} from "../../../store/actions/service";
import DropDownId from "../../Dropdown/DropDownId";
import MultiSelectDropDown from "../../Dropdown/MultiSelectDropdown";
import { rgbToHexConverter } from "../../../utils/colorConverter";
import {
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  HexColorPicker,
  RgbaColorPicker,
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  RgbColorPicker,
} from "react-colorful";
import Toggle from "../../Toggle";
// @ts-ignore
// @ts-ignore
import { uploadAFile } from "../../../utils/fileUpload";
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { bytesToSize } from "../../../utils/utility";
import { RxCross2 } from "react-icons/rx";
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { toInteger } from "lodash";
import { RiErrorWarningLine } from "react-icons/ri";
import { Tooltip } from "../../Tooltip/Tooltip";
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { coolGray } from "tailwindcss/colors";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ServiceModal = (props) => {
  // console.log(props);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [fileName, setFileName] = useState(props?.edit ? (props?.service?.icon ? props?.service?.icon?.split('/')?.[props?.service?.icon?.split('/').length - 1] : "") : '');
  // @ts-ignore
  const [allocatedTimeValue, setAllocatedTimeValue] = useState(null);
  const [scheduleLengthValue, setscheduleLengthValue] = useState(null);
  const [price, setPrice] = useState("");
  const [partialAmount, setPartialAmount] = useState("");
  // @ts-ignore
  // @ts-ignore
  const [serviceId, setServiceId] = useState(null);
  // @ts-ignore
  // @ts-ignore
  const [error, setError] = useState("");
  // console.log(scheduleLengthValue)
  // cons
  const initialServiceData = {
    name: "",
    description: "",
    price: "",
    business: props.business?.info?.business?._id,
    businessName: props.business?.info?.business?.name,
    allocatedTime: "",
    scheduleLength: "",
    tax: [],
    payment: "prepaid",
    capacity: "-1",
    wayOfService: "online",
    department: "selected",
    practitioner: [],
    icon: "",
    bg: { r: 75, g: 75, b: 150, a: 1 },
    textColor: { r: 75, g: 75, b: 150, a: 1 },
    allowOnlineBooking: true,
    includeTax: false,
    callForBook: true,
    displayPrice: false,
    displayDuration: false,
    status: "Active",
  };
  const [serviceData, setServiceData] = React.useState({
    ...initialServiceData,
  });
  const bgColorPickerRef = useRef(null);
  const textColorPickerRef = useRef(null);
  // @ts-ignore
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [openBG, setOpenBG] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [formError, setFormError] = useState(
    {
      scheduleLength: null,
    }
  )
  const [departmentError, setDepartmentError] = useState(null)
  const [practitionerError, setPractitionerError] = useState(null)
  // @ts-ignore
  // @ts-ignore
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  useEffect(() => {
    if (!props.edit) setServiceData({ ...initialServiceData })
    if (props.edit && props?.service) {
      if (props.service.icon)
        setFileName(
          decodeURI(
            props.service?.icon.split("/").at(-1)
          )
        );

      setServiceId(props.service._id);
      setServiceValue(props.service.name.length)
      setDescriptionValue(props.service.description.length)
      setAllocatedTimeValue(props.service.allocatedTime);
      // @ts-ignore
      setscheduleLengthValue(parseFloat(props.service.scheduleLength));
      // @ts-ignore
      setPrice(parseFloat(props.service.price));
      // @ts-ignore
      setServiceData({
        name: props.service.name,
        description: props.service.description,
        price: props.service.price,
        business: props.business?.info?.business?._id,
        businessName: props.business?.info?.business?.name,
        allocatedTime: props.service.allocatedTime,
        scheduleLength: props.service.scheduleLength,
        tax: props.service.tax ?? [],
        payment: props.service.payment,
        capacity: props?.service?.capacity || '-1',
        wayOfService: props.service.wayOfService,
        department: props.service.department,
        practitioner: props.service.practitioner ?? [],
        icon: props.service.icon,
        bg: { r: 75, g: 75, b: 150, a: 1 },
        textColor: props.service.textColor,
        allowOnlineBooking: props.service.allowOnlineBooking,
        includeTax: props.service.includeTax,
        callForBook: props.service.callForBook,
        displayPrice: props.service.displayPrice,
        displayDuration: props.service.displayDuration,
        status: props.service.status,
      });
    }
  }, [props.business?.info?.business?._id, props.business?.info?.business?.name, props.edit, props.service])

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (bgColorPickerRef.current && event.target) {
        if (bgColorPickerRef.current.contains(event.target) == false) {
          setOpenBG(false);
        }
      }
      if (textColorPickerRef.current && event.target) {
        if (textColorPickerRef.current.contains(event.target) == false) {
          setOpenText(false);
        }
      }
    });
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


  let { practitioners, departments, taxs, edit } = props;
  const practitionerOptions =
    practitioners?.map((branch) => {
      return {
        id: branch._id,
        name: branch.name,
      };
    }) || [];
  const departmentOptions =
    departments?.map((department) => {
      return {
        id: department._id,
        name: department.name,
      };
    }) || [];

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const taxOptions =
    taxs?.map((tax) => {
      return {
        id: tax._id,
        name: tax.name,
      };
    }) || [];

  const onChangeValue = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setServiceValue(value.length);

    }
    else if (name === "description") {
      setDescriptionValue(value.length)

    }
    // @ts-ignore
    else if (name === "allocatedTime") {
      setAllocatedTimeValue(parseFloat(value))

    }
    // @ts-ignore
    else if (name === "scheduleLength") {
      console.log(value)
      setscheduleLengthValue(value)
    }
    // @ts-ignore
    else if (name === "price") setPrice(parseFloat(value));
    // @ts-ignore
    else if (name === "amount") setPartialAmount(parseFloat(value));
    setServiceData({
      ...serviceData,
      [name]: value,
    });

  };

  const isValidFileUploaded = (file) => {
    const validExtensions = ['png', 'jpeg', 'jpg', 'webp']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

  const uploadImge = (file) => {

    if (!isValidFileUploaded(file)) {
      setFileName('')
      return toastShow('error', "Only jpg/jpeg/png and webp files are allowed!");
    }
    if (parseInt(bytesToSize(file.size)) > 5) {
      setFileName('')
      return toastShow("error", "Max file size limit is 3 MB");
    }
    // @ts-ignore
    uploadAFile({
      // @ts-ignore
      fileName: "image",
      // @ts-ignore
      folder: 'servicesAndClass',
      file,
      onProgress: (progress) => console.log(progress),
      onSetDownloadUrl: (url) =>
        setServiceData({ ...serviceData, icon: url })
    });
  }

  const saveServiceData = async (e) => {

    // @ts-ignore
    const { name, price, allocatedTime, scheduleLength } = e || {}
    serviceData.name = name
    serviceData.price = price
    serviceData.allocatedTime = allocatedTime
    serviceData.scheduleLength = scheduleLength
    if (serviceData?.capacity == '-1') {
      serviceData.capacity = 'Unlimited'
    }
    if ((Number(e?.scheduleLength) <= Number(e.allocatedTime) &&
      scheduleLengthValue !== "")) {
      // @ts-ignore
      setFormError({ ...formError, scheduleLength: "error" })
    } else {
      // @ts-ignore
      setFormError({ scheduleLength: null })
    }
    if (serviceData.department == 'selected') {

      setDepartmentError(
        'error'
      )
    } else {
      setDepartmentError(null)
    }

    if (serviceData.practitioner.length == 0) {
      setPractitionerError('error')
    } else {
      setPractitionerError(null)
    }

    if (serviceData.department == 'selected' || serviceData?.practitioner?.length == 0 || formError?.scheduleLength) {
      return
    }

    setLoading(true);

    try {

      // creating new service 
      if (!practitionerError && !departmentError && !edit) {
        console.log('hello')
        props
          .serviceUpdate({ ...serviceData }, serviceId)
          // @ts-ignore
          .then((res) => {
            props.getService();
            setError("");
            setLoading(false);
            props.setShowModal(false);
            toastShow('success', 'Service created successfully')
          })
          .catch((err) => {
            setLoading(false);
            toastShow('error', err?.response?.data.message)
          });
      }
      // updaing service 
      else {
        props
          .serviceUpdate({ ...serviceData }, serviceId)
          // @ts-ignore
          .then((res) => {
            props.getService();
            setError("");
            setLoading(false);
            props.setShowModal(false);
            toastShow('success', 'Service updated successfully')
          });
      }
    } catch (error) {
      setLoading(false);
      toastShow('error', error?.response?.data.message)

    }

    setLoading(false)
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          if (serviceData.department == 'selected') setDepartmentError('error')
          else setDepartmentError(null)
          if (serviceData.practitioner.length == 0) setPractitionerError('error')
          else setPractitionerError(null)
          handleSubmit(saveServiceData)(e)
        }}
      >
        <div className="justify-center items-center flex absolute overflow-y-scroll h-[100vh] inset-0 z-50 outline-none focus:outline-none">
          <div className="max-w-[580px] lg:min-w-[665px] absolute top-10 flex flex-col items-center bg-white rounded-md border-b-2">
            <div className="w-full flex justify-end items-start px-2 py-1">
              <span
                onClick={() => props.setShowModal(false)}
                className="text-2xl text-[#5B5B5B] cursor-pointer"
              >
                <RxCross2 className="text-3xl font-bold" />
              </span>
            </div>
            <div className="flex w-full justify-center border-b-2 border-gray-300 pb-5">
              <span className="text-[#19525A] text-[32px] font-[700]">
                Add A New Service
              </span>
            </div>
            <div className="flex w-full justify-between items-center px-[25px] py-3 border-b-[2px] border-gray-300">
              <span className="text-[16px]">
                Name<b className="text-rose-600">*</b>
              </span>
              <div className="">
                <div
                  // @ts-ignore
                  className={`flex w-[240px] border-[0.5px]  rounded-[8px] ${errors?.name ? 'border-red-500' : 'border-[#1A535B]'}`}
                >
                  <input
                    type="text"
                    name="name"
                    maxLength={60}
                    defaultValue={edit ? props?.service?.name : serviceData?.name}
                    onChange={onChangeValue}
                    // required
                    autoComplete="off"
                    placeholder="Enter Service Name"
                    className={`outline-none rounded-[8px] w-[210px]  py-2 px-4 `}
                    {...register("name", {
                      required: {
                        value: true,
                        message: 'Name is Required'
                      },
                    })}
                  />
                  <p className="w-[35px] mt-auto text-xs text-gray-300">
                    {serviceValue === "" ? (
                      <span>00</span>
                    ) : (
                      <span>{serviceValue}</span>
                    )}
                    /60
                  </p>
                </div>
                <div>
                  {(serviceData?.name?.length > 60) && (
                    <p className="text-rose-600 text-xs px-1">
                      Not more than 60 character
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between border-b-[2px] border-gray-300 px-[25px] py-3">
              <span className="text-[16px]">Description</span>
              <div>
                <div
                  className={` w-[240px] h-[100px] border-[0.5px] border-[#1A535B] rounded-[8px] justify-between`}
                >
                  <textarea
                    name="description"
                    rows={6}
                    cols={26}
                    maxLength={120}
                    value={edit ? props?.service?.description : serviceData?.description}
                    onChange={onChangeValue}
                    className="outline-none rounded-[8px] h-[77px] W-full pt-1 pl-2 resize-none"
                  />
                  <p className="w-[50px] ml-auto text-xs text-gray-300 ">
                    {descriptionValue === "" ? (
                      <span>00</span>
                    ) : (
                      <span>{descriptionValue}</span>
                    )}
                    /120
                  </p>
                </div>
                <div>
                  {parseFloat(descriptionValue) > 120 && (
                    <p className="text-rose-600 text-xs px-1">
                      Not more than 120 character
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-3 border-b-[2px] border-gray-300">
              <p className="text-[16px]">
                Price<span className="text-rose-600">*</span>
              </p>
              <div
                // @ts-ignore
                className={`flex items-center text-center w-[240px] h-[36px] border-[0.5px] rounded-[8px]  ${errors?.price ? 'border-red-500' : 'border-[#1A535B]'}`}>
                <span className="w-[50px] h-full  my-auto bg-[#00A455] text-center text-[24px] text-white rounded-l-[7px]">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  // min="0"
                  defaultValue={edit ? props?.service?.name : serviceData?.price}
                  placeholder=" Enter Price"
                  className="outline-none rounded-r-[8px] h-full  py-2 px-1 w-[190px]"
                  {...register("price", {
                    required: {
                      value: true,
                      message: 'price is Required'
                    },
                  })}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-3 border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">
                Allocated time for service
                <span className="text-rose-600 flex">*
                  <
                    // @ts-ignore
                    Tooltip
                    position="top"
                    content="The length of time the customers is scheduled for."
                  >
                    <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                  </Tooltip></span>

              </p>
              <div
                className={`flex items-center text-center border-[0.5px] rounded-[8px]  h-[36px] ${errors?.
                  allocatedTime ? 'border-red-500' : "border-[#1A535B]"}`}>
                <input
                  type="number"
                  name="allocatedTime"
                  min="0"
                  onChange={onChangeValue}
                  defaultValue={edit ? props?.service?.allocatedTime : serviceData?.allocatedTime}
                  placeholder=" 00"
                  // @ts-ignore
                  className={`outline-none rounded-l-[8px] py-2 px-1 w-[121px] h-full  `}
                  {...register("allocatedTime", {
                    required: {
                      value: true,
                      message: 'allocatedTime is Required'
                    },
                  })}


                />
                <div className="h-full w-[119px] bg-[#D98829] text-center text-[16px] text-white rounded-r-[7px] flex items-center justify-center">
                  Minutes
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-3 border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">Schedule Length
                <
                  // @ts-ignore
                  Tooltip
                  position="top"
                  content="The length of time the practitioner's schedule is 
                    reserved for. To have a break between services, you 
                    must set this to be longer than the service duration. 
                    Make this empty if you don't need a break."
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </p>
              <div
                className={`flex items-center text-center h-[36px] rounded-[8px] border-[0.5px] ${(formError?.scheduleLength || errors?.scheduleLength) ? 'border-red-500' : 'border-[#1A535B]'}`}
              >
                <input
                  type="number"
                  min="0"
                  // name="scheduleLength"
                  onChange={onChangeValue}
                  defaultValue={edit ? props?.service?.scheduleLength : serviceData?.scheduleLength}
                  placeholder=" 00"
                  className={`outline-none w-[121px] h-full rounded-l-[8px] py-2 px-1  `}
                  {...register("scheduleLength", {
                    required: {
                      value: true,
                      message: 'scheduleLength is Required'
                    },
                  })}
                />
                <div className="h-full w-[119px] bg-[#D98829] text-center text-[16px] text-white rounded-r-[7px] flex items-center justify-center">
                  Minutes
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px]">Tax</p>
              <div className="flex ">
                <div className="flex items-center">
                  {serviceData?.tax?.map((item, index) => {
                    return (
                      <div className="flex items-center" key={index}>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          name="taxGst"
                          value={item.id}
                          onClick={(e) => {
                            // the value of the checkbox is the id of the tax

                            let taxArray = serviceData.tax;
                            // @ts-ignore
                            if (e.target.checked) {
                              taxArray.push(item.id);
                              onChangeValue({
                                target: {
                                  name: "tax",
                                  value: taxArray,
                                },
                              });
                            } else {
                              taxArray = taxArray.filter(
                                (tax) => tax !== item.id
                              );
                              onChangeValue({
                                target: {
                                  name: "tax",
                                  value: taxArray,
                                },
                              });
                            }
                          }}
                          className="w-4 h-4 ml-3 rounded-lg text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">
                Payment <span className="text-rose-600">*</span>
                <
                  // @ts-ignore
                  Tooltip
                  position="top"
                  content="Determine what payment options you accept for this 
                    service when customers want to make a booking on 
                    the booking page. Prepaid customers must pay before 
                    visiting to confirm the reservation, while postpaid 
                    customers must pay after the visit."
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </p>
              <
                // @ts-ignore
                DropDownId
                items={[
                  { name: "Prepaid", id: "prepaid" },
                  { name: "Postpaid", id: "postpaid" },
                  { name: "Partial", id: "partial" },
                  { name: "Practitioner choice", id: "parctitionerChoice" },
                ]}
                selected={serviceData.payment}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "payment",
                      value: selected,
                    },
                  });
                }}
                width={"240px"}
                height={"36px"}
              />
            </div>
            {serviceData.payment === "partial" && (
              <div
                className={`w-full flex justify-between items-center px-[25px] py-3 border-b-[2px] border-gray-300 `}
              >
                <p className="text-[16px]">
                  Amount<span className="text-rose-600">*</span>
                </p>
                <div
                  className={`flex items-center text-center w-[240px] h-[36px] border-[0.5px] rounded-[8px] border-[#1A535B] ${price <= partialAmount &&
                    partialAmount !== "" &&
                    "border-[0.5px] border-rose-600"
                    }`}
                >
                  <span className="w-[50px] h-full  my-auto bg-[#00A455] text-center text-[24px] text-white rounded-l-[7px]">
                    $
                  </span>
                  <input
                    type="number"
                    min='1'
                    name="amount"
                    onChange={onChangeValue}
                    required
                    placeholder=" Enter amount"
                    className="outline-none rounded-r-[8px] h-full  py-2 px-1 w-[190px]"
                  />
                </div>
              </div>
            )}

            <div className="w-full flex justify-between items-center px-[25px] py-[12px]  border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">
                Capacity
                <span className="text-rose-600">*</span>
                <
                  // @ts-ignore
                  Tooltip
                  position="top"
                  content="Determine how many customers can buy this. After 
                    the selected customers purchase, it will be inactive 
                    automatically. (e.g., if the quantity is 10, that means 
                    only 10 customers are able to purchase this service.)"
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </p>
              <
                // @ts-ignore
                DropDownId
                items={[
                  { name: "Unlimited", id: "-1" },
                  { name: "5", id: "5" },
                  { name: "10", id: "10" },
                  { name: "15", id: "15" },
                  { name: "20", id: "20" },
                  { name: "25", id: "25" },
                  { name: "30", id: "30" },
                  { name: "35", id: "35" },
                ]}
                selected={serviceData.capacity || '-1'}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "capacity",
                      value: selected,
                    },
                  });
                }}
                width={"240px"}
                height={"36px"}
              />
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px]">Way of Service</p>
              <
                // @ts-ignore
                DropDownId
                items={[
                  { name: "Online", id: "online" },
                  { name: "Offline", id: "offline" },
                ]}
                selected={serviceData.wayOfService}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "wayOfService",
                      value: selected,
                    },
                  });
                }}
                width={"240px"}
              />
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px]">
                Department<span className="text-rose-600">*</span>
              </p>
              <

                DropDownId
                departmentError={departmentError}
                items={departmentOptions}
                selected={serviceData.department}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "department",
                      value: selected,
                    },
                  });
                  setDepartmentError(null)
                }}
                width={"240px"}
                height={"36px"}
              />
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px]">
                Add practitionar<span className="text-rose-600">*</span>
              </p>
              <
                // @ts-ignore
                MultiSelectDropDown
                items={[
                  { id: "-1", name: "Select All" },
                  ...practitionerOptions,
                ]}
                selectedList={serviceData.practitioner}
                itemName="Practitioner"
                onSelectedItem={(selected) => {
                  if (selected === "-1") {
                    if (serviceData.practitioner.length === 0) {
                      let newValue = practitionerOptions.map((branch) => {
                        return branch.id;
                      });
                      onChangeValue({
                        target: {
                          name: "practitioner",
                          value: newValue,
                        },
                      });
                    } else {
                      onChangeValue({
                        target: {
                          name: "practitioner",
                          value: [],
                        },
                      });
                    }
                  } else {
                    if (!serviceData.practitioner.includes(selected)) {
                      let newValue = serviceData.practitioner;
                      newValue.push(selected);
                      onChangeValue({
                        target: {
                          name: "practitioner",
                          value: newValue,
                        },
                      });
                    } else {
                      let newValue = serviceData.practitioner;
                      newValue.splice(newValue.indexOf(selected), 1);
                      onChangeValue({
                        target: {
                          name: "practitioner",
                          value: newValue,
                        },
                      });
                    }
                  }
                  setPractitionerError(null)
                }
                }
                width={"240px"}
                height={"36px"}
                practitionerError={practitionerError}
              />
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">
                Upload Cover or Icon
                <
                  // @ts-ignore
                  Tooltip
                  position="top"
                  content="Max 360X130 px and not more then 2 MB. Format : 
                    JPG, JPEG, PNG, SVG"
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </p>
              <p className="ml-auto mr-2">
                {fileName !== "" && fileName.substring(0, 15)}
              </p>
              <label className="w-40 text-[16px] border-[1px] border-gray-400 px-3 py-2 flex flex-col items-center bg-[#1A535B] rounded-[8px] text-white cursor-pointer hover:bg-gray-400 hover:text-white">
                <span className="text-[15px] text-base leading-normal">
                  {"Upload"}
                </span>
                <input
                  type="file"
                  className="hidden h-[36px]"
                  onChange={(e) => {
                    setFileName(e.target?.files[0]?.name);
                    setServiceData({ ...serviceData, icon: e.target?.files[0] })
                    onChangeValue({
                      target: {
                        name: "icon",
                        value: e.target.files[0],
                      },
                    });
                    uploadImge(e.target.files[0])
                  }}
                />
              </label>
            </div>
            <div className="flex w-full justify-between px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px] flex">Color in schedule
              </p>
              <div className="flex">
                <div
                  className="text-center w-[70px] flex"
                  ref={bgColorPickerRef}
                >
                  <div className="text-[16px] text-[#5b5b5b] my-auto">BG</div>
                  <div
                    onClick={() => setOpenBG(!openBG)}
                    style={{
                      backgroundColor: `${rgbToHexConverter(serviceData.bg)}`,
                      opacity: serviceData?.bg?.a,
                    }}
                    className="h-[36px] w-[36px] rounded-[8px] ml-3 border-[0.5px] border-[#5b5b5b]"
                  ></div>
                  {openBG && (
                    <div className="relative">
                      <div className="absolute z-20 right-[calc(25%)] bottom-[calc(100%)]">
                        <div className="colorpicker">
                          <RgbaColorPicker
                            style={{}}
                            color={serviceData.bg}
                            onChange={(color) => {
                              setServiceData((prevstate) => {
                                prevstate["bg"] = color;
                                return { ...prevstate };
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="text-center ml-2 w-[70px] flex"
                  ref={textColorPickerRef}
                >
                  <div className="text-[16px] text-[#5b5b5b] my-auto">Text</div>
                  <div
                    onClick={() => setOpenText(!openText)}
                    style={{
                      backgroundColor: `${rgbToHexConverter(
                        serviceData?.textColor
                      )}`,
                      opacity: serviceData?.textColor?.a,
                    }}
                    className="h-[36px] w-[36px] rounded-[8px] ml-2  border-[0.5px] border-[#5b5b5b]"
                  ></div>
                  {openText && (
                    <div className="relative">
                      <div className="absolute z-20 mr-10 right-[calc(25%)] bottom-[calc(100%)]">
                        <div className="colorpicker">
                          <RgbaColorPicker
                            style={{}}
                            color={serviceData.textColor}
                            onChange={(color) => {
                              setServiceData((prevstate) => {
                                prevstate["textColor"] = color;
                                return { ...prevstate };
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <span className="text-[16px] flex">
                Allow booking online
                <
                  // @ts-ignore
                  Tooltip
                  position="top"
                  content="That determines the service you created, this will be 
                    displayed on the booking page, and customers are 
                    able to purchase this online."
                >
                  <RiErrorWarningLine className="text-xs text-[#1A535B] -mt-[7px] -ml-[4px]" />
                </Tooltip>
              </span>
              <Toggle
                checked={serviceData?.allowOnlineBooking}
                setChecked={(value) => {
                  setServiceData({
                    ...serviceData,
                    allowOnlineBooking: value,
                    callForBook: !value,
                  });
                }}
              />
            </div>
            <div className="flex w-full justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <span className="text-[16px]">Call for Book</span>
              <Toggle
                checked={serviceData?.callForBook}
                setChecked={(value) => {
                  setServiceData({
                    ...serviceData,
                    callForBook: value,
                    allowOnlineBooking: !value,
                  });
                }}
              />
            </div>
            <div className="flex w-full justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <span className="text-[16px]">
                Display Duration In Booking Page
              </span>
              <Toggle
                checked={serviceData?.displayDuration}
                setChecked={(value) => {
                  onChangeValue({
                    target: {
                      name: "displayDuration",
                      value: value,
                    },
                  });
                }}
              />
            </div>
            <div className="w-full flex justify-between items-center px-[25px] py-[12px] border-b-[2px] border-gray-300">
              <p className="text-[16px]">Status</p>
              <
                // @ts-ignore
                DropDownId
                items={[
                  { id: "Active", name: "Active" },
                  { id: "Inactive", name: "Inactive" },
                ]}
                selected={serviceData.status}
                onSelected={(selected) => {
                  onChangeValue({
                    target: {
                      name: "status",
                      value: selected,
                    },
                  });
                }}
                width={"224px"}
                height={"36px"}
              />
            </div>
            {error && (
              <div className="w-full text-center text-[#ff0000] mt-[20px]">
                <p>{error}</p>
              </div>
            )}
            <div className="w-full flex justify-end items-end px-[25px] py-[18px]">
              <button
                onClick={() => {
                  props.onCancelAction();
                  props.setShowModal(false);
                }}
                className="px-[20px] h-[36px] text-[20px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-[32px] h-[36px] text-[20px] border-[1px] border-[#1A535B] bg-[#1A535B] rounded-[8px] text-white"
              >
                {loading ? (
                  <PulseLoader color="#ffffff" size={12} />
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state?.service?.loading,
    business: state?.business,
  };
};
export default connect(mapStateToProps, {
  serviceUpdate,
  onCancelAction,
  getService,
})(ServiceModal);
