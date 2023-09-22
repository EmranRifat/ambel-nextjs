import React, { useEffect, useState } from "react";
import BasicInfo from "./BasicInfo";
import { BsArrowLeft } from "react-icons/bs";
import BusinessInfo from "./BusinessInfo";
import Finish from "./Finish";
import Stepper from "../Profile/components/Stepper";
import { connect } from "react-redux";
import { getBusinessInfo, upadateBusiness } from "../../store/actions/business";
import { useRouter } from "next/router";
import { deauthenticate } from "../../store/actions/auth";
import styles from "../setup.module.css";
import PractitionerInfo from "./PractitionerInfo";
import PulseLoader from "react-spinners/PulseLoader";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import { getPractitionerInfo } from "../../store/actions/practitioner";
import cookie from "js-cookie";
import { decrypt } from "../../utils/utility";
import { getUserInfo } from "../../store/actions/user";
import axios from "../../utils/axios";

const SetupProfile = (props) => {
  const router = useRouter();
  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  // const [clientSecret, setClientSecret] = useState("");
  // const getIntent = () => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment/create-setup-intent`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${cookie.get("jwt")}`,
  //       },
  //       body: JSON.stringify({
  //         amount: 50,
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setClientSecret(data.client_secret);
  //     })
  //     .catch((e) => console.log(e));
  // };
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: clientSecret,
  // };

  // const createCustomer = async () => {
  //   await axios.post(
  //     "/users/createCustomer",
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${cookie.get("jwt")}`,
  //       },
  //     }
  //   )
  //     .then(() => {
  //       getIntent();
  //     })
  //     ;
  // };

  // useEffect(() => {
  //   createCustomer();
  // }, []);
  // const router = useRouter();
  const [nextPage, setNextPage] = useState(1);
  const [userType, setUserType] = useState("Select User Type");
  const [selectPayMethod, setSelectPayMethod] = useState("ambel");
  const steps = ["Basic Info", `${userType} Info`, "Finish"];
  const types = ["User or Member", "Practitioner", "Organization"];
  const [fillError, setFillError] = useState({
    userName: false,
    address: false,
    zipcode: false,
    professional_email: false,
    professional_phone: false,
    country: false,
    city: false,
    phoneNumber: false,
    professionType: false,
    professionSubType: false,
    businessEmail: false,
    businessPhoneNumber: false,
    areaOfPractice: false,
    orgName: false,
    orgBusinessEmail: false,
    businessnessCategory: false,
    businessSubCategory: false,
    businessType: false,
    orgBusinessPhoneNumber: false,
    ownerRole: false,
  });
  const [userData, setUserData] = useState({
    "User or Member": {
      userName: "",
      address: "",
      country: "Select Your Country",
      city: "Select Your City",
      zipCode: "",
      phoneCode: "",
      phoneNumber: "",
      gender: "",
      userRole: "user",
      photo: "",
      registrationComplete: false,
    },
    Practitioner: {
      professionType: "Select practitioner category",
      professionSubType: "Select your practitioner sub-category",
      businessEmail: "",
      phoneCode: "",
      businessPhoneNumber: "",
      fieldOfStudy: "",
      areaOfPractice: "Select your area of practice",
    },
    Organization: {
      name: "",
      description: "",
      location: "",
      phoneCode: "",
      phone: "",
      email: "",
      website: "",
      businessCategory: "Select your business category",
      businessSubCategory: "Select your business sub category",
      businessType: "Select your business type",
      practiceType: "",
      ownerRole: "Select your role",
      logo: "",
      banner: "",
    },
  });

  useEffect(() => {
    props.getPractitionerInfo();
    props.getBusinessInfo();
    props.getUserInfo();
  }, []);

  useEffect(() => {
    if (props.user?.userType) setUserType(props.user?.userType);
    if (userType === "Organization") {
      setUserData({
        ...userData,
        "User or Member": {
          ...userData["User or Member"],
          ...props.user,
        },
        Organization: {
          ...userData.Organization,
          ...props.info?.business,
        },
      });
    } else if (userType === "Practitioner") {
      setUserData({
        ...userData,
        "User or Member": {
          ...userData["User or Member"],
          ...props.user,
        },
        Practitioner: {
          ...userData.Practitioner,
          ...props.practitioner,
        },
      });
    } else if (userType === "User or Member") {
      setUserData({
        ...userData,
        ["User or Member"]: {
          ...userData["User or Member"],
          ...props.user,
        },
      });
    }
  }, [userType, props.user, props.info, props.practitioner]);
  const [disableEdit, setDisableEdit] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;
    const { practitionerInvited } = router.query;
    if (practitionerInvited === "true") {
      setDisableEdit(true);
      setUserType(types[1]);
      // setNextPage(2);
    }
  }, [router.isReady]);

  const incrementNextPage = () => {
    var flag = true;

    if (nextPage == 1) {
      ["userName", "address", "zipCode"].forEach((e) => {
        if (userData["User or Member"][e] == "") {
          setFillError((prevstate) => {
            prevstate[e] = true;
            return { ...prevstate };
          });
          flag = false;
          // console.log("problem 1");
        }
      });

      if (userData["User or Member"].city == "Select Your City") {
        setFillError((prevstate) => {
          prevstate.city = true;
          return { ...prevstate };
        });
        flag = false;
        console.log("problem 2");
      }
      if (userData["User or Member"].country == "Select Your Country") {
        // console.log(userData["User or Member"].country);
        setFillError((prevstate) => {
          prevstate.country = true;
          return { ...prevstate };
        });
        flag = false;
        console.log("problem 3");
      }
      if (userData["User or Member"].phoneNumber == "") {
        setFillError((prevstate) => {
          prevstate.phoneNumber = true;
          return { ...prevstate };
        });
        flag = false;
        console.log("problem 4");
      }
    } else if (nextPage == 2) {
      if (userType == "Practitioner") {
        if (
          userData["Practitioner"].professionType ==
          "Select practitioner category"
        ) {
          setFillError((prevstate) => {
            prevstate.professionType = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (
          userData["Practitioner"].professionSubType ==
          "Select your practitioner sub-category"
        ) {
          setFillError((prevstate) => {
            prevstate.professionSubType = true;
            return { ...prevstate };
          });
          flag = false;
        }

        if (userData["Practitioner"].businessEmail == "") {
          setFillError((prevstate) => {
            prevstate.businessEmail = true;
            return { ...prevstate };
          });
          flag = false;
        }

        if (userData["Practitioner"].businessPhoneNumber == "") {
          setFillError((prevstate) => {
            prevstate.businessPhoneNumber = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (
          userData["Practitioner"].areaOfPractice ==
          "Select your area of practice"
        ) {
          setFillError((prevstate) => {
            prevstate.areaOfPractice = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (
          userData["Practitioner"].areaOfPractice ==
          "Select your area of practice"
        ) {
          setFillError((prevstate) => {
            prevstate.areaOfPractice = true;
            return { ...prevstate };
          });
          flag = false;
        }
      }
      if (userType == "Organization") {
        if (userData["Organization"].name == "") {
          setFillError((prevstate) => {
            prevstate.orgName = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (userData["Organization"].businessCategory.startsWith("Select")) {
          setFillError((prevstate) => {
            prevstate.businessnessCategory = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (userData["Organization"].businessSubCategory.startsWith("Select")) {
          setFillError((prevstate) => {
            prevstate.businessSubCategory = true;
            return { ...prevstate };
          });
          flag = false;
        }

        if (userData["Organization"].email == "") {
          setFillError((prevstate) => {
            prevstate.orgBusinessEmail = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (userData["Organization"].businessType.startsWith("Select")) {
          setFillError((prevstate) => {
            prevstate.businessType = true;
            return { ...prevstate };
          });
          flag = false;
        }
        if (userData["Organization"].ownerRole.startsWith("Select")) {
          setFillError((prevstate) => {
            prevstate.ownerRole = true;
            return { ...prevstate };
          });
          flag = false;
        }
      }
    }

    // console.log(flag);
    if (flag == false) return;

    if (nextPage === 3) {
      setNextPage(3);
    } else {
      setNextPage(nextPage + 1);
    }
  };
  const onChangeUserData = (event, type) => {
    const { name, value } = event;
    setUserData({ ...userData, [type]: { ...userData[type], [name]: value } });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.deauthenticate();
  };

  return (
    <div className={styles.PageContainer}>
      <div className="w-[440px] my-12 mx-auto">
        <div className="w-[440px] text-center my-3">
          These information are very important. You can not forward without
          completing these. Not interested now?{" "}
          <span
            onClick={handleLogout}
            className="text-[#32a7fa] cursor-pointer hover:underline"
          >
            Logout
          </span>
        </div>
        <div className="flex flex-col z-10 bg-white shadow-lg rounded-2xl">
          <div className="w-full flex flex-col py-6 px-6 items-center">
            {/* <Top currenPage = {nextPage}/> */}
            {userType !== "User or Member" && userType !== "User/Member" && (
              <Stepper steps={steps} currentStep={nextPage} />
            )}
            {nextPage === 1 && (
              <BasicInfo
                setFillError={setFillError}
                fillError={fillError}
                disableEdit={disableEdit}
                setUserType={setUserType}
                userType={userType}
                userData={userData["User or Member"]}
                onChangeUserData={(event) =>
                  onChangeUserData(event, "User or Member")
                }
              />
            )}
            {nextPage === 2 && userType === types[2] && (
              <BusinessInfo
                fillError={fillError}
                setFillError={setFillError}
                userType={userType}
                userData={userData["User or Member"]}
                businessData={userData[userType]}
                onChangeUserData={(event) => onChangeUserData(event, userType)}
              />
            )}
            {nextPage === 2 && userType === types[1] && (
              <PractitionerInfo
                fillError={fillError}
                setFillError={setFillError}
                userType={userType}
                userData={userData["User or Member"]}
                practitionerData={userData[userType]}
                onChangeUserData={(event) => onChangeUserData(event, userType)}
              />
            )}
            {nextPage === 3 && (
              // <Elements options={options} stripe={stripePromise}>
              <Finish
                fillError={fillError}
                setFillError={setFillError}
                // clientSecret={clientSecret}
                selectPayMethod={selectPayMethod}
                setSelectPayMethod={setSelectPayMethod}
                userType={userType}
                userData={userData}
                businessId={
                  props.info?.business && userType === types[2]
                    ? props.info.business._id
                    : null
                }
                practitionerId={
                  props.practitioner && userType === types[1]
                    ? props.practitioner._id
                    : null
                }
                upadateBusiness={props.upadateBusiness}
              />
              // </Elements>
            )}
            <div
              className={`w-full flex ${
                nextPage !== 1 ? "justify-between" : "justify-end"
              }  mt-4`}
            >
              {nextPage !== 1 && (
                <button
                  onClick={() => setNextPage(nextPage - 1)}
                  className="flex items-center text-[#5B5B5B] rounded-md"
                >
                  <BsArrowLeft />
                  <span className="ml-1">Previous</span>
                </button>
              )}
              {nextPage < 3 && userType !== types[0] && (
                <button
                  onClick={incrementNextPage}
                  className="h-[36px] w-[103px] text-white bg-[#19525A] rounded-md"
                >
                  Next
                </button>
              )}

              {nextPage == 1 && userType === types[0] && (
                <button
                  onClick={() => {
                    props.upadateBusiness(userType, userData);
                  }}
                  className="h-[36px] w-full mt-5 text-white bg-[#19525A] rounded-md"
                >
                  {props.loading ? (
                    <PulseLoader color="#ffffff" size={12} />
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              )}
            </div>
          </div>
          {nextPage == 3 && (
            <div className="h-10 w-full rounded-b-2xl p-2 bg-[#EAEAEA] flex justify-between items-center">
              <div className="w-full h-full flex justify-start items-center">
                <p className="text-[#5B5B5B] text-[10px] italic">Powered By</p>
                <img
                  src={`/icons/${selectPayMethod}.png`}
                  className={`mx-2`}
                  height={18}
                  width={40}
                />
                <div className="h-full w-[1px] bg-[#5B5B5B] mr-2"></div>
                <p className="text-[#5B5B5B] text-[12px]">
                  All transactions are secure and encrypted.
                </p>
              </div>
              <img src="/icons/lockCircled.png" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user?.info?.user,
    info: state.business?.info,
    practitioner: state.practitioner?.info?.practitioner,
    loading: state.business.loading,
  };
};

export default connect(mapStateToProps, {
  upadateBusiness,
  deauthenticate,
  getBusinessInfo,
  getPractitionerInfo,
  getUserInfo,
})(SetupProfile);
