import Image from "next/image"
import { BsPin, BsStar, BsThreeDotsVertical } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../../Dropdown/DropDownId";
import human from "./verifiedhuman.svg";
import rx from "./rx.svg";
import ambel from "./ambel.svg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { QrCode } from "../../QrCode";
import { connect } from "react-redux";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { getCustomers } from "../../../StatelessAPI/customerApiCalls";

const PrescriptionForm = (props) => {
  const medicineInputRef = useRef([]);
  const testInputRef = useRef([]);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(1);
  const [fileBase64, setFileBase64] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const placeHolder =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quibusdam quasi nemo deserunt voluptatum aspernatur inventore vero, necessitatibus, explicabo quidem debitis id tenetur quas enim dolores tempora aliquid error eveniet";
  const [diagnosis, setDiagnosis] = useState(placeHolder);
  const diagnosisRef = useRef(null);
  const [medicineName, setMedicineName] = useState({
    name: "",
    duration: "",
    morning: "",
    noon: "",
    night: "",
    mealStatus: "",
  });
  const [medicineArray, setMedicineArray] = useState([]);
  const [testName, setTestName] = useState({
    group: "",
    name: "",
  });
  const [testArray, setTestArray] = useState([]);

  const medicineFieldDeleteHandler = (index) => {
    // console.log(index);
    setMedicineArray((prevState) => {
      const newArr = prevState;
      newArr.splice(index, 1);
      return [...newArr];
    });
  };

  const onChangeMedicineHandler = (event) => {
    setMedicineName((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const medicineFieldAddHandler = () => {
    if (
      !medicineName.name ||
      !medicineName.duration ||
      !medicineName.mealStatus ||
      !medicineName.morning ||
      !medicineName.noon ||
      !medicineName.night
    ) {
      // console.log(medicineInputRef);
      !medicineName.mealStatus && medicineInputRef.current[5].focus();
      !medicineName.night && medicineInputRef.current[4].focus();
      !medicineName.noon && medicineInputRef.current[3].focus();
      !medicineName.morning && medicineInputRef.current[2].focus();
      !medicineName.duration && medicineInputRef.current[1].focus();
      !medicineName.name && medicineInputRef.current[0].focus();

      return;
    }
    setMedicineArray((prevState) => {
      return [...prevState, medicineName];
    });
    setMedicineName({
      name: "",
      duration: "",
      morning: "",
      noon: "",
      night: "",
      mealStatus: "",
    });
  };

  const testFieldAddHandler = () => {
    if (!testName.name || !testName.group) {
      !testName.name && testInputRef.current[1].focus();
      !testName.group && testInputRef.current[0].focus();

      return;
    }
    setTestArray((prevState) => {
      return [...prevState, testName];
    });
    setTestName({
      group: "",
      name: "",
    });
  };
  const testFieldDeleteHandler = (index) => {
    setTestArray((prevState) => {
      const newArr = prevState;
      newArr.splice(index, 1);
      return [...newArr];
    });
  };
  const onChangeTestHandler = (event) => {
    setTestName((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const createPrescriptionHandler = async () => {
    if (
      !(
        props.business?._id &&
        props.practitioner?._id &&
        selectedCustomer &&
        (medicineArray.length || testArray.length) &&
        diagnosis != placeHolder
      )
    ) {
      console.log(
        props.business?._id,
        props.practitioner?._id,
        selectedCustomer,
        medicineArray.length,
        testArray.length
      );
      toast.warning("Fill require fields", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "/prescription",
        {
          customerId: selectedCustomer,
          businessId: props.business?._id,
          practitionerId: props.practitioner._id || Cookies.get("actingUserType"),
          diagnosis,
          medicineList: medicineArray,
          testList: testArray,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      console.log(response.data);
      if (response.data.status == "success") {
        toast.success("Successfully created", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.warning("Something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.warning("Something went wrong", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const prescriptionSaveHandler = async () => {
    if (
      !(
        props.business?._id &&
        (medicineArray.length || testArray.length) &&
        diagnosis != placeHolder
      )
    ) {
      console.log(
        props.business?._id,
        medicineArray.length,
        testArray.length
      );
      toast.warning("Fill require fields", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    try {
      const response = await axios.post(
        "/prescription",
        {
          businessId: props.business?._id,
          diagnosis,
          medicineList: medicineArray,
          testList: testArray,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      console.log(response.data);
      if (response.data.status == "success") {
        toast.success("Successfully created", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.warning("Something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.warning("Something went wrong", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    medicineInputRef.current = medicineInputRef.current.slice(0, 6);
    testInputRef.current = testInputRef.current.slice(0, 2);
  }, []);

  useEffect(() => {
    console.log(props.practitionerId);
    if (props.businessId) {
      getCustomers(props.businessId).then((response) => {
        console.log(response);
        setCustomers(response);
      });
    }
  }, []);
  console.log(props.practitioner, props.business)
  return (<div>
    <div className="bg-[#fff] pt-[10px]">
      {/* top */}
      <div className="w-full flex justify-between bg-[#F3920066] rounded-t-md p-1">
        <div className="flex px-5">
          <p className="text-[20px] text-[#090909] font-bold">
            Md. Tazul Islam
            <span className="text-[14px] font-[400] ml-10">
              January 10, 2023
            </span>
          </p>
        </div>
        <div>
          <div className="flex items-center mt-1">
            <BsPin className="text-xl text-[#19525A] cursor-pointer mr-3" />
            <BsStar className="text-xl text-[#FF0000] cursor-pointer mr-3" />
            <BsThreeDotsVertical className="text-xl text-[#5B5B5B] cursor-pointer mr-3" />
          </div>
        </div>
      </div>
    </div>
    {/* mid */}
    <div className="w-full flex flex-row bg-[#fff] text-center mx-auto justify-center">
      {/* <div></div> */}
      <div className="w-[650px] text-center p-[30px]">
        <div>
          <Image src={props.business?.banner} width={350} height={70} />
          <p className="text-[14px] text-[#000]">
            Akhalia, Sylhet-Sunamganaj Highway Sylhet, 3100
          </p>
        </div>
        <div className="text-[#000] flex flex-row justify-between mt-[20px]">
          <div className="text-left">
            <p className="text-[16px]  font-[700] ">{props?.practitioner?.name}</p>
            <p>{props.practitioner?.educations?.map(item => item.title).join(", ")}</p>
          </div>
          <div className="text-left">
            {props?.practitioner?.phoneCode && props?.practitioner?.businessPhoneNumber && (<p><span className="font-[700]">Mobile : </span> {props?.practitioner?.phoneCode}{props?.practitioner?.businessPhoneNumber} </p>)}
            {props?.practitioner?.businessEmail && (<p><span className="font-[700]">Email : </span>{" "}props?.practitioner?.businessEmail</p>)}
          </div>
        </div>
        <div className="mt-[20px]">
          <p className="text-[#01BABE] text-left mb-[10px]">
            Patient Records:
          </p>
          <div className="text-[14px]  text-[#5B5B5B] flex flex-row justify-between mr-[30px]">
            <p>
              <span className="font-[700] text-[#000]">Name : </span> {selectedCustomer?.user?.fullName}
            </p>
            <p>
              <span className="font-[700] text-[#000]">Age : </span> {selectedCustomer?.user?.age}
            </p>
            <p>
              <span className="font-[700] text-[#000]">Gender : </span> {selectedCustomer?.user?.gender}
            </p>
            <p>
              <span className="font-[700] text-[#000]">Date : </span>
              {/*Date : 17 January, 2023 */}
              {props.new ? moment().format("DD MMMM, YYYY") : moment(selectedCustomer?.data).format("DD MMMM, YYYY")}
            </p>
          </div>
        </div>
        <div className="text-[14px] text-[#5B5B5B] text-left mt-[20px]">
          <p className="text-[#01BABE] mb-[10px]">Diagnosis:</p>
          {isEditing ? (
            <textarea
              ref={diagnosisRef}
              className="w-full p-[5px]"
              value={diagnosis}
              onChange={(event) => {
                setDiagnosis(event.target.value)
              }}
              onBlur={(event) => {
                setIsEditing(false);
              }}
            />
          ) : (
            <div
              onDoubleClick={() => {
                setIsEditing(true);
                diagnosisRef.current?.focus();
              }}
            >
              {diagnosis}
            </div>
          )}

          {/* or textArea */}
        </div>
        <div className="text-left mt-[20px] mb-[10px]">
          <Image src={rx} height={40} width={30} />
        </div>
        <div>
          {selectedFormat == 1 ? (
            <>
              <div className="flex  border-[#C1C1C1] border-t-[2px] text-[12px] text-[#19525A] font-[700] text-center h-[30px]">
                <div className="w-[45%] border-[2px] border-t-[0px] border-[#C1C1C1]  py-[5px] px-[5px]">
                  Medicine Name Field
                </div>
                <div className="w-[11.2%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                  Duration
                </div>
                <div className="w-[12%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                  Morning
                </div>
                <div className="w-[9%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                  Noon
                </div>
                <div className="w-[9%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                  Night
                </div>
                <div className="w-[15%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                  Meal Status
                </div>
              </div>

              {medicineArray.map((item, index) => {
                return (
                  <div key={index} className="relative">
                    <div className="w-full flex  text-[12px] text-[#000]   h-[30px] text-left">
                      <div className="w-[45%] border-[2px] border-t-[0px] border-[#C1C1C1]  py-[5px] px-[10px]">
                        {item.name}
                      </div>
                      <div className="w-[11.2%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                        {item.duration}
                      </div>
                      <div className="w-[12%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                        {item.morning}
                      </div>
                      <div className="w-[9%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                        {item.noon}
                      </div>
                      <div className="w-[9%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                        {item.night}
                      </div>
                      <div className="w-[15%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1] py-[5px] px-[5px]">
                        {item.mealStatus}
                      </div>
                    </div>

                    <RxCrossCircled
                      size={16}
                      className="inline absolute left-[600px] top-[4px] text-[red]"
                      onClick={() => {
                        medicineFieldDeleteHandler(index);
                      }}
                    />
                  </div>
                );
              })}
              <div className="relative pb-[20px]">
                <div className="w-full flex  text-[12px] text-[#000]   h-[30px] text-left">
                  <input
                    ref={(el) => (medicineInputRef.current[0] = el)}
                    type="text"
                    placeholder="Add a Medicine"
                    name="name"
                    value={medicineName.name}
                    onChange={onChangeMedicineHandler}
                    className="w-[45%] border-[2px] outline-none border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1]  py-[5px] px-[10px]"
                  />

                  <input
                    ref={(el) => (medicineInputRef.current[1] = el)}
                    type="text"
                    placeholder="Duration"
                    name="duration"
                    value={medicineName.duration}
                    onChange={onChangeMedicineHandler}
                    className="w-[11.2%] outline-none border-[2px] border-l-[0px] border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />

                  <input
                    ref={(el) => (medicineInputRef.current[2] = el)}
                    type="text"
                    name="morning"
                    value={medicineName.morning}
                    placeholder="Morning"
                    onChange={onChangeMedicineHandler}
                    className="w-[12%] outline-none border-[2px]  border-l-[0px] border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />

                  <input
                    ref={(el) => (medicineInputRef.current[3] = el)}
                    type="text"
                    name="noon"
                    value={medicineName.noon}
                    placeholder="Noon"
                    onChange={onChangeMedicineHandler}
                    className="w-[9%] outline-none border-[2px] border-l-[0px] border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />

                  <input
                    ref={(el) => (medicineInputRef.current[4] = el)}
                    type="text"
                    name="night"
                    value={medicineName.night}
                    placeholder="Night"
                    onChange={onChangeMedicineHandler}
                    className="w-[9%] outline-none border-[2px] border-l-[0px]  border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />

                  <input
                    ref={(el) => (medicineInputRef.current[5] = el)}
                    type="text"
                    placeholder="Meal Status"
                    name="mealStatus"
                    value={medicineName.mealStatus}
                    onChange={onChangeMedicineHandler}
                    className="w-[15%] outline-none border-[2px] border-l-[0px] border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />
                </div>

                <AiOutlinePlusCircle
                  size={16}
                  className="inline absolute left-[600px] top-[7px] text-[#1a525a]"
                  onClick={() => {
                    medicineFieldAddHandler();
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex border-t-[2px] border-[#C1C1C1] text-[12px] text-[#19525A] font-[700]">
                <div className="w-[60%] border-[2px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                  Test Group
                </div>
                <div className="w-[40%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                  Test Name
                </div>
              </div>

              {testArray.map((item, index) => {
                return (
                  <div key={index} className="relative">
                    <div className="flex   text-[12px] text-[#000000] text-left h-[26px]">
                      <div className="w-[60%] border-[2px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                        {item.group}
                      </div>
                      <div className="w-[40%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                        {item.name}
                      </div>
                    </div>
                    <RxCrossCircled
                      size={16}
                      className="inline absolute left-[600px] top-[4px] text-[red]"
                      onClick={() => {
                        testFieldDeleteHandler(index);
                      }}
                    />
                  </div>
                );
              })}
              <div className="relative pb-[20px]">
                <div className="w-full flex  text-[12px] text-[#000]   h-[30px] text-left">
                  <input
                    ref={(el) => (testInputRef.current[0] = el)}
                    type="text"
                    placeholder="Add a Medicine"
                    name="group"
                    value={testName.group}
                    onChange={onChangeTestHandler}
                    className="w-[60%] border-[2px] outline-none border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1]  py-[5px] px-[10px]"
                  />

                  <input
                    ref={(el) => (testInputRef.current[1] = el)}
                    type="text"
                    placeholder="Duration"
                    name="name"
                    value={testName.name}
                    onChange={onChangeTestHandler}
                    className="w-[40%] outline-none border-[2px] border-l-[0px] border-t-[0px] focus:border-b-[#FF7A00] border-[#C1C1C1] py-[5px] px-[5px]"
                  />
                </div>

                <AiOutlinePlusCircle
                  size={16}
                  className="inline absolute left-[600px] top-[7px] text-[#1a525a]"
                  onClick={() => {
                    testFieldAddHandler();
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between">
          <div className="pt-[40px]">
            <div className="w-[120px] h-[30px]">
              {/* show image when new from with base64 || props.practitioner.signature exists */}
              {fileBase64 || props.practitioner?.signature ? (
                <Image src={props.practitioner?.signature ?? fileBase64} height={30} width={120} />
              ) : null}
            </div>

            <label>
              <div className="text-[14px] border-t-[2px] border-[#000]">
                Signature
              </div>
              {
                // take input when props.new=true & signature(fields) not exists in practitioner
                (props.new || !props.practitioner?.signature) && (<input
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      const fr = new FileReader();
                      fr.addEventListener("load", () => {
                        setFileBase64(fr.result);
                      });
                      fr.readAsDataURL(event.target.files[0]);
                    }
                  }}
                />)

              }

            </label>
          </div>
          <div className="text-center pt-[30px]">
            <p className="text-[14px] text-[#0073FB] mb-[5px]">
              Powered By
            </p>
            <Image src={ambel} width={115} height={30} />
          </div>
          <div className="pt-[15px] w-[90px] h-[90px]">
            {/* <Image src={square} width={90} height={90} /> */}
            <QrCode download={false} width="90" height="90" />
            {/* {QrCodeComponent} */}
          </div>
        </div>
      </div>
      <div className="pl-[30px] pt-[20px]">
        <Dropdown
          selected={selectedFormat}
          items={[
            { name: "Medicine", id: 1 },
            { name: "Body Test", id: 2 },
          ]}
          onSelected={(id) => {
            setSelectedFormat(id);
          }}
          width="160px"
        />
      </div>
    </div>
    <div className="bg-[#F3920066]/40 flex p-[10px]  rounded-b-[8px] justify-between">
      {/* footer */}
      <div>

        <button
          className="w-[114px] h-[28px] bg-[#fff] text-[#5B5B5B] rounded-[4px] text-[12px] ml-[20px]"
          onClick={prescriptionSaveHandler}
        >
          Save
        </button>
        <button
          className="w-[114px] h-[28px] bg-[#fff] text-[#5B5B5B] rounded-[4px] text-[12px] ml-[20px]"
          onClick={() => {
            props.close()
          }}
        >
          Cancel
        </button>
      </div>

      <div className="flex justify-end">
        <Dropdown
          selected={selectedCustomer}
          placeHolder="Select a Customer"
          items={customers.map((item) => ({
            name: item.name,
            id: item._id,
          }))}
          onSelected={(id) => {
            setSelectedCustomer(id);
          }}
          width="180px"
          height="30px"
        />
        <div
          title="Sent"
          className="relative top-[3px] left-[10px] mr-[20px] ml-[10px]"
        >
          <Image
            src={human}
            width={25}
            height={25}
            onClick={createPrescriptionHandler}
          />
        </div>

        {/* <button className="w-[114px] h-[28px] bg-[#fff] rounded-[4px] text-[12px] mr-[15px] ml-[15px]">
          Cancel
        </button>
        <button className="w-[114px] h-[28px] bg-[#19525A] text-[#fff] rounded-[4px] text-[12px] mr-[20px]">
          Publish
        </button> */}
      </div>
    </div>
  </div>)
}

const mapStateToProps = (state) => {
  return {
    business: state?.business?.info?.business,
    practitioner:
      state//?.practitioner?.info?.practitioner
  };
};

export default connect(mapStateToProps, {})(PrescriptionForm);
