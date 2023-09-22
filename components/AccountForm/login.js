import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
// import axios from 'axios';
import FormGroup from "./FormGroup";
import InputGroup from "./InputGroup";
import Alert from "../Alert";
import { connect } from "react-redux";
import { authenticate } from "../../store/actions/auth";
import { CircleLoader, PulseLoader } from "react-spinners";
import Toggle from "./Toogle";
import Image from "next/image";

// @ts-ignore
function Login(props) {
  // @ts-ignore
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const [needToVerify, setNeedToVerify] = useState(false);
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [disableEmailEditing, setDisableEmailEditing] = useState(false);

  useEffect(() => {
    if (props.invitation) {
      setDisableEmailEditing(true);
      if (props.invitation.inviteType == "Staff") {
        axios.get(`staff/${props.invitation.staffId}`).then((res) => {
          if (res.data.status == "success") {
            // console.log(res.data.data);
            props.setEmail(res.data.data.data.email);
          }
        });
      } else if (props.invitation.inviteType == "Practitioner") {
        axios
          .get(`practitioner/${props.invitation.practitionerId}`)
          .then((res) => {
            if (res.data.status == "success") {
              // console.log(res.data.data);
              props.setEmail(res.data.data.user.email);
            }
          });
      } else if (props.invitation.inviteType == "Customer") {
        props.setEmail(props.invitation.email);
      }
    }
  }, []);

  useEffect(() => {
    if (props.error?.includes("need to verify")) {
      setNeedToVerify(true);
    }
    setError(props.error);
  }, [props.error]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    const user = {
      email: props.email,
      password,
      rememberMe,
      device_name: navigator.platform,
    };
    if (!props.email) {
      setEmailError("Email is reuired!");
      return;
    }
    if (!password) {
      setPassError("Password is reuired!");
      return;
    }
    if (props.invitation) {
      props.authenticate(user, props.invitation);
    } else {
      props.authenticate(user);
    }
  };

  const handleVerifyAgain = async (event) => {
    event.preventDefault();
    setSendingEmail(true);
    try {
      const result = await axios.post("users/verifyAgain", {
        email: props.email,
      });

      if (result.data.status == "success") {
        props.setLoginModal(false);
        setSendingEmail(false);
        props.setOpenVerificationModal(true);
      } else {
      }

      // setTimeout(() => {
      // 	props.setLoginModal(false);
      // 	setSendingEmail(false)
      // 	props.setOpenVerificationModal(true);
      // }, 5000)
    } catch (err) {
      setSendingEmail(false);
    }
  };

  function getTwitterOauthUrl() {
    const rootUrl = "https://twitter.com/i/oauth2/authorize";
    const options = {
      redirect_uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/twitter`, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
      client_id: "NF9RdjdaS2JKbllOS3VLcHpia3A6MTpjaQ",
      state: "state",
      response_type: "code",
      code_challenge: "challenge",
      code_challenge_method: "plain",
      scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
        " "
      ),
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  }

  return (
    <div className="w-[440px] h-fit relative my-12 py-6 px-6 z-50 bg-white shadow mx-auto rounded-2xl">
      {!props.invitation && (
        <div className="absolute top-5 right-5">
          <span
            onClick={() => props.setLoginModal(false)}
            className="text-xl text-[#5B5B5B] cursor-pointer"
          >
            ✖
          </span>
        </div>
      )}
      {showAlert && <Alert onClick={setShowAlert} />}
      <form className="w-full mx-auto text-center">
        <h1 className="font-medium text-xl">Sign In</h1>
        <div className="mt-8">
          {props.invitation ? (
            <div className="inline-flex justify-center gap-2 text-2xl mb-4">
              <a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#4267b2] rounded-md flex items-center justify-center hover:text-white hover:border-[#4267b2]">
                <Image
                  src="/img/facebook.png"
                  height={23}
                  width={24}
                  alt="fb"
                />
              </a>
              <a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#c03427] rounded-md flex items-center justify-center hover:text-white hover:border-[#c03427]">
                <Image
                  src="/img/google.png"
                  height={23}
                  width={24}
                  alt="google"
                />
              </a>
              <a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#049cd8] rounded-md flex items-center justify-center hover:text-white hover:border-[#049cd8]">
                <Image
                  src="/img/twitter.png"
                  height={23}
                  width={24}
                  alt="twitter"
                />
              </a>
            </div>
          ) : (
            <div className="inline-flex justify-center gap-2 text-2xl mb-4">
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/facebook`}
                className="border border-gray-200 h-12 w-16 text-[#4267b2] rounded-md flex items-center justify-center hover:text-white hover:border-[#4267b2]"
              >
                <Image
                  src="/img/facebook.png"
                  height={23}
                  width={24}
                  alt="fb"
                />
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`}
                className="border border-gray-200 h-12 w-16 text-[#c03427] rounded-md flex items-center justify-center hover:text-white hover:border-[#c03427]"
              >
                <Image src="/img/google.png" height={23} width={24} alt="fb" />
              </a>
              <a
                href={getTwitterOauthUrl()}
                className="border border-gray-200 h-12 w-16 text-[#049cd8] rounded-md flex items-center justify-center hover:text-white hover:border-[#049cd8]"
              >
                <Image src="/img/twitter.png" height={23} width={24} alt="fb" />
              </a>
            </div>
          )}
          <div className="flex justify-center items-center">
            <span className="h-[0.7px] w-[119px] bg-[#707070B2]"></span>
            <p className="text-center text-[16px] text-[#5B5B5BB2] mx-2">or</p>
            <span className="h-[0.7px] w-[119px] bg-[#707070B2]"></span>
          </div>
          <FormGroup>
            <InputGroup
              type="email"
              name="email"
              autoComplete="off"
              required={true}
              placeholder="Email address"
              value={props.email}
              disabled={disableEmailEditing}
              errorText={emailError}
              onChange={(e) => {
                props.setEmail(e.target.value);
                setError(null);
                setEmailError(null);
              }}
              className={`rounded-lg h-10 ${disableEmailEditing && "cursor-not-allowed"
                }`}
            />
            {/* </FormGroup>
          <FormGroup> */}
            <InputGroup
              type="password"
              name="password"
              autoComplete="new-password"
              required={true}
              value={password}
              placeholder="Password"
              errorText={passError}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
                setPassError(null);
              }}
              className="rounded-lg h-10 mt-4"
            />
          </FormGroup>

          {/* remember and forgot */}
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <Toggle
                checked={rememberMe}
                setChecked={(checked) => {
                  setRememberMe(checked);
                }}
              />
              <span className="text-[#525252] text-[12px] ml-2">
                Remember me
              </span>
            </div>

            <div
              onClick={() => {
                props.setOpenForgotPassModal(true);
                props.setLoginModal(false);
              }}
              className="cursor-pointer"
            >
              <span className="text-[#0089C9] text-[12px]">
                Forget password ?
              </span>
            </div>
          </div>
          <div>
            <FormGroup>
              {error && (
                <span className="inline-flex items-center gap-1 mb-2">
                  <p className="text-rose-700">{error}</p>{" "}
                  {needToVerify ? (
                    sendingEmail ? (
                      <CircleLoader size={12} color="#2175FE" />
                    ) : (
                      <p
                        className="text-sky-700 cursor-pointer"
                        onClick={handleVerifyAgain}
                      >
                        Verify
                      </p>
                    )
                  ) : (
                    <></>
                  )}
                </span>
              )}
              <button
                type="submit"
                disabled={props.loading}
                onClick={handleLoginClick}
                className="rounded-lg w-full text-center items-center text-sm h-10 bg-[#19525A]"
              >
                {props.isLoading ? (
                  <div className="p-2 flex items-center justify-center">
                    <PulseLoader color="#ffffff" size={12} />
                  </div>
                ) : (
                  <p className="inline-block " style={{ color: "#ffffff" }}>
                    SIGN IN
                  </p>
                )}
              </button>
            </FormGroup>
            <h3 className="text-[12px] text-[#525252]">
              Don&apos;t have any account?
            </h3>
            <FormGroup>
              <button
                onClick={
                  props.invitation
                    ? (e) => {
                      e.preventDefault();
                    }
                    : (e) => {
                      e.preventDefault();
                      props.setLoginModal(false);
                      props.setSignupModal(true);
                    }
                }
                style={{ color: "#ffffff" }}
                className={`rounded-lg w-full ${disableEmailEditing && "cursor-not-allowed"
                  } text-white text-sm h-10 bg-gradient-to-r from-[#2175FE] to-[#20C6FD]`}
              >
                SIGN UP
              </button>
            </FormGroup>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps, { authenticate })(Login);
