import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getCustomers } from "../../StatelessAPI/customerApiCalls";
import axios from "../../utils/axios";

const PrescriptionModal = (props) => {
  const medicineInputRef = useRef([]);
  const testInputRef = useRef([]);

  const [selectedFormat, setSelectedFormat] = useState(0);
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
  const [diagnosis, setDiagnosis] = useState("");

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
        props.businessId &&
        props.practitionerId &&
        (medicineArray.length || testArray.length)
      )
    ) {
      // console.log(
      //   props.businessId,
      //   props.practitionerId,
      //   medicineArray.length,
      //   testArray.length
      // );

      //for development purpose
      if (!props.practitionerId) {
        toast.warning("Practitioner id not found", {
          position: "top-right",
          autoClose: 1000,
        });
        return;
      }
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
          customerId: props.prescribedFor,
          businessId: props.businessId,
          practitionerId: props.practitonerId,
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
        toast.warning("Somethign went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.warning("Somethign went wrong", {
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
    console.log(props.practitionerId, props.businessId, props.prescribedFor);
    if (props.businessId) {
      getCustomers(props.businessId).then((response) => {
        console.log(response);
        // setCustomers(response);
      });
    }
  }, []);
  return (
    <>
      {selectedFormat == 0 ? (
        <div className="w-[420px] bg-[#fff] border-[.5px] border-[#19525A]/50 rounded-[4px]">
          <div className="w-full py-[15px] px-[10px] text-[20px] bg-[#C8C8C833]/20 text-[#5B5B5B] mb-[10px] border-t-[.5px] border-[#19525A]/50 leading-[30px] relative">
            <p className="m-auto">Select a Prescription Template</p>
            <RxCross2
              className="absolute top-[10px] left-[93%] "
              onClick={() => {
                props.setIsPrescriptionModalOpen(false);
              }}
            />
          </div>
          <div className="w-full text-[#5B5B5B] text-[14p]">
            <div
              className="w-[390px] py-[10px] px-[10px] mx-auto border-[.5px] border-[#5B5B5B4D]/50 rounded-[4px] mb-[10px] leading-[21px]"
              onClick={() => {
                setSelectedFormat(1);
              }}
            >
              <p className="m-auto">Medicine</p>
            </div>
            <div
              className="w-[390px] py-[10px] px-[10px] mx-auto border-[.5px] border-[#5B5B5B4D]/50 rounded-[4px] mb-[10px] leading-[21px]"
              onClick={() => {
                setSelectedFormat(2);
              }}
            >
              <p>Body Test</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-[620px] border-[.5px] border-[#19525A]/50 rounded-[4px]">
          <div className="w-full py-[15px] px-[10px] text-[20px] bg-[#C8C8C833]/20 text-[#5B5B5B] mb-[10px] border-t-[.5px] border-[#19525A]/50 leading-[30px] relative">
            <p>Write the Prescription Details</p>
            <RxCross2
              className="absolute top-[10px] left-[95%] "
              onClick={() => {
                props.setIsPrescriptionModalOpen(false);
              }}
            />
          </div>
          <div className="text-[#5B5B5B] px-[10px] text-[16px]">
            <p className="pb-[5px]">Diagnosis</p>
            <textarea className="w-full h-[90x] outline-none border-[.5px] border-[#C1C1C1] rounded-[5px] p-[5px]" />
          </div>
          {selectedFormat == 1 ? (
            <div className="pt-[10px]">
              <div className="w-[90%] ml-[10px] flex  border-[#C1C1C1] border-t-[2px] text-[12px] text-[#19525A] font-[700] text-center h-[30px]">
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
                    <div className="w-[90%] ml-[10px] flex  text-[12px] text-[#000]   h-[30px] text-left">
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
                      className="inline absolute left-[94.4%] top-[4px] text-[red]"
                      onClick={() => {
                        medicineFieldDeleteHandler(index);
                      }}
                    />
                  </div>
                );
              })}
              <div className="w-[90%] ml-[10px] relative pb-[20px]">
                <div className="flex  text-[12px] text-[#000]   h-[30px] text-left">
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
                  className="inline absolute left-[103%] top-[7px] text-[#1a525a]"
                  onClick={() => {
                    medicineFieldAddHandler();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="pt-[10px]">
              <div className="w-[90%] ml-[10px] flex border-t-[2px] border-[#C1C1C1] text-[12px] text-[#19525A] font-[700]">
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
                    <div className="w-[90%] ml-[10px] flex   text-[12px] text-[#000000] text-left h-[26px]">
                      <div className="w-[60%] border-[2px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                        {item.group}
                      </div>
                      <div className="w-[40%] border-[2px] border-l-[0px] border-t-[0px] border-[#C1C1C1]  py-[3px] px-[10px]">
                        {item.name}
                      </div>
                    </div>
                    <RxCrossCircled
                      size={16}
                      className="inline absolute left-[94.5%] top-[4px] text-[red]"
                      onClick={() => {
                        testFieldDeleteHandler(index);
                      }}
                    />
                  </div>
                );
              })}
              <div className="relative pb-[20px]">
                <div className="w-[90%] ml-[10px] flex  text-[12px] text-[#000]   h-[30px] text-left">
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
                  className="inline absolute left-[94.5%] top-[7px] text-[#1a525a]"
                  onClick={() => {
                    testFieldAddHandler();
                  }}
                />
              </div>
            </div>
          )}
          <div className="w-full h-[40px] bg-[#C8C8C833]/20 flex  justify-between text-[14px] py-[5px]">
            <button
              className="rounded-[4px] border-[.5px] border-[#5B5B5B] text-[#5B5B5B] ml-[10px] px-[15px]"
              onClick={() => {
                setSelectedFormat(0);
              }}
            >
              Back
            </button>
            <button
              className="bg-[#19525A] text-[#fff] rounded-[4px] mr-[10px] px-[15px]"
              onClick={createPrescriptionHandler}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessId: state?.business?.info?.business?._id,
    practitionerId:
      state?.practitioner?.info?.practitioner?._id ||
      Cookies.get("actingUserType"),
  };
};

export default connect(mapStateToProps, {})(PrescriptionModal);
